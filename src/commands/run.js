const neu = require(__dirname + "/../neu2.js");
const spawn = require("child_process").spawn;
const fs = require("fs");
const os = require("os");

module.exports = {
	consts: {
		name: "run",
		args: ["help"],
		arch: "<options>",
		function: "Runs your current project"
	},
	exec: (args, options) => {
		options = {...{
			sdk: fs.existsSync("./package.json") ? JSON.parse(fs.readFileSync("./package.json")).neu2.bin : "app",
			bin: ''
		}, ...options};
		
		if(options.help) return neu.get("modules").exec("help", { doc: "run" });
		if(options.sdk == null) return neu.get("modules").exec("help", { doc: "run", message: "The SDK name you entered is invalid !" });
		
		let fileError = () => { neu.get("modules").exec("help", { doc: "run", message: "There's no project in this folder !\nBuild the SDK with 'neu2 build'." }); }
		
		switch(os.platform()) {
			case "win32":
				options.bin = options.sdk + "-win.exe"
			break;
			
			case "darwin":
				options.bin = "./" + options.sdk + "-mac"
			break;
			
			case "linux":
				options.bin = "./" + options.sdk + "-linux"
			break;
		}
		
		if(!fs.existsSync("./" + options.bin)) return fileError();
		if(options.bin.startsWith("./")) fs.chmodSync("./" + options.bin, 111);
		
		app = spawn(options.bin);
		neu.get("modules").exec("logger", { app: app });
	}
}