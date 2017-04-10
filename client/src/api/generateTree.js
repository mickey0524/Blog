var generateArr = (content) => {
	let pattern = /<h([1-6]).+[1-6]>/g;
	let result;
	let appendixContent = { level: 0, children: [] };
	while (result = pattern.exec(content)) {
		result[0] = result[0].replace(/h[1-6]/g, 'a');
		result[0] = result[0].replace(/id="/g, 'href="#');
		if (result[1] > appendixContent.level) {
			appendixContent.children.push({
				level: result[1],
				content: result[0],
				parent: appendixContent,
				children: []
			});
			appendixContent = appendixContent.children[appendixContent.children.length - 1];
		}
		else if (result[1] === appendixContent.level) {
			appendixContent.parent.children.push({
				level: result[1],
				content: result[0],
				parent: appendixContent.parent,
				children: []
			});
			appendixContent = appendixContent.parent.children[appendixContent.parent.children.length - 1];
		}
		else {
			while (result[1] < appendixContent.level) {
				appendixContent = appendixContent.parent;
			}
			appendixContent.parent.children.push({
				level: result[1],
				content: result[0],
				parent: appendixContent.parent,
				children: []
			});
			appendixContent = appendixContent.parent.children[appendixContent.parent.children.length - 1];					
		}
	}
	while(appendixContent.level != 0) {
		appendixContent = appendixContent.parent;
	}
	return appendixContent.children;
}

var buildTree = (arr) => {
	let ul = document.createElement('ul');
	for (let i in arr) {
		let li = document.createElement('li');
		li.innerHTML = arr[i].content;
		if (arr[i].children.length !== 0) {
			li.appendChild(buildTree(arr[i].children));
		}
		ul.appendChild(li);
	}
	return ul;
}

export {
	generateArr,
	buildTree
}