import React from "react";
import { Steps } from "antd";

function AbilityTimeLineZoomed ({props}){
    const {selectedAbilities, setSelectedAbilites, currentStep, setCurrentStep, onChange} = props;
    const {Step} = Steps;

    return(
    <div style={{overflow: "auto"}}>
        <Steps
            type="navigation"
            size="small"
            current={currentStep}
            onChange={onChange}
        >
            {selectedAbilities.map(ability=>{

                return(
                    <Step></Step>
                )
            })}
        </Steps>
    </div>);
}
export default AbilityTimeLineZoomed;