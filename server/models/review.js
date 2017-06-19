var mongoose = require('mongoose'); 

// module.exports = mongoose.model('Review',{
//     title: String,
//     description: String,
//     rating: Number
// });

var Review = mongoose.model('Review', {
    title: String,
    description: String,
    rating: Number
});

module.exports = Review;