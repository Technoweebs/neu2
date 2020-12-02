const neu = require(__dirname + "/../neu2.js");
const fs = require("fs");

module.exports = {
	consts: {
		name: "build",
		args: ["help", "dir", "targets", "sdk"],
		arch: "<options>",
		function: "Downloads the SDK and makes it executable"
	},
	exec: (args, options) => {
		options = {...{
			dir: '.',
			sdk: fs.existsSync("./package.json") ? JSON.parse(fs.readFileSync("./package.json")).neu2.bin : "app",
			targets: fs.existsSync("./package.json") ? JSON.parse(fs.readFileSync("./package.json")).neu2.targets.join(';').replace("win", "win.exe").split(';') : ["win.exe", "mac", "linux"]
		}, ...options};
		if(options.help) return neu.get("modules").exec("help", { doc: "build" });
		if(options.dir == null) return neu.get("modules").exec("help", { doc: "build", message: "The folder you entered is invalid !" });
		if(options.sdk == null) return neu.get("modules").exec("help", { doc: "build", message: "The SDK name you entered is invalid !" });
		if(options.targets == null) return neu.get("modules").exec("help", { doc: "build", message: "The targets you entered are invalid !" });
		
		neu.get("modules").exec("sdk", options)
		.then(() => {
			neu.get("modules").exec("figlet");
			console.log("                        The SDK has been successfully built !");
		})
		.catch((e) => {
			neu.get("modules").exec("figlet");
			console.log("                An error has occured while attempting to build the SDK.");
			console.log("         Please check your internet connection, or contact the developer of Neu2.");
		});
	}
}