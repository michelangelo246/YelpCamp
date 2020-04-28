const express = require("express");
const middleware = require("../middleware/index");
const commentModel = require("../models/comments");
const campgroundModel = require("../models/campgrounds");

const router = express.Router({ mergeParams: true });

router.post("/", middleware.isLoggedIn, async (req, res) => {
    req.body.comment.author = { username: req.user.username, id: req.user.id };
    let camp = await campgroundModel.findById(req.params.id);
    let comment = await commentModel.create(req.body.comment);
    await camp.comments.push(comment);
    await camp.save();
    res.redirect("/campgrounds/" + req.params.id);
});

router.put("/:comment_id", middleware.ownComment, async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.comment_id, { $set: { text: req.body.comment.text } });
    res.redirect(req.get('referer'));
});

router.delete("/:comment_id", middleware.ownComment, async (req, res) => {
    await commentModel.findByIdAndDelete(req.params.comment_id);
    res.redirect(req.get('referer'));
});

module.exports = router;