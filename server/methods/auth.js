var jwt = require('jsonwebtoken');  
var User = require('../models/user');
var config = require('../config');

// generateToken function which will generate a JWT for a user
function generateToken(user){
    return jwt.sign(user, config.secret, {
        expiresIn: 10080
    });
}

// setUserInfo function that handles setting only the required information for the JWT
var setUserInfo = function(req){
    return {
        _id: req._id,
        email: req.email,
        firstName: req.firstName,
        role: req.role
    };
};
 
exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);

    console.log(userInfo);
 
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
};
 
exports.register = function(req, res, next){
 
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var username =req.username,
        firstName = req.firstName,
        lastName = req.lastName;
 
    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
 
    User.findOne({'email': email}, function(err, existingUser){
 
        if(err){
            return next(err);
        }
 
        if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }
 
        var newUser = new User();

        // set the user's local credentials
        newUser.email = email;
        newUser.password = password;
        newUser.username = req.param('username');
        newUser.firstName = req.param('firstName');
        newUser.lastName = req.param('lastName');
        newUser.role = role;
 
        newUser.save(function(err, user){
 
            if(err){
                return next(err);
            }
 
            var userInfo = setUserInfo(user);
 
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
 
        });
 
    });
 
};
 
exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        var user = req.user;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    };
 
};