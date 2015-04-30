var mongoose = require('mongoose'),
		mongooseLocale = require('mongoose-locale'),
		Schema = mongoose.Schema;

var userSchema = new Schema({
	login: String,
	password: String,
	email: String,
	status: {type: String, default: 'User'},
	date: {type: Date, default: Date.now},
});

var historySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	interval: {
		start: Date,
		end: Date
	},
	images: [{
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var exhibitSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	hall: { type: Schema.Types.ObjectId, ref: 'Hall' },
	collect: { type: Schema.Types.ObjectId, ref: 'Collection' },
	images: [{
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var collectSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	image: {
		original: String,
		thumb: String
	},
	date: {type: Date, default: Date.now}
});

var hallSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
	images: [{
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var subsidiarySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	adress: { type: String, trim: true, locale: true },
	images: [{
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var eventSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	type: String,
	images: [{
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var categorySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	date: {type: Date, default: Date.now}
});


// ------------------------
// *** Plugins Block ***
// ------------------------


historySchema.plugin(mongooseLocale);
exhibitSchema.plugin(mongooseLocale);
collectSchema.plugin(mongooseLocale);
hallSchema.plugin(mongooseLocale);
subsidiarySchema.plugin(mongooseLocale);
eventSchema.plugin(mongooseLocale);
categorySchema.plugin(mongooseLocale);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.History = mongoose.model('History', historySchema);
module.exports.Exhibit = mongoose.model('Exhibit', exhibitSchema);
module.exports.Collect = mongoose.model('Collect', collectSchema);
module.exports.Hall = mongoose.model('Hall', hallSchema);
module.exports.Subsidiary = mongoose.model('Subsidiary', subsidiarySchema);
module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.Category = mongoose.model('Category', categorySchema);