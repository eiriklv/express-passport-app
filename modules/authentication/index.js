exports = module.exports = function (models, mailer) {
	return {
		facebook: require('./facebook')(models, mailer),
		google: require('./google')(models, mailer),
        instagram: require('./instagram')(models, mailer),
		local: require('./local')(models, mailer)
	};
};