module.exports = {
	name: "align",
	exec: (options) => {
		options = {...{
			text: '',
			textBefore: '',
			spacing: 0
		}, ...options};

		let textAligned = options.text.split('');
		let textStart = options.textBefore.split('');
		for (let i = 0; i != options.spacing; i++) {
			if(textStart.length >= i) continue;
			textAligned.unshift(' ');
		}

		return textAligned.join('');
	}
}