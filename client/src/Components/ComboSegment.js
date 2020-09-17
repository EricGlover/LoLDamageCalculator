import { Steps } from "antd";
import React, { useState } from "react";
import AbilityButtons from "./AbilityButtons";
import AbilityInfo from "./AbilityInfo";
import AbilityTimeline from "./AbilityTimeline";
import AbilityTimeLineZoomed from "./AbilityTimeLineZoomed";
import EnemyHP from "./EnemyHP";
function ComboSegment ({props}){
    const [currentStep, setCurrentStep] = useState(0);
    const enemy = {
        currentHP: 1000,
        maxHP: 2000
    };
    const {selectedAbilities, stuff, setSelectedAbilites} = props;
    const {choosableAbilities} = stuff;
    let damageWithCurrentItems = 0; 
    if(selectedAbilities.length!==0){
        damageWithCurrentItems= selectedAbilities.reduce((total,ability)=>total+ability.damage, 0);
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
            damageWithOptimalItems
        }}/>
        <AbilityTimeline props={{
            selectedAbilities, 
            setSelectedAbilites,
            currentStep, 
            setCurrentStep,
            onChange
            }}/>
        <div>ability info</div>
        <AbilityInfo/>
        <AbilityButtons props={{choosableAbilities, 
            setSelectedAbilites, 
            selectedAbilities
            }}/>
    </div>);
}
export default ComboSegment;