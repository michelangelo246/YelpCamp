const campgroundModel = require("../models/campgrounds");
const commentModel = require("../models/comments");

var middleware = {};

middleware.ownComment = async function (req, res, next){
    if(req.isAuthenticated())
    {
        const comment = await commentModel.findById(req.params.comment_id);
        if(comment.author.id && comment.author.id.equals(req.user.id))
            next();
        else
            res.redirect("back");
    }
    else
        res.redirect("back");
}

middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated())
        return next();
    req.flash("error", "Please login first!");
    res.redirect("/login");
}

middleware.ownCampground = async function(req, res, next){
    if(req.isAuthenticated())
    {
        const camp = await campgroundModel.findById(req.params.id);
        if(camp.author.id && camp.author.id.equals(req.user.id))
            next();
        else
            res.redirect("back");
    }
    else
        res.redirect("back");
}

module.exports = middleware;