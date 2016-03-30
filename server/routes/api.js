var Session = require('../models/session');
var User = require('../models/user');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');

var secretKey = config.secretKey;

function generateToken (user) {
	var token = jsonwebtoken.sign({
		id: user._id,
		alias: user.alias,
		session: user.session
	}, secretKey, {
		expiresInMinute: 1440
	});
	return token;
}

module.exports = function(app, express) {
	var api = express.Router();

	api.post('/createSession', function(req, res){
		var session = new Session({
			
		});
		session.save(function(err, newSession){
			if (err){
				res.send(err);
				return;
			} else {
				res.json({
					success: true,
					message: "New Session Created",
					sessionId: session._id
				});
			}
		})

	});


	api.post('/sessions/:session_id', function(req, res){
		var user = new User({
			alias: req.body.alias,
			session: req.params.session_id,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
		});

		var token = generateToken(user);

		user.save(function(err, newUser){
			if (err){
				res.send(err);
				return;
			} else {
				res.json({
					success: true,
					message: "New User Created",
					token: token
				});
			}
		});
	});

	api.use(function(req, res, next){
        console.log("Checking for token");
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        
        // check if token exist
        if(token) {
            jsonwebtoken.verify(token, secretKey, function(err, decoded){
               if(err) {
                   res.status(403).send({ success: false, message: "Failed to authenticate!"});
               } else {
                   req.decoded = decoded;
                   next();
               }
            });
        } else {
            res.status(403).send({ success: false, message: "No Token Provided" });
        }
    });

	api.get('/sessions/:session_id', function(req, res){
		User.find({ session: req.params.session_id }, function(err, sessions){
			if (err){
				res.send(err);
				return;
			} else {
				res.json(sessions);
			}
		});
	});

	api.get('/me', function(req, res) {
        res.json(req.decoded);
    });

	return api;
}