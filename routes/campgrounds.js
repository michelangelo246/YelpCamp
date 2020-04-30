const express = require("express");
const middleware = require("../middleware/index");
const campgroundModel = require("../models/campgrounds");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    const camps = await campgroundModel.find({});
    res.render("campgrounds/index", { campgrounds: camps });
});

router.get("/getFive", async (req, res) => {
    const camps = await campgroundModel.find({}).limit(5);
    res.send(camps);
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, async (req, res) => {
    req.body.campground.author = { id: req.user._id, username: req.user.username };
    await campgroundModel.create(req.body.campground);
    req.flash("success", "Campground added!");
    res.redirect("/campgrounds");
});

router.get("/:id", async (req, res) => {
    try{
        const camp = await campgroundModel.findById(req.params.id).populate("comments");
        if(camp)
            res.render("campgrounds/show", { camp: camp });
        else{
            throw("Not found!");
        }
    }
    catch(err){
        req.flash("error", "Campgorund not found!");
        res.redirect("/campgrounds");
    }
});

router.get("/:id/edit", middleware.ownCampground, async (req, res) => {
    const camp = await campgroundModel.findById(req.params.id);
    res.render("campgrounds/edit", { camp: camp });
});

router.put("/:id", middleware.ownCampground, async (req, res) => {
    await campgroundModel.findByIdAndUpdate(req.params.id, req.body.campground);
    req.flash("success", "Campground saved!");
    res.redirect("/campgrounds/" + req.params.id);
});

router.delete("/:id", middleware.ownCampground, async (req, res) => {
    try{
        await campgroundModel.deleteOne({_id: req.params.id});
        req.flash("success", "Campground removed!");
        res.redirect("/campgrounds");
    }
    catch(err){
        req.flash("error", "Campground not found!");
        res.redirect("/campgrounds");
    }
});

module.exports = router;