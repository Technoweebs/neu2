const neu = require(__dirname + "/../neu2.js");
const fs = require("fs");

module.exports = {
	consts: {
		name: "create",
		args: ["help", "dir", "sdk", "license", "targets"],
		arch: "[name] <template (@user/repo(:branch) | URL | 'full')> <options>",
		function: "Creates a new project"
	},
	exec: (args, options) => {
		options = {...{
			project: '',
			dir: '',
			sdk: "app",
			newFolder: false,
			targets: ["win.exe", "mac", "linux"],
			license: "MIT",
			template: {
				author: "TomaruDev",
				repo: "neu2-init",
				branch: "main"
			}
		}, ...options};
		if(options.help) return neu.get("modules").exec("help", { doc: "create" });
		if(options.dir == null) return neu.get("modules").exec("help", { doc: "create", message: "The folder you entered is invalid !" });
		if(options.sdk == null) return neu.get("modules").exec("help", { doc: "create", message: "The SDK name you entered is invalid !" });
		if(options.license == null) return neu.get("modules").exec("help", { doc: "create", message: "The license you entered is invalid (see the license codes on the SPDX website) !" });
		if(options.targets == null) return neu.get("modules").exec("help", { doc: "create", message: "The targets you entered are invalid !" });
		if(args[0] == undefined) return neu.get("modules").exec("help", { doc: "create", message: "You must enter a name for your project !" });
		
		if(options.dir == '') options.dir = args[0].replace(/[/\\?%*:|'"<>]/g, '')
		if(os.platform() == "win32") options.dir = options.dir.replace(/(CON|PRN|AUX|NUL|COM1|COM2|COM3|COM4|COM5|COM6|COM7|COM8|COM9|LPT1|LPT2|LPT3|LPT4|LPT5|LPT6|LPT7|LPT8|LPT9)/gi, "nope");;
		options.project = args[0];
		
		if(neu.get("modules").exec("checkFolder", options)) return neu.get("modules").exec("help", { doc: "create", message: "The folder you entered already exists and contain files !" });
		
		if(!fs.existsSync(options.dir)) {
			options.newFolder = true;
			fs.mkdirSync(options.dir);
		}

		if(args[1]) {
			if(args[1].match(/^full$/i)) args[1] = "@TomaruDev/neu2-template";
			let repo;
			
			if(args[1].match(/^(https?:\/\/)?(www\.)?github\.com\/((?!.*(-){2,}.*)[a-z0-9][a-z0-9-]{0,38}[a-z0-9])\/[a-zA-Z0-9_\.-]+(\/tree\/[a-zA-Z0-9_\.-]+)?$/i)) {
				repo = args[1].split('/').slice(Math.max(args[1].split('/').length - 2, 0));
				repo[1] = repo[1].replace(/\.git$/i, '');
				
			} else if(args[1].match(/^@?((?!.*(-){2,}.*)[a-z0-9][a-z0-9-]{0,38}[a-z0-9])\/[a-zA-Z0-9_\.-]+(\:[a-zA-Z0-9_\.-]+)?$/i)) {
				repo = args[1].split(/[\/:]/);
				repo[0] = repo[0].replace(/^@?/i, '');
				repo[1] = repo[1].replace(/\.git$/i, '');
			}
			
			if(repo == null) return neu.get("modules").exec("help", { doc: "create", message: "The template you entered is invalid !" });
			
			options.template.author = repo[0];
			options.template.repo = repo[1];
			options.template.branch = repo[2];
		}
		
		neu.get("modules").exec("template", options)
		.then(() => {
			neu.get("modules").exec("parse", options)
			.then(() => {
				neu.get("modules").exec("sdk", options)
				.then(() => {
					neu.get("modules").exec("clean", options)
					.then(() => {
						neu.get("modules").exec("figlet");
						console.log("                     Your project has been sucessfully created !");
					});
				});
			})
			.catch(() => {
				neu.get("modules").exec("help", { doc: "create", message: "The repo you entered isn't a valid Neu2 template !" });
			});
		})
		.catch((e) => {
			switch(e) {
				case 0:
				neu.get("modules").exec("figlet");
				console.log("             There's an error with the Github API. Please try again later !");
				break;
				
				case 1:
				neu.get("modules").exec("help", { doc: "create", message: "The repo / user you entered doesn't exists, or you don't have any internet !" });
				break;
				
				case 2:
				neu.get("modules").exec("help", { doc: "create", message: "The branch you entered doesn't exists, or you don't have any internet !" });
				break;
				
				case 3:
				neu.get("modules").exec("figlet");
				console.log("                      Sorry, but we can't download the template.");
				console.log("                        Please check your internet connection !");
				break;
			}
		});
	}
}