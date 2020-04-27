const mongoose = require("mongoose");
const campgroundModel = require("./models/campgrounds");
const commentsModel = require("./models/comments");

var seeds = [
    {
        name: "Clod's Rest",
        image: "https://cdn.pixabay.com/photo/2017/08/06/18/33/barn-2594975_960_720.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo enim sit amet tincidunt luctus. Maecenas ornare ullamcorper mollis. Aenean rutrum sodales ligula sed faucibus. Suspendisse ac erat lacus. Suspendisse tortor metus, bibendum pulvinar sagittis sed, sagittis sed tortor. Nullam in dictum ipsum, vestibulum accumsan lectus. Morbi pellentesque nunc sit amet ante efficitur, quis pretium ipsum ultricies. Fusce ac consectetur dolor. Integer pulvinar finibus nibh non consectetur. Nulla quis lacus id erat malesuada pretium in tempor ante."
    },
    {
        name: "Granite Hill",
        image: "https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872_960_720.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc semper purus quis rutrum dignissim. Etiam pellentesque mollis purus ut porta. Nulla orci ipsum, efficitur sit amet justo et, tempor vestibulum dui. Etiam dapibus tellus quis scelerisque auctor. Aliquam porttitor velit metus, sit amet tincidunt lacus congue sit amet. In non aliquam magna. Maecenas tempor urna sit amet purus rhoncus, vel volutpat dolor bibendum. Vestibulum hendrerit, erat a gravida auctor, velit orci rhoncus turpis, nec commodo lorem lacus sed leo. Donec diam turpis, maximus eget convallis in, ultrices sit amet justo. Sed eu mattis nibh, eget tristique libero."
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://images.unsplash.com/photo-1563788625014-c0bccdcd982c?ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id dui venenatis diam efficitur porta. Sed auctor metus quis nisl consequat lobortis. Integer eu ante metus. Proin sollicitudin maximus justo vel tincidunt. In eget consequat metus, at viverra nulla. Suspendisse ac nibh imperdiet quam accumsan consectetur. Morbi consequat posuere nulla, at eleifend erat molestie varius."
    }
];

async function seedDB(){
    try{
        await campgroundModel.deleteMany({});
        await commentsModel.deleteMany({});

        for(const seed of seeds){
            let campground = await campgroundModel.create(seed);
            let comment = await commentsModel.create({
                text: "This place is great, but I wish there was internet.",
                author: {
                    id: "5ea639b48050fb29c8bc588c",
                    username: "Homer"
                }
            });
            campground.comments.push(comment);
            campground.save();
        }
    } catch(err){
        console.log("ERRO!", err);
    }
}

module.exports = seedDB;