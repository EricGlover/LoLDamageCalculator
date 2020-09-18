// const str = "50 / 60 / 70 / 80 / 90";
// const numbers = str.split("/").map(str => Number.parseInt(str.trim()));
const fs = require('fs');
// console.log(numbers);

const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// return;
let s =  'Physical Damage:»50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)«Reduced Damage:30 / 54 / 78 / 102 / 126 (+ 78 / 84 / 90 / 96 / 102% AD)';
// let s = "Physical Damage:»50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)";
let ratioRegex = /\([^\)]+\)/g;
let ratioStr = null;
if(ratioRegex.test(s)) {
    console.log(s.match(ratioRegex));
    return;
    ratioStr = s.match(ratioRegex)[0];
    if (/bonus ad/) {

    }else if(/ad/i.test(ratioStr)) {

    } else if (/ap/i.test(ratioStr)) {

    }
}

console.log(ratioStr);
let m = s.match(/\d+\.?\d*/g);
console.log(s.match(/\(.+\)/g));
console.log(m);
return;

// var s = "Physical Damage:»50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)«Reduced Damage:30 / 54 / 78 / 102 / 126 (+ 78 / 84 / 90 / 96 / 102% AD)";
// five digits separated by /'s => flat damage
// 0..5 digits separated by /'s

// find first digit




let reg = /\d*/g;
let matches  = [...s.match(reg)].filter(str => str.length > 1);
let numbers = matches.map(n => Number.parseInt(n));
console.log(matches);
console.log(numbers);
// console.log();
return;
[...s.exec(reg)].forEach(match => {
    console.log(match);
})


// \d \d
// \d*\s\d*\s\d*\s\d*\s\d*



// class Util {
//      static async loadFullChampionDetails() {
//         const championData = [];
//         const basePath = "./data/champions";
//         const dir = await fs.promises.opendir(basePath);
//         for await (const dirent of dir) {
//             if(dirent.isFile()) {
//                 console.log(`reading ${dirent.name}`);
//                 let data = fs.readFileSync(basePath + `/${dirent.name}`);
//                 let obj = JSON.parse(data);
//                 championData.push(Object.values(obj.data)[0]);
//             }
//         }
//         return championData.map(c => c.name);
//     }
//     static toNumberArr(str) {
//         return str.split("/").map(str => Number.parseInt(str.trim()));
//     }
//
//     static async  getChampionNames() {
//         return Util.loadFullChampionDetails();
//     }
// }
// Util.getChampionNames().then(names => {
//     fs.writeFileSync('./data/championNames.json', JSON.stringify(names, null, 2));
// });