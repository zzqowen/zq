
//类数组转数组
const likeArrToArr = (likeArr) => {
  if (Array.prototype.slice) {
    return Array.prototype.slice.call(likeArr);
  } else {
    let arr = [];
    for (let j = 0; j < likeArr.length; j++) {
      arr.push(likeArr[j])
    };
    return arr;
  }
}

export {
  likeArrToArr
}