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
			if(os.platform() == "win32") options.dir = options.dir.replace(/(CON|PRN|AUX|NUL|COM1|COM2|COM3|COM4|COM5|COM6|COM7|COM8|COM9|LPT1|LPT2|LPT3|LPT4|LPT5|LPT6|LPT7|LPT8|LPT9)/gi, "nope");

		} else {
			options.dir = null;
		}
		
		args.splice(args.indexOf(args.find((element) => { return element.match(/^(-d|--dir)$/i) }))|2);
		return { args: args, options: options };
	}
}