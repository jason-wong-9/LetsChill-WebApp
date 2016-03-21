var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	alias: { String, required: 'Alias is required' },
	session: { type: Schema.Types.ObjectId, ref: "Session" },
	lattitude: ,
	longitude: 

});

module.exports = mongoose.model('User', UserSchema);