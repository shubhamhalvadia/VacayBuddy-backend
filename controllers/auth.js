const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    //console.log(message);
    if(message.length>0) {
        message=message[0];
    }
    else {
        message=null;
    }
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage:message,
      oldInput: {name:'',email:'',password:'',confirmPassword:''},
      validationErrors:[]
    });
};

exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage:errors.array()[0].msg,
            oldInput: {name:name,email:email,password:password,confirmPassword:req.body.confirmPassword},
            validationErrors:errors.array()
        });
    }
    bcrypt
    .hash(password,12)
    .then(hashedPasswd => {
        const user = new User({
            name:name,
            email:email,
            password:hashedPasswd,
            imageUrl:'images/user/profile.png',
            city:'',
            country:'',
            address:'',
            phoneno:0,
            postal:0
        });
        return user.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
    
};