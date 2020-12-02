const cfonts = require("cfonts");

module.exports = {
	name: "figlet",
	exec: (options) => {
		console.log();
		cfonts.say("Neu2", {
			font: "3d",
			align: "left",
			colors: ["#FF8C00", "gray"],
			background: "transparent",
			letterSpacing: 1,
			lineHeight: 1,
			space: false,
			maxLength: "0",
			gradient: false,
			independentGradient: false,
			transitionGradient: false,
			env: "node"
		});
		console.log();
	}
}