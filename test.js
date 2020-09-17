const str = "50 / 60 / 70 / 80 / 90";
const numbers = str.split("/").map(str => Number.parseInt(str.trim()));
console.log(numbers);