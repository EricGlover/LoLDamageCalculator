import { Progress } from "antd";
import React from "react";
import findHP from "../Helpers/findHP";
function EnemyHP ({props}){
    const {selectedAbilities,
        enemy,
        damageWithCurrentItems,
        damageWithOptimalItems, 
        levels} = props;
    const hpToPercent = (hp, outofHP)=>{
        console.log(hp/outofHP*100);
        return hp/outofHP*100
    }

    //todo add css tooltip hover
    return(<div style={{paddingRight: "60px"}}>
        Combo Damage
<div>{enemy.name} LVL:{levels.enemyChampion}</div>
       <Progress
       strokeLinecap="square"
       strokeColor="lightGreen"
       percent={hpToPercent(enemy.currentHP, enemy.maxHP)}
       trailColor="Black" 
       format={(percent, succesPercent)=>{
           console.log('ran formatting')
           return damageWithCurrentItems +"/" + findHP(enemy, levels) +" HP"
       }}
       success={{ 
           percent: hpToPercent(damageWithCurrentItems,enemy.maxHP),
           strokeColor: "Red" 
        }}
       ></Progress>
       <div style={{fontSize:"10px"}}>
            <span style={{color:"Red"}}>Current Combo Damage : {damageWithCurrentItems} </span>
            <span style={{color:"green"}}>Current HP : {enemy.currentHP} </span>
            <span style={{color:"black"}}>Enemy Max HP : {enemy.maxHP}</span>
       </div>
        Combo Damage With Optimal Items
        <Progress
       strokeLinecap="square"
       strokeColor="lightGreen"
       percent={60}
       trailColor="Black" 
       success={{ 
           percent: 30,
           strokeColor: "Red" 
        }}
       ></Progress>
    </div>);
}
export default EnemyHP;