const express = require("express");
const commentModel = require("../models/comments");
const campgroundModel = require("../models/campgrounds");

const router = express.Router({ mergeParams: true });

router.post("/:id/comments", isLoggedIn, async (req, res) => {
    req.body.comment.author = { username: req.user.username, id: req.user.id };
    let camp = await campgroundModel.findById(req.params.id);
    let comment = await commentModel.create(req.body.comment);
    await camp.comments.push(comment);
    await camp.save();
    res.redirect("/campgrounds/" + req.params.id);
}); 

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect("/login");
}

module.exports = router;