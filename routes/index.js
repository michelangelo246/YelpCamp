const express = require("express");
const passport = require("passport");
const userModel = require("../models/user");
const campgroundModel = require("../models/campgrounds");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    const camps = await campgroundModel.find({}).limit(5);
    console.log(camps);
    res.render("campgrounds/landing", { camps: camps });
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    userModel.register(new userModel({ username: req.body.username }), req.body.password, (err, user) => {
        if(err){
            res.render("register", { "error": err.message });
        }
        else{
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome, " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", { successRedirect: "/campgrounds", failureRedirect: "/login", failureFlash: true }), (req, res) => {
    
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("error", "You have logged out!");
    res.redirect("/campgrounds");
});

module.exports = router;