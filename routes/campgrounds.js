const express = require("express");
const middleware = require("../middleware/index");
const campgroundModel = require("../models/campgrounds");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    const camps = await campgroundModel.find({});
    res.render("campgrounds/index", { campgrounds: camps });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, async (req, res) => {
    req.body.campground.author = { id: req.user._id, username: req.user.username };
    await campgroundModel.create(req.body.campground);
    res.redirect("/campgrounds");
});

router.get("/:id", async (req, res) => {
    const camp = await campgroundModel.findById(req.params.id).populate("comments");
    res.render("campgrounds/show", { camp: camp });
});

router.get("/:id/edit", middleware.ownCampground, async (req, res) => {
    const camp = await campgroundModel.findById(req.params.id);
    res.render("campgrounds/edit", { camp: camp });
});

router.put("/:id", middleware.ownCampground, async (req, res) => {
    await campgroundModel.findByIdAndUpdate(req.params.id, req.body.campground);
    res.redirect("/campgrounds/" + req.params.id);
});

router.delete("/:id", middleware.ownCampground, async (req, res) => {
    await campgroundModel.deleteOne({_id: req.params.id});
    res.redirect("/campgrounds");
});

module.exports = router;