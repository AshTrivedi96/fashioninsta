const mongoose = require('mongoose'),
	path = require('path'),
	helperLib = require(path.resolve('./utils')),
	Schema = mongoose.Schema;


let validateEmail = (emailId) => {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(emailId)
};

let userProfileSchema = new Schema({

	first_name: {
		type: String,
		trim: true
	},
	last_name: {
		type: String,
		trim: true
	},
	gender: {
		type: String,
		enum: ["male", "female", "other"]
	},
	emailId: {
		type: String,
		unique: true,
		trim: true,
		validate: [validateEmail, 'Please fill a valid email address'],
		required: [true, 'email is required']
	},
	verified: {
		type: Number,
		enum: [0, 1],
		default: 0

	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	isAdmin: {
		type: Boolean,
		required: false,
		default: false
	}
},

	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	});



//@ mongoose pre hook(middleware)
userProfileSchema.pre('save', function (next) {
	let Crypt = new helperLib.crypt.crypt();


	//@capital first letter of firstname and last name
	if (this.first_name) this.first_name = this.first_name.charAt(0).toUpperCase() + this.first_name.slice(1)

	if (this.last_name) this.last_name = this.last_name.charAt(0).toUpperCase() + this.last_name.slice(1)

	if (this.password) {
		//@hash password using MD5
		this.password = Crypt.hash(this.password);
	}
	next();


});

//@ virtual to get full name
userProfileSchema.virtual('full_name').get(function () {

	//@concat first and last name
	return `${this.first_name} ${this.last_name}`

});

module.exports = mongoose.model('UserProfileModel', userProfileSchema);