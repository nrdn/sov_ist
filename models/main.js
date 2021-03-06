var mongoose = require('mongoose'),
		mongooseLocale = require('mongoose-locale'),
		mongooseBcrypt = require('mongoose-bcrypt'),
		Schema = mongoose.Schema;


var userSchema = new Schema({
	login: String,
	password: String,
	email: String,
	status: {type: String, default: 'User'},
	date: {type: Date, default: Date.now},
});

var newsSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	date: {type: Date, default: Date.now},
	status: String,
	videos: [{type: String, trim: true}],
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}]
});

var bannerSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	link: String,
	num: Number,
	top: Boolean,
	mobile: Boolean,
	html: Boolean,
	code: String,
	path: {
		original: String,
		thumb: String
	},
	date: {type: Date, default: Date.now}
});

var vacancySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	date: {type: Date, default: Date.now},
	status: String,
	videos: [{type: String, trim: true}],
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}]
});

var partnerSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	position: { type: String, trim: true, locale: true },
	url: { type: String, trim: true },
	num: Number,
	path: {
		original: String,
		thumb: String
	},
	date: {type: Date, default: Date.now}
});

var serviceSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	num: Number,
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var historySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	interval: {
		start: Date,
		end: Date
	},
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var exhibitSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	hall: { type: Schema.Types.ObjectId, ref: 'Hall' },
	collect: { type: Schema.Types.ObjectId, ref: 'Collect' },
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var collectSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	logo: {
		path: String
	},
	date: {type: Date, default: Date.now}
});

var hallSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	s_title: Number,
	description: { type: String, trim: true, locale: true },
	subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var subsidiarySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	adress: { type: String, trim: true, locale: true },
	status: String,
	logo: {
		path: String,
		position: {
			x: String,
			y: String
		}
	},
	videos: [{type: String, trim: true}],
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var eventSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	subsidiary: { type: Schema.Types.ObjectId, ref: 'Subsidiary' },
	categorys: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	interval: {
		hidden: Boolean,
		start: Date,
		end: Date
	},
	status: String,
	type: String,
	videos: [{type: String, trim: true}],
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var categorySchema = new Schema({
	title: { type: String, trim: true, locale: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	status: String,
	date: {type: Date, default: Date.now}
});

var gallerySchema = new Schema({
	type: String,
	description: { type: String, trim: true, locale: true },
	year: Number,
	path: {
		original: String,
		thumb: String
	},
	date: {type: Date, default: Date.now}
});

var catalogueSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	logo: {
		path: String
	},
	date: {type: Date, default: Date.now}
});

var souvenirSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	catalogue: { type: Schema.Types.ObjectId, ref: 'Catalogue' },
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

var magazineSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	num: Number,
	url: { type: String, trim: true },
	path: {
		original: String,
		thumb: String
	},
	date: {type: Date, default: Date.now}
});


var teamSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	position: { type: String, trim: true, locale: true },
	email: { type: String, trim: true },
	phone: { type: String, trim: true },
	url: { type: String, trim: true },
	num: Number,
	path: {
		original: String,
		thumb: String
	},
	date: {type: Date, default: Date.now}
});


var officialSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	num: Number,
	path: { type: String},
	date: {type: Date, default: Date.now}
});


var specialSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	subtitle: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	num: Number,
	url: { type: String, trim: true },
	images: [{
		description: { type: String, trim: true, locale: true },
		original: String,
		thumb: String
	}],
	date: {type: Date, default: Date.now}
});

// ------------------------
// *** Statics Block ***
// ------------------------


gallerySchema.statics.random = function(opts, limit, sort, callback) {
	this.count(function(err, count) {
		if (err) {
			return callback(err);
		}

		var skip_max = (count - limit) <= 0 ? 0 : count - limit;
		var skip_rand = Math.floor(Math.random() * (skip_max + 1));

		this.find(opts).sort(sort).skip(skip_rand).limit(limit).exec(callback);
	}.bind(this));
};


// ------------------------
// *** Plugins Block ***
// ------------------------


userSchema.plugin(mongooseBcrypt, { fields: ['password'] });

newsSchema.plugin(mongooseLocale);
bannerSchema.plugin(mongooseLocale);
vacancySchema.plugin(mongooseLocale);
partnerSchema.plugin(mongooseLocale);
serviceSchema.plugin(mongooseLocale);
historySchema.plugin(mongooseLocale);
exhibitSchema.plugin(mongooseLocale);
collectSchema.plugin(mongooseLocale);
hallSchema.plugin(mongooseLocale);
subsidiarySchema.plugin(mongooseLocale);
eventSchema.plugin(mongooseLocale);
categorySchema.plugin(mongooseLocale);
gallerySchema.plugin(mongooseLocale);
catalogueSchema.plugin(mongooseLocale);
souvenirSchema.plugin(mongooseLocale);
magazineSchema.plugin(mongooseLocale);
teamSchema.plugin(mongooseLocale);
officialSchema.plugin(mongooseLocale);
specialSchema.plugin(mongooseLocale);


// ------------------------
// *** Index Block ***
// ------------------------


exhibitSchema.index({'title.value': 'text', 'description.value': 'text'}, {language_override:'lg', default_language: 'ru'});
eventSchema.index({'title.value': 'text', 'description.value': 'text'}, {language_override:'lg', default_language: 'ru'});


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.News = mongoose.model('News', newsSchema);
module.exports.Banner = mongoose.model('Banner', bannerSchema);
module.exports.Vacancy = mongoose.model('Vacancy', vacancySchema);
module.exports.Partner = mongoose.model('Partner', partnerSchema);
module.exports.Service = mongoose.model('Service', serviceSchema);
module.exports.History = mongoose.model('History', historySchema);
module.exports.Exhibit = mongoose.model('Exhibit', exhibitSchema);
module.exports.Collect = mongoose.model('Collect', collectSchema);
module.exports.Hall = mongoose.model('Hall', hallSchema);
module.exports.Subsidiary = mongoose.model('Subsidiary', subsidiarySchema);
module.exports.Event = mongoose.model('Event', eventSchema);
module.exports.Category = mongoose.model('Category', categorySchema);
module.exports.Gallery = mongoose.model('Gallery', gallerySchema);
module.exports.Magazine = mongoose.model('Magazine', magazineSchema);
module.exports.Team = mongoose.model('Team', teamSchema);
module.exports.Official = mongoose.model('Official', officialSchema);
module.exports.Special = mongoose.model('Special', specialSchema);
module.exports.Catalogue = mongoose.model('Catalogue', catalogueSchema);
module.exports.Souvenir = mongoose.model('Souvenir', souvenirSchema);
