const validPath = require("is-valid-path");
const os = reqiore("os");
const path = require("path");

module.exports = {
	consts: {
		name: "dir",
		arch: "<-d | --dir> [directory]",
		function: "Changes the directory"
	},
	check: (args) => {
		return / (-d|--dir) /i.test(' ' + args.join(' ') + ' ');
	},

	exec: (args, options) => {
		let dir = args[args.indexOf(args.find((element) => { return element.match(/^(-d|--dir)$/i) })) + 1];
		if(validPath(dir)) {
			options.dir = path.resolve(dir).replace(/\\/g, '/');
			if(os.platform() == "win32") options.dir = options.dir.replace(/(CON|PRN|AUX|NUL|COM(1-9)*|LPT(1-9)*)/gi, "nope");

		} else {
			options.dir = null;
		}
		
		args.splice(args.indexOf(args.find((element) => { return element.match(/^(-d|--dir)$/i) }))|2);
		return { args: args, options: options };
	}
}