const neu = require(__dirname + "/../neu2.js");

module.exports = {
	consts: {
		name: "help",
		args: [],
		arch: "<command>",
		function: "Displays the help page"
	},
	exec: (args, options) => {
		if (args[0] == undefined) return neu.get("modules").exec("help", { message: "Type 'neu2 help [command]' or 'neu2 [command] -h' for more informations !" });
		if (!neu.get("commands").check(args[0])) return neu.get("modules").exec("help", {
			message: "The command you entered doesn't exists !\nType 'neu2 help [command]' or 'neu2 [command] -h' for more informations."
		})
		return neu.get("modules").exec("help", {
			doc: args[0]
		});
	}
}