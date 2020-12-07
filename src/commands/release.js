const neu = require(__dirname + "/../neu2.js");
const { execSync } = require("child_process");
const fse = require("fs-extra");
const cpd = require("copy-dir");
const zip = require("adm-zip");
const os = require("os");
const fs = require("fs");

module.exports = {
	consts: {
		name: "release",
		args: ["help", "dir"],
		arch: "<options>",
		function: "Releases the project into a .zip file"
	},
	exec: (args, options) => {
		options = {...{
			dir: "."
		}, ...options};
		if(options.help) return neu.get("modules").exec("help", { doc: "release" });
		if(options.dir == null) return neu.get("modules").exec("help", { doc: "release", message: "The folder you entered is invalid !" });
		
		if(!fs.existsSync(options.dir + "/package.json")) return neu.get("modules").exec("help", { doc: "release", message: "There's no project in this folder !"});
		const package = JSON.parse(fs.readFileSync(options.dir + "/package.json"));
		
		if(!package.neu2) return neu.get("modules").exec("help", { doc: "release", message: "There's no valid Neu2 projet in this folder !"});
		if(!fs.existsSync(options.dir)) fs.mkdirSync(options.dir);
		if(!fs.existsSync(options.dir + "/dist")) fs.mkdirSync(options.dir + "/dist");
		
		let release = `${package.neu2.project}-${package.version}`.replace(/[/\\?%*:|'"<>]/g, '');
		if(os.platform == "win32") release = release.replace(/(CON|PRN|AUX|NUL|COM(1-9)*|LPT(1-9)*)/gi, '0');

		if(package.scripts.build) {
			try {
				execSync(`cd ${options.dir} && npm run build`);
			} catch(e) {}
		}
		
		fs.mkdirSync(`${options.dir}/temp/${release}/`, { recursive: true });
		
		cpd.sync(`${options.dir}/`, `${options.dir}/temp/${release}/`, {
			filter: (stat, filepath, filename) => {
				if(stat === "directory" && filename.match(/(temp|src|dist|node_modules)/i)) return false;
				if(stat === "file" && filename.match(/(\.config\.js|package.*\.json|\.lock|\.log)$/i)) return false;
				if(stat === "file" && filename.match(new RegExp(`^${package.neu2.bin}-`, 'i'))) return false;

				return true;
			}
		});

		neu.get("modules").exec("sdk", { dir: `${options.dir}/temp/${release}/`, newFolder: false, sdk: package.neu2.bin, targets: package.neu2.platforms.join(';').replace("win", "win.exe").split(';') }).then(() => {
			const file = new zip();

			file.addLocalFolder(`${options.dir}/temp/${release}/`, '');
			file.writeZip(`${options.dir}/dist/${release}.zip`);

			fse.removeSync(`${options.dir}/temp/`);

			neu.get("modules").exec("figlet");
			console.log("                    Your project has been sucessfully released !                     ");
		});
	}
}