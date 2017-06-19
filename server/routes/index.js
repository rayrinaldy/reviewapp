var router = require('express').Router(),
	authRoutes = require('express').Router();

var Review = require('../models/review');
var actions = require('../methods/methods');
var auth = require('../methods/auth');
var passport = require('passport');
var passportService = require('../passport/passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

router.get('/api/reviews', actions.getReviews);
router.post('/api/reviews', actions.postReviews);
router.delete('/api/reviews/:review_id', actions.deleteReviews);

router.use('/auth', authRoutes);
authRoutes.post('/register', auth.register);
authRoutes.post('/login', requireLogin, auth.login);
authRoutes.get('/protected', requireAuth, function(req, res){
    res.send({ content: 'Success'});
});


module.exports = router;