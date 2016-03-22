var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	alias: { type: String, required: 'Alias is required', index: { unique: true} },
	session: { type: Schema.Types.ObjectId, ref: "Session" },
	latitude: { type: Number, required: 'Latitude is required' },
	longitude: { type: Number, required: 'Longitude is required' }

});

module.exports = mongoose.model('User', UserSchema);