const fs = require("fs");

module.exports = {
	name: "checkFolder",
	exec: (options) => {
		if(!fs.existsSync(options.dir)) return false;
		return fs.readdirSync(options.dir).length != 0;
	}
}