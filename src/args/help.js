module.exports = {
	consts: {
		name: "help",
		arch: "<-h | --help>",
		function: "Displays the help page"
	},
	check: (args) => {
		return args.join(' ').match(/ (-h|--help) /i);
	},

	exec: (args, options) => {
		args.splice(args.indexOf(args.find((element) => { return element.match(/^(-h|--help)$/i) })), 1);
		options.help = true;
		return { args: args, options: options };
	}
}