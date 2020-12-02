const spdx = require("spdx-license-list");

module.exports = {
	consts: {
		name: "license",
		arch: "<-l | --license> [license code]",
		function: "Changes the project license"
	},
	check: (args) => {
		return args.join(' ').match(/ (-l|--license) /i);
	},

	exec: (args, options) => {
		let license = args[args.indexOf(args.find((element) => { return element.match(/^(-l|--license)$/i) })) + 1];
		if(spdx[license]) {
			options.license = license;
		} else {
			options.license = null;
		}
		
		args.splice(args.indexOf(args.find((element) => { return element.match(/^(-l|--license)$/i) })), 2);
		return { args: args, options: options };
	}
}