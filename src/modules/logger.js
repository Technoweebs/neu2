const neu = require(__dirname + "/../neu2.js");
const fs = require("fs");

module.exports = {
	name: "logger",
	exec: (options) => {
		options = {...{
			app: null
		}, ...options};
		
		if(!options.app) return;
		let log = fs.createWriteStream("./neu2.log", { flags: 'a' });
		
		options.app.stdout.on("data", (data) => {
			log.write(`[${new Date().toISOString()}]: ${data}`);
			neu.get("modules").exec("figlet");
			console.log(`[${new Date().toISOString()}]: ${data}`);
		});
		
		options.app.stderr.on("data", (data) => {
			log.write(`[${new Date().toISOString()}]: ${data}`);
			neu.get("modules").exec("figlet");
			console.log(`[${new Date().toISOString()}]: ${data}`);
		});
		
		options.app.on("exit", () => {
			log.close();
		});
	}
}