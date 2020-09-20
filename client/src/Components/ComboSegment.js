import { Steps } from "antd";
import React, { useState, useEffect } from "react";
import AbilityButtons from "./AbilityButtons";
import AbilityInfo from "./AbilityInfo";
import AbilityTimeline from "./AbilityTimeline";
import AbilityTimeLineZoomed from "./AbilityTimeLineZoomed";
import EnemyHP from "./EnemyHP";
import axios from "axios";
import SelectChampionAndEnemyLevels from "./SelectChampionAndEnemyLevels"
function ComboSegment ({props}){
    const [currentStep, setCurrentStep] = useState(0);
    const [enemy, setEnemy]= useState({
        baseStats: {
            hp:10
        }
    });
 
    let myChampionStats = {}
    useEffect(()=>{
        axios.get(`/champion/caitlyn`)
        .then(({data})=>{
            myChampionStats = data;
            console.log(data);
            return axios.get(`/champion/caitlyn`);
        })
        .then(({data})=>{
            data.currentHP = data.baseStats.hp
            data.maxHP = data.baseStats.hp
            setEnemy(data);
            console.log(enemy);
        })
        .catch(err=>{
            debugger;
            console.log(err)})
    }, [])

    const {selectedAbilities, championAbilities, setSelectedAbilites, selectedChampion, levels, setLevels} = props;
    let damageWithCurrentItems = 0; 
    if(selectedAbilities.length!==0){
        damageWithCurrentItems= selectedAbilities.reduce((total,ability)=>{
            if (ability.skill !== "I"){
                let abilityRank=levels[ability.skill]
                if (abilityRank> 0){
                    return total+ability.flatDamage[abilityRank-1]
                } else {
                    return total;
                }
            } else {
                return total;
            }
        }, 0);
    }
    let damageWithOptimalItems = 100;
    const onChange = function (clickedAbilityIndex){
        console.log(clickedAbilityIndex)
        setCurrentStep(clickedAbilityIndex);
    }
    return(<div>
         <div>zoomed out view of timeline</div>
        <AbilityTimeLineZoomed props={{
            selectedAbilities, setSelectedAbilites, currentStep, setCurrentStep, onChange
        }}></AbilityTimeLineZoomed>
        <EnemyHP props={{
            selectedAbilities,
            enemy,
            damageWithCurrentItems,
            damageWithOptimalItems,
            levels,
        }}/>
        <AbilityTimeline props={{
            selectedAbilities, 
            setSelectedAbilites,
            currentStep, 
            setCurrentStep,
            onChange
            }}/>
        <div>ability info</div>
        <AbilityInfo props={{selectedChampion}}/>
        <p></p>
        <AbilityButtons props={{championAbilities, 
            setSelectedAbilites, 
            selectedAbilities,
            levels,
            setLevels
            }}/>
        <SelectChampionAndEnemyLevels props={{selectedChampion, enemy, levels, setLevels,}} />
    </div>);
}
export default ComboSegment;