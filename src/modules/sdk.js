const wget = require("wget-improved");
const fetch = require("node-fetch");
const unzip = require("unzipper");
const fse = require("fs-extra");
const fs = require("fs");

module.exports = {
	name: "sdk",
	exec: (options) => {
		return new Promise((resolve, reject) => {
			let newFolder = false;

			if(!fs.existsSync(options.dir)) {
				newFolder = true;
				fs.mkdirSync(options.dir);
			}
			
			if(!fs.existsSync(options.dir + "/temp/")) fs.mkdirSync(options.dir + "/temp/");
			
			fetch("https://api.github.com/repos/neutralinojs/neutralinojs/releases/latest")
			.then((res) => res.json())
			.then((json) => {
				let url = json.assets[0]["browser_download_url"];
				let sdk = wget.download(url, options.dir + "/temp/sdk.zip");
				
				sdk.on("error", () => {
					fse.removeSync(options.dir + "/temp/");
					if(newFolder) fs.rmdirSync(options.dir);
					reject();
				});

				sdk.on("end", () => {
					fs.createReadStream(options.dir + "/temp/sdk.zip").pipe(unzip.Extract({
						path: options.dir + "/temp/"
					}))
					.promise()
					.then(() => {
						options.targets.forEach((target) => {
							fs.renameSync(options.dir + "/temp/neutralino-" + target, options.dir + '/' + options.sdk + '-' + target);
							fs.chmodSync(options.dir + '/' + options.sdk + '-' + target, 111);
						});

						fse.removeSync(options.dir + "/temp/");
						resolve();
					});
				});
			});
		});
	}
}