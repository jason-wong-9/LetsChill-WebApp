var Session = require('../models/session');
var User = require('../models/user');
var config = require('../../config');

var secretKey = config.secretKey;

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

		user.save(function(err, newUser){
			if (err){
				res.send(err);
				return;
			} else {
				res.json({
					success: true,
					message: "New User Created"
				});
			}
		});
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

	return api;
}