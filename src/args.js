const fs = require("fs");

module.exports = {
	load: (neu) => {
		this.neu = neu;
		this.args = new Map();

		fs.readdirSync(__dirname + "/args").forEach((file) => {
			let arg = require(__dirname + "/args/" + file);
			this.args.set(arg.consts.name, arg);
		});
	},

	parse: (list, args) => {
		let parse = {
			args: args,
			options: {}
		};

		list.forEach((arg) => {
			if(!this.args.get(arg).check(args)) return;
			parse = this.args.get(arg).exec(parse.args, parse.options);
		});

		return parse;
	},

	docs: (doc = "all") => {
		if(doc != "all") return this.args.get(doc).consts;
		let docs = {};

		this.args.forEach((value, key) => {
			docs[key] = value.consts;
		});

		return docs;
	}
};