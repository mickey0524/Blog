var changeTime = (time) => {
	let year = time.slice(0, 4);
	let month = time.slice(4, 6);
	let day = time.slice(6, 8);
	let hour = time.slice(8, 10);
	let minute = time.slice(10, 12);
	let second = time.slice(12, 14);
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

var getMonth = (time) => {
	time = time.split(' ');
	time = time[0];
	time = time.split('-');
	return time;
}

export {
	changeTime,
	getMonth
}