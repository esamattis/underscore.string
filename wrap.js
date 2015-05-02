// Wrap
// wraps a string by a certain width

makeString = require('./helper/makeString');

module.exports = function wrap(str, options){
	str = makeString(str);

	options = options || {};

	width = options.width || 75;
	seperator = options.seperator || '\n';
	cut = options.cut || false;
	preserveSpaces = options.preserveSpaces || false;
	trailingSpaces = options.trailingSpaces || false;

	if(width <= 0){
		return str;
	}

	else if(!cut){

		words = str.split(" ");
		result = "";
		current_column = 0;

		while(words.length > 0){
			
			// if adding a space and the next word would cause this line to be longer than width...
			if(1 + words[0].length + current_column > width){
				//start a new line if this line is not already empty
				if(current_column > 0){
					// add a space at the end of the line is preserveSpaces is true
					if (preserveSpaces){
						result += ' ';
						current_column++;
					}
					// fill the rest of the line with spaces if trailingSpaces option is true
					else if(trailingSpaces){
						while(current_column < width){
							result += ' ';
							current_column++;
						}						
					}
					//start new line
					result += seperator;
					current_column = 0;
				}
			}

			// if not at the begining of the line, add a space in front of the word
			if(current_column > 0){
				result += " ";
				current_column++;
			}

			// tack on the next word, update current column, a pop words array
			result += words[0];
			current_column += words[0].length;
			words.shift();

		}

		// fill the rest of the line with spaces if trailingSpaces option is true
		if(trailingSpaces){
			while(current_column < width){
				result += ' ';
				current_column++;
			}						
		}

		return result;

	}

	else {

		index = 0;
		result = "";

		// walk through each character and add seperators where appropriate
		while(index < str.length){
			if(index % width == 0 && index > 0){
				result += seperator;
			}
			result += str.charAt(index);
			index++;
		}

		// fill the rest of the line with spaces if trailingSpaces option is true
		if(trailingSpaces){
			while(index % width > 0){
				result += ' ';
				index++;
			}						
		}
		
		return result;
	}
};