const wget = require("wget-improved");
const fetch = require("node-fetch");
const unzip = require("unzipper");
const cpd = require("copy-dir");
const fse = require("fs-extra");
const fs = require("fs");

module.exports = {
	name: "template",
	exec: (options) => {
		return new Promise((resolve, reject) => {
			let template = options.template;
			
			if(!fs.existsSync(options.dir + "/temp/")) fs.mkdirSync(options.dir + "/temp/");
			
			fetch(`https://api.github.com/repos/${template.author}/${template.repo}`)
			.then((res) => {
				if(!res.ok) {
					fse.removeSync(options.dir + "/temp/");
					if(options.newFolder) fs.rmdirSync(options.dir);
					return reject(res.status == 403 ? 0 : 1);
				}

				res.json().then((json) => {
					if(template.branch == undefined) template.branch = json["default_branch"];

					fetch(`https://api.github.com/repos/${template.author}/${template.repo}/branches/${template.branch}`)
					.then((res) => {
						if(!res.ok) {
							fse.removeSync(options.dir + "/temp/");
							if(options.newFolder) fs.rmdirSync(options.dir);
							return reject(res.status == 403 ? 0 : 2);
						}

						let repo = wget.download(`https://github.com/${template.author}/${template.repo}/archive/${template.branch}.zip`, options.dir + "/temp/template.zip");

						repo.on("error", (e) => {
							fse.removeSync(options.dir + "/temp/");
							if(options.newFolder) fs.rmdirSync(options.dir);
							return reject(3);
						});

						repo.on("end", () => {
							fs.createReadStream(options.dir + "/temp/template.zip").pipe(unzip.Extract({
								path: options.dir + "/temp/"
							}))
							.promise()
							.then(() => {
								cpd.sync(`${options.dir}/temp/${options.template.repo}-${options.template.branch}`, options.dir);

								fse.removeSync(options.dir + "/temp/");

								return resolve();
							});
						});
					});
				});
			});
		});
	}
}