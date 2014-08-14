exports = module.exports = function (collection, mongoose) {
    var schema = mongoose.Schema({
        author: {
            type: String,
        },
        text: {
            type: String,
            required: true
        }
    });

    return mongoose.model(collection, schema);
};
