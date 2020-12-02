const neu = require(__dirname + "/../neu2.js");

module.exports = {
	name: "help",
	exec: (options) => {
		options = {...{
			doc: "full",
			message: null
		}, ...options};

		neu.get("modules").exec("figlet");

		let maxLength = 0;

		switch (options.doc) {
			case "full":
				Object.values(neu.get("commands").docs()).forEach((doc) => {
					if (("  neu2 " + doc.name + ' ' + doc.arch + "  ").length > maxLength) maxLength = ("  neu2 " + doc.name + ' ' + doc.arch + "  ").length;
				});

				maxLength++;

				console.log("Usage: neu2 [command] <options>");
				options.message != null ? console.log(options.message + '\n') : console.log();

				console.log("Commands:");
				Object.values(neu.get("commands").docs()).forEach((doc) => {
					console.log("  neu2 " + doc.name + ' ' + doc.arch + "  " + neu.get("modules").exec("align", { text: "|  " + doc.function, textBefore: "  neu2 " + doc.name + ' ' + doc.arch + "  ", spacing: maxLength }));
				});
				break;

			default:
				let doc = neu.get("commands").docs(options.doc);
				maxLength = ("  neu2 " + doc.name + ' ' + doc.arch + "  ").length;

				doc.args.forEach((arg) => {
					if(("       " + neu.get("args").docs(arg).arch + "  ").length > maxLength) maxLength = ("       " + neu.get("args").docs(arg).arch + "  ").length;
				});

				maxLength++;

				console.log("Usage: neu2 [command] <options>");
				options.message != null ? console.log(options.message + '\n') : console.log();

				console.log(doc.name.charAt(0).toUpperCase() + doc.name.slice(1) + " command:");
				console.log("  neu2 " + doc.name + ' ' + doc.arch + "  " + neu.get("modules").exec("align", { text: "|  " + doc.function, textBefore: "  neu2 " + doc.name + ' ' + doc.arch + "  ", spacing: maxLength }));

				doc.args.forEach((arg) => {
					console.log("       " + neu.get("args").docs(arg).arch + "  " + neu.get("modules").exec("align", { text: "|  " + neu.get("args").docs(arg).function, textBefore: "       " + neu.get("args").docs(arg).arch + "  ", spacing: maxLength }));
				});
				break;
		}
	}
}