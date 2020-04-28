const express = require("express");
const passport = require("passport");
const userModel = require("../models/user");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
    res.render("campgrounds/landing");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    userModel.register(new userModel({ username: req.body.username }), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.render("register", { "error": err.message });
        }else{
            passport.authenticate("local")(req, res, () => {
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", { successRedirect: "/campgrounds", failureRedirect: "/login", failureFlash: true, successFlash: true }), (req, res) => { // index - login

});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("error", "You have logged out!");
    res.redirect("/campgrounds");
});

module.exports = router;