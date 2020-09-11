import React from "react";
import { Steps } from "antd";

function AbilityTimeline ({props}){
    const {selectedAbilities, setSelectedAbilites} = props;
    const {Step} = Steps;
    return(
    <div style={{paddingRight: "40px"}}>
        <Steps current={selectedAbilities.length-1}>
         {selectedAbilities.map(ability=>(
         <Step 
            title={ability.key}
            description={ability.name}
            //icon can be provided: could use AA, Q, ect. or ability icon from league

            />
         ))}
        </Steps>
    </div>);
}
export default AbilityTimeline;