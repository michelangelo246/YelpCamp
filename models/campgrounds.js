const mongoose = require("mongoose");
const commentObject = require('./comments');

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});

// middleware para executar em chamadas deleteOne em modelos (query, em vez de documentos)
campgroundSchema.pre('deleteOne', { document:false, query: true }, async function(next) {
    const camp = await this.model.findById(this._conditions._id);
    await commentObject.deleteMany({
		_id: { $in: camp.comments }
    });
    next();
});

module.exports = mongoose.model("campground", campgroundSchema);