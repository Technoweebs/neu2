module.exports = {
	consts: {
		name: "sdk",
		arch: "<-s | --sdk> [name]",
		function: "Changes the name of the SDK"
	},
	check: (args) => {
		return args.join(' ').match(/ (-s|--sdk) /i);
	},

	exec: (args, options) => {
		let sdk = args[args.indexOf(args.find((element) => { return element.match(/^(-s|--sdk)$/i) })) + 1];

		if(sdk.match(/^[\w,\s-\.]+?$/i)) {
			options.sdk = sdk;

		} else {
			options.sdk = null;
		}
		
		args.splice(args.indexOf(args.find((element) => { return element.match(/^(-s|--sdk)$/i) })), 2);
		return { args: args, options: options };
	}
}