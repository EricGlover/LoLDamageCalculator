import { Steps } from "antd";
import React, { useState } from "react";
import AbilityButtons from "./AbilityButtons";
import AbilityTimeline from "./AbilityTimeline";
import AbilityTimeLineZoomed from "./AbilityTimeLineZoomed";
function ComboSegment ({props}){
    const [currentStep, setCurrentStep] = useState(0);
    const {selectedAbilities, stuff, setSelectedAbilites} = props;
    const {choosableAbilities} = stuff;
    const onChange = function (clickedAbilityIndex){
        console.log(clickedAbilityIndex)
        setCurrentStep(clickedAbilityIndex);
    }
    return(<div>
         <div>zoomed out view of timeline</div>
        <AbilityTimeLineZoomed props={{
            selectedAbilities, setSelectedAbilites, currentStep, setCurrentStep, onChange
        }}></AbilityTimeLineZoomed>
        <div>enemy HP</div>
        <AbilityTimeline props={{
            selectedAbilities, 
            setSelectedAbilites,
            currentStep, 
            setCurrentStep,
            onChange
            }}/>
        <div>ability info</div>
        <AbilityButtons props={{choosableAbilities, 
            setSelectedAbilites, 
            selectedAbilities
            }}/>
    </div>);
}
export default ComboSegment;