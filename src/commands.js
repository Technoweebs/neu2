const fs = require("fs");

module.exports = {
	load: (neu) => {
		this.neu = neu;
		this.commands = new Map();

		fs.readdirSync(__dirname + "/commands").forEach((file) => {
			let command = require(__dirname + "/commands/" + file);
			this.commands.set(command.consts.name, command);
		});
	},

	check: (command) => {
		return this.commands.get(command) != undefined;
	},

	exec: (command, args) => {
		let parsedArgs = this.neu.get("args").parse(this.commands.get(command).consts.args, args);

		return this.commands.get(command).exec(parsedArgs.args, parsedArgs.options);
	},

	docs: (doc = "all") => {
		if(doc != "all") return this.commands.get(doc).consts;
		let docs = {};

		this.commands.forEach((value, key) => {
			docs[key] = value.consts;
		});

		return docs;
	}
};