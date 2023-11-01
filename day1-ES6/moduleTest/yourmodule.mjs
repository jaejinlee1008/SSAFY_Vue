import { cube, foo, student } from "./mymodule.mjs"; //named export
import info from "./mymodule.mjs"; //default export

console.log(cube(3));
console.log(foo);
console.log(student.num, student.name, student.address);

console.log(info.code, info.city);
