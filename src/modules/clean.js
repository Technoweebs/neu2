const findr = require("find-remove");

module.exports = {
	name: "clean",
	exec: (options) => {
		return new Promise((resolve, reject) => {
			findr(options.dir, {
				extensions: [".md", ".txt", ".lock", ".log"],
				files: ["README", "LICENSE", "CHANGELOG", "package-lock.json", ".gitignore", ".gitattributes", ".gitkeep", ".editorconfig", ".travis.yml", ".styleci.yml"]
			});
			return resolve();
		});
	}
}