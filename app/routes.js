module.exports = function(app, passport) {

    // HOME PAGE
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    // LOGIN PAGE
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // SIGNUP
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //LOGOUT
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



    // PROFILE PAGE
    app.get('/profile', isLoggedIn, function(req, res) {
       res.render('profile.ejs', {
          user: req.user
       });
    });

    //GOOGLE LOGIN
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
};

// check user logged in status
function isLoggedIn(req, res, next){

    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}


