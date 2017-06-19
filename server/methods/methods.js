var User = require('../models/user');
var Session = require('./auth');
var jwt = require('jwt-simple');
var config = require('../config');
var Review = require('../models/review');
var User = require('../models/user');

var functions = {
    getReviews: function(req, res) {
        console.log("fetching reviews");
        console.log(req.user);

        // use mongoose to get all reviews in the database
        Review.find(function(err, reviews) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(reviews); // return all reviews in JSON format
        });
    },
    postReviews: function(req, res) {
        console.log("creating review");

        // create a review, information comes from request from Ionic
        Review.create({
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
            done: false
        }, function(err, review) {
            if (err)
                res.send(err);

            // get and return all the reviews after you create another
            Review.find(function(err, reviews) {
                if (err)
                    res.send(err);
                res.json(reviews);
            });
        });
    },
    deleteReviews: function(req, res) {
        Review.remove({
            _id: req.params.review_id
        }, function(err, review) {

        });
    },

};
module.exports = functions;