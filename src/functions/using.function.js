/** user the passed object to execute the given code */
function using(obj, code, ref, refData) {
	/** replace html entities */
	const decodingMap = [
		{ entity: '&lt;', char: '<' },
		{ entity: '&gt;', char: '>' },
		{ entity: '&quot;', char: '"' },
		{ entity: '&amp;', char: '&' },
		{ entity: '&#10;', char: '\n' },
		{ entity: '&#9;', char: '\t' }
	];

	decodingMap.forEach(m => {
		code = code.replace(m.entity, m.char);
	});

	let withFunc = new Function('obj', ref, `
		let { ${Object.getOwnPropertyNames(obj).join(', ') } } = obj;
		return (${code});
	`);

	return withFunc(obj, refData);
}

/** export the function */
export { using };