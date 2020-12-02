const validPath = require("is-valid-path");
const path = require("path");

module.exports = {
	consts: {
		name: "dir",
		arch: "<-d | --dir> [directory]",
		function: "Changes the directory"
	},
	check: (args) => {
		return args.join(' ').match(/ (-d|--dir) /i);
	},

	exec: (args, options) => {
		let dir = args[args.indexOf(args.find((element) => { return element.match(/^(-d|--dir)$/i) })) + 1];
		if(validPath(dir)) {
			options.dir = path.resolve(dir).replace(/\\/g, '/');

		} else {
			options.dir = null;
		}
		
		args.splice(args.indexOf(args.find((element) => { return element.match(/^(-d|--dir)$/i) })), 2);
		return { args: args, options: options };
	}
}