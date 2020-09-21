// const str = "50 / 60 / 70 / 80 / 90";
// const numbers = str.split("/").map(str => Number.parseInt(str.trim()));
const fs = require('fs');
const Ratio = require('./backend/Entities/Ratio.js');
const Formatter = require('./backend/DataScraper/Formatter.js');
const formatter = new Formatter();
const DamageEffect = require('./backend/Entities/DamageEffect.js');

// "Bonus Attack Speed:50 / 65 / 80 / 95 / 110%"
// "Magic Damage:95 / 145 / 195 / 245 / 295 (+ 50% AP)\nSlow Duration:1 / 1.5 / 2 / 2.5 / 3"
/** Trist E descriptions, note the Passive versus Active components
 "Passive: Enemies explode when killed by Tristana's basic attacks, dealing magic damage to all nearby enemies.",
 "Active: Tristana places an explosive charge on the target enemy or enemy  turret. After 4 seconds, the charge detonates, dealing physical damage to nearby enemies and turrets. The explosion radius is doubled when used on a turret.",
 "Tristana's basic attacks and abilities against the target increase Explosive Charge's damage by 30%, stacking up to 4 times for a maximum 120% increase, upon which the charge also detonates instantly.",
 "Explosive Charge's total damage is increased by 0% − 33.3% (based on critical strike chance).",
 "If  Buster Shot is used to apply the last stack, the detonation will instead be delayed until the end of the  knock back or the 4 seconds expire."
**/
var leveling = "Physical Damage:»50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)«Reduced Damage:30 / 54 / 78 / 102 / 126 (+ 78 / 84 / 90 / 96 / 102% AD)";
var l2 = "Magic damage:70 / 110 / 150 / 190 / 230 (+ 80% AP)";
// [some damage descriptor]:[some list of 1..many numbers separated by '/'][optional percent %]
// then [optional (list of 1..many numbers separated by '/'][optional percent %]
// replace << and >>
console.log(Math.max(2,3));
let cruftRegex = /[»«]/gi;
var str = leveling.replace(cruftRegex, '');
// // var string = l2.replace(cruftRegex, '');

const numberRgx = () => /\d+\.?\d*/g;
const ratioRegex = () => /\([^\)]+\)/i;
const regex1 = () => /[^\d\s\/%]/i;
const physicalDamageRegex = () => /physical\s+damage\s*:/i;
const magicDamageRegex = () => /magic\s+damage\s*:/i;

// don't matchAll with g flag in Node
// don't test then matchAll with regex in Node
var damageDescriptorRegex = () => /physical\s+damage\s*:|magic\s+damage\s*|reduced\s+damage\s*:/ig;

// console.log(string.split(damageDescriptorRegex));
// console.log([...string.matchAll(damageDescriptorRegex)]);
if(damageDescriptorRegex().test(str)) {
    // find first instance of some damage descriptor
    for(const match of str.matchAll(damageDescriptorRegex())) {
        // , slice of previous parts
        let subStr = str.substr(match.index);
        // get and remove the damage type
        // todo::
        // find end of number string
        let damageRemovedSubString = '';
        let damageType = '';
        if(physicalDamageRegex().test(subStr)) {
            damageRemovedSubString = subStr.replace(physicalDamageRegex(), '');
            damageType = 'physical';
        } else if(magicDamageRegex().test(subStr)) {
            damageRemovedSubString = subStr.replace(magicDamageRegex(), '');
            damageType = 'magic';
        }
        console.log('damage removed', damageRemovedSubString);
        // check if flat or percent
        let isFlat = !damageRemovedSubString.includes('%');
        // subStr = "50 / 90 / 130 / 170 / 210 (+ 130 / 140 / 150 / 160 / 170% AD)«Reduced Damage:30 / 54 / 78 / 102 / 126 (+ 78 / 84 / 90 / 96 / 102% AD)";
        let damageNumbers = [];
        if(regex1().test(damageRemovedSubString)) {
            console.log('match');
            let m = damageRemovedSubString.match(regex1());
            console.log(m);
            let numberString = damageRemovedSubString.substr(0, m.index);
            console.log(numberString);
            damageNumbers = numberString.match(numberRgx()).map(str => Number.parseFloat(str));
            console.log(damageNumbers);
        }

        // get parenthesis



        // remove parentheses
        let ratios = [];
        if(ratioRegex().test(damageRemovedSubString)) {
            let parenthesisStr = damageRemovedSubString.match(ratioRegex())[0];
            let numbers = parenthesisStr.match(numberRgx()).map(str => Number.parseFloat(str));
            let isRatio = parenthesisStr.includes('%');
            let damageType = formatter.getRatioType(parenthesisStr);
            console.log(damageType);
            ratios = numbers.map(n => new Ratio(n, damageType));
            console.log(parenthesisStr, numbers, isRatio, damageType);
            // console.log(numbers);
        }
        if(ratioRegex().test(subStr)) {

        }
        // grab numbers

        // determine if flat or percent

        // look for optional ()'s

        // console.log('substring', subStr);
        // console.log(match);
        let damageEffect = new DamageEffect(damageType, damageNumbers, ratios);
        console.log(damageEffect);
        return;
    }
}
return;
// find first instance of some damage descriptor, slice of previous parts
for(const match of str.matchAll(damageDescriptorRegex)) {
    let subStr = str.substr(match.index);
    console.log(subStr);
    console.log(match);
}
return;
if(damageDescriptorRegex.test(str)) {
    // let match = null;
    // while((match = damageDescriptorRegex.))
    for(const match of str.matchAll(damageDescriptorRegex)) {
        let subStr = str.substr(match.index);
        console.log(subStr);
        console.log(match);
    }
}
// grab stuff
// slice off that part


return;
var damageDescriptors = [
    /physical damage:/i,
    /magic damage:/i
];
var damageType = [
    'physical',
    'magic'
];
//
// for(let i = 0; i < damageDescriptors.length; i++) {
//     let regex = damageDescriptors[i];
//     if(regex.test())
// }



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