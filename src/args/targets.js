module.exports = {
	consts: {
		name: "targets",
		arch: "<-t | --targets> [target(s) (all, win, mac, linux)]",
		function: "Changes the build target(s)"
	},
	check: (args) => {
		return args.join(' ').match(/ (-t|--targets) /i);
	},

	exec: (args, options) => {
		let targets = args[args.indexOf(args.find((element) => { return element.match(/^(-t|--targets)$/i) })) + 1];

		if(targets != undefined && targets.match(/^(all|((lin|linux)|(mac|macos)|(win|windows))(([;,]|( )+)((lin|linux)|(mac|macos)|(win|windows)))?(([;,]|( )+)((lin|linux)|(mac|macos)|(win|windows)))?)$/i)) {
			if(targets != "all") {
				targets = targets.replace(/(windows|win)/gi, "win.exe").replace(/(macos|mac)/gi, "mac").replace(/(linux|lin)/gi, "linux");

				targets = targets.split(/[;, ]+/);

				let equals = 0;
				targets.forEach((target1, i1) => {
					targets.forEach((target2, i2) => {
						if (i1 == i2) return;
						if (target1 == target2) equals++;
					});
				});

				if (!equals > 0) {
					options.targets = targets;

				} else {
					options.targets = null;
				}
			}

		} else {
			options.targets = null;
		}

		args.splice(args.indexOf(args.find((element) => { return element.match(/^(-t|--targets)$/i) })), 2);
		return { args: args, options: options };
	}
}