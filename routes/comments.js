const express = require("express");
const middleware = require("../middleware/index");
const commentModel = require("../models/comments");
const campgroundModel = require("../models/campgrounds");

const router = express.Router({ mergeParams: true });

router.post("/", middleware.isLoggedIn, async (req, res) => {
    try{
        req.body.comment.author = { username: req.user.username, id: req.user.id };
        let camp = await campgroundModel.findById(req.params.id);
        if(!camp)
            throw("Campground not found")
        let comment = await commentModel.create(req.body.comment);
        await camp.comments.push(comment);
        await camp.save();
        req.flash("success", "Review added!");
        res.redirect("/campgrounds/" + req.params.id);
    }
    catch(err){
        req.flash("error", "Campground not found!");
        res.redirect("/campgrounds/" + req.params.id);
    }
});

router.put("/:comment_id", middleware.ownComment, async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.comment_id, { $set: { text: req.body.comment.text } });
    req.flash("success", "Comment saved!");
    res.redirect(req.get('referer'));
});

router.delete("/:comment_id", middleware.ownComment, async (req, res) => {
    await commentModel.findByIdAndDelete(req.params.comment_id);
    req.flash("success", "Comment removed!");
    res.redirect(req.get('referer'));
});

module.exports = router;