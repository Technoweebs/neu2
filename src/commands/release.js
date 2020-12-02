const neu = require(__dirname + "/../neu2.js");

module.exports = {
	consts: {
		name: "release",
		args: ["help"],
		arch: "<options>",
		function: "Releases the project into a .zip file"
	},
	exec: (args, options) => {
		if(options.help) return neu.get("modules").exec("help", { doc: "release" });
	}
}