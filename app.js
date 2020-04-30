const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const userModel = require("./models/user");
const seedDB = require("./seed");
const app = express();

const campgroundsRoutes = require("./routes/campgrounds");
const commentsRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(expressSession({secret: "This is a secret", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

mongoose.connect("mongodb+srv://leugim:t1WN0xd1NNjeanms@cluster0-mocjr.mongodb.net/test?retryWrites=true&w=majority", { 
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}).then(() => {
    console.log("CONNECTED TO BD !!!!!!!!!!!!!!!");
}).catch( err => {
    console.log("ERROR", err.message);
});
passport.use(new passportLocal(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use((req, res, next) => { // called in all routes as middleware
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.user = req.user;
    return next();
});
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

seedDB();

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("YelpCamp server running on port 3000");
});