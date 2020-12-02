const fs = require("fs");

module.exports = {
	load: (neu) => {
		this.neu = neu;
		this.modules = new Map();

		fs.readdirSync(__dirname + "/modules").forEach((file) => {
			let module = require(__dirname + "/modules/" + file);
			this.modules.set(module.name, module);
		});
	},

	check: (module) => {
		return this.modules.get(module) != undefined;
	},

	exec: (module, options) => {
		return this.modules.get(module).exec(options);
	}
};