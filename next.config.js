module.exports = {
	webpack: function (config) {
		config.externals = config.externals || {};
		config.externals['styletron-server'] = 'styletron-server';
		return config;
	},
	// netlify -Target must be serverless
	target: 'serverless',
};
