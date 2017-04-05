var getNowTime = () => {
    let time = new Date();
    let year = String(time.getFullYear());
    let month = addZero(time.getMonth() + 1);
    let day = addZero(time.getDate());
    let hour = addZero(time.getHours());
    let minute = addZero(time.getMinutes());
    let second = addZero(time.getSeconds());
    return year + month + day + hour + minute + second;
}

function addZero(num) {
    return num < 10 ? '0' + num : String(num);
}

module.exports = {
    getNowTime
}