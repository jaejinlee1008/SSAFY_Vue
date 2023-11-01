function cube(x) {
  return x * x * x;
}

const foo = Math.PI * 2;

var student = {
  num: 12345,
  name: "tommy lee",
  address: "seoul",
};
//다른 스크립트 파일에서 사용 가능하도록 외부로 내보냄
//named export
export { cube, foo, student };

//default export 1번만 가능
export default {
  code: 9999,
  city: "seatle",
};
