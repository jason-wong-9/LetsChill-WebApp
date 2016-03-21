var Session = require('../models/session');
var User = require('../models/user');
var config = require('../../config');

var secretKey = config.secretKey;

module.exports = function(app, express) {
	var api = express.Router();

	api.post('/createSession', function(req, res){
		var session = new Session({
			
		});

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

	return api;
}