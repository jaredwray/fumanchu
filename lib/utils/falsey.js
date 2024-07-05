// utils.js
function falsey(val, keywords) {
	if (!val) {
	  return true;
	}
  
	let words = keywords || [
	  "0",
	  "false",
	  "nada",
	  "nil",
	  "nay",
	  "nah",
	  "negative",
	  "no",
	  "none",
	  "nope",
	  "nul",
	  "null",
	  "nix",
	  "nyet",
	  "uh-uh",
	  "veto",
	  "zero",
	];
  
	if (!Array.isArray(words)) {
	  words = [words];
	}
  
	const lower = typeof val === "string" ? val.toLowerCase() : null;
  
	for (const word of words) {
	  if (word === val) {
		return true;
	  }
	  if (word === lower) {
		return true;
	  }
	}
  
	return false;
  }
  
  module.exports = falsey;
  