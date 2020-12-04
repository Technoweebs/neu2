const pjson = require("json-beautify");
const fse = require("fs-extra");
const fs = require("fs");

module.exports = {
	name: "parse",
	exec: (options) => {
		return new Promise((resolve, reject) => {
			if(!fs.existsSync(options.dir + "/package.json" || !fs.existsSync(options.dir + "/app/settings.json"))) {
				if(options.newFolder) fse.removeSync(options.dir);
				return reject();
			}
			
			let package = JSON.parse(fs.readFileSync(options.dir + "/package.json"));
			let settings = JSON.parse(fs.readFileSync(options.dir + "/app/settings.json"));
			
			package.name = options.project.toLowerCase().replace(/[\^'"\<>,;:\.*\[\]\(\)+?¿!&%@=]/gi, '').replace(/\s/g, '-');
			package.license = options.license;

			package.scripts = {...{
				run: "neu2 run",
				update: "neu2 build",
				release: "neu2 release"
			}, ...package.scripts};
			
			package.neu2 = {
				bin: options.sdk,
				platforms: options.targets.join(';').replace(".exe", '').split(';'),
				repo: options.template
			};

			settings.appname = options.sdk;

			package = JSON.parse(JSON.stringify(package).replace(/neu2\.(\w+)/g, (match, key) => options[key] || match));
			settings = JSON.parse(JSON.stringify(settings).replace(/neu2\.(\w+)/g, (match, key) => options[key] || match));

			fs.writeFileSync(options.dir + "/package.json", pjson(package, null, 2, 50));
			fs.writeFileSync(options.dir + "/app/settings.json", pjson(settings, null, 2, 50));

			return resolve();
		});
	}
}