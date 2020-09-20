// const str = "50 / 60 / 70 / 80 / 90";
// const numbers = str.split("/").map(str => Number.parseInt(str.trim()));
const fs = require('fs');
// console.log(numbers);
let s = "Active: Wukong and his " +
"<img src=\"https://vignette.wikia.nocookie.net/leagueoflegends/images/2/2b/Warrior_Trickster.png/revision/latest/scale-to-width-down/20?cb=20130929123452\" \t alt=\"Warrior Trickster\"  \tclass=\"thumbborder \" \t \tdata-image-key=\"Warrior_Trickster.png\" \tdata-image-name=\"Warrior Trickster.png\" \t \t width=\"20\"  \t height=\"20\"  \t \t \t \t>" +
" clone empower their staffs, causing their next basic attack within 5 seconds to become <img src=\"https://vignette.wikia.nocookie.net/leagueoflegends/images/7/7a/Excessive_Force_2.png/revision/latest/scale-to-width-down/20?cb=20160608034953\" \t alt=\"Excessive Force 2\"  \tclass=\"\" \t \tdata-image-key=\"Excessive_Force_2.png\" \tdata-image-name=\"Excessive Force 2.png\" \t \t width=\"20\"  \t height=\"20\"  \t \t \t \t> unstoppable, gain <img src=\"https://vignette.wikia.nocookie.net/leagueoflegends/images/1/13/Range_icon.png/revision/latest/scale-to-width-down/15?cb=20170715002053\" \t alt=\"Range icon\"  \tclass=\"\" \t \tdata-image-key=\"Range_icon.png\" \tdata-image-name=\"Range icon.png\" \t \t width=\"15\"  \t height=\"15\"  \t \t \t \t> bonus range, deal bonus physical damage and <img src=\"https://vignette.wikia.nocookie.net/leagueoflegends/images/6/64/Armor_penetration_icon.png/revision/latest/scale-to-width-down/15?cb=20170515203442\" \t alt=\"Armor penetration icon\"  \tclass=\"\" \t \tdata-image-key=\"Armor_penetration_icon.png\" \tdata-image-name=\"Armor penetration icon.png\" \t \t width=\"15\"  \t height=\"15\"  \t \t \t \t> reduce the target's armor for 3 seconds."

let reg = /(<([^>]+)>)/ig;
console.log(s.replace(reg, ''));
// console.log(s);

return;
//
// const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
// const regex = /[A-Z]/g;
// const found = paragraph.match(regex);
//
// console.log(found);
// // return;
// let s =  'Physical Damage:»50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)«Reduced Damage:30 / 54 / 78 / 102 / 126 (+ 78 / 84 / 90 / 96 / 102% AD)';
// // let s = "Physical Damage:»50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)";
// let ratioRegex = /\([^\)]+\)/g;
// let ratioStr = null;
// if(ratioRegex.test(s)) {
//     console.log(s.match(ratioRegex));
//     return;
//     ratioStr = s.match(ratioRegex)[0];
//     if (/bonus ad/) {
//
//     }else if(/ad/i.test(ratioStr)) {
//
//     } else if (/ap/i.test(ratioStr)) {
//
//     }
// }
//
// console.log(ratioStr);
// let m = s.match(/\d+\.?\d*/g);
// console.log(s.match(/\(.+\)/g));
// console.log(m);
// return;
//
// // var s = "Physical Damage:»50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)«Reduced Damage:30 / 54 / 78 / 102 / 126 (+ 78 / 84 / 90 / 96 / 102% AD)";
// // five digits separated by /'s => flat damage
// // 0..5 digits separated by /'s
//
// // find first digit
//
//
//
//
// let reg = /\d*/g;
// let matches  = [...s.match(reg)].filter(str => str.length > 1);
// let numbers = matches.map(n => Number.parseInt(n));
// console.log(matches);
// console.log(numbers);
// // console.log();
// return;
// [...s.exec(reg)].forEach(match => {
//     console.log(match);
// })
//
//
// // \d \d
// // \d*\s\d*\s\d*\s\d*\s\d*
//
//
//
// // class Util {
// //      static async loadFullChampionDetails() {
// //         const championData = [];
// //         const basePath = "./data/champions";
// //         const dir = await fs.promises.opendir(basePath);
// //         for await (const dirent of dir) {
// //             if(dirent.isFile()) {
// //                 console.log(`reading ${dirent.name}`);
// //                 let data = fs.readFileSync(basePath + `/${dirent.name}`);
// //                 let obj = JSON.parse(data);
// //                 championData.push(Object.values(obj.data)[0]);
// //             }
// //         }
// //         return championData.map(c => c.name);
// //     }
// //     static toNumberArr(str) {
// //         return str.split("/").map(str => Number.parseInt(str.trim()));
// //     }
// //
// //     static async  getChampionNames() {
// //         return Util.loadFullChampionDetails();
// //     }
// // }
// // Util.getChampionNames().then(names => {
// //     fs.writeFileSync('./data/championNames.json', JSON.stringify(names, null, 2));
// // });