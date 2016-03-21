var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionSchema = new Schema({
	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);