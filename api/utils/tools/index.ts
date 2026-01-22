export const tools = {
	capitalizeEachFirstLetter: (word: string): string => {
		if (word) {
			let formattedWord = word.split(' ');
			formattedWord = formattedWord.map(letter => {
				return letter.charAt(0).toUpperCase() + letter.slice(1);
			});
			return formattedWord.join().replaceAll(',', ' ');
		} else {
			return word;
		}
	},
};
