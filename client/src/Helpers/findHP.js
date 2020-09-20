export default function (champion, level, items){
    level = level.enemyChampion
    let baseHP = champion.baseStats.hp;
    let hpGrowth = champion.baseStats.hpPerLevel;
    return baseHP+hpGrowth*(level-1);
}