import React from "react";
import { Button, Steps } from "antd";

function AbilityTimeline ({props}){
    const {selectedAbilities, setSelectedAbilites, currentStep, setCurrentStep, onChange} = props;
    const {Step} = Steps;
    function onRemoveAbility(index){
        setSelectedAbilites(selectedAbilities.slice(0,index).concat(selectedAbilities.slice(index+1)));
    }
    
    return(
    <div id="AbilityTimeline" style={{paddingRight: "40px", overflow:"auto"}}>
        <Steps 
            current={currentStep}
            onChange={onChange}
            >
         {selectedAbilities.map((ability, index)=>(
         <Step 
         title={ability.skill}
            description=
            {
                <div>
                  <Button shape="circle" size="small" danger="true" onClick={()=>onRemoveAbility(index)}>X</Button>  
                    {ability.name}
                </div>
                
            }
            //icon can be provided: could use AA, Q, ect. or ability icon from league
            // subTitle={<Button shape="circle" size="small" danger="true" onClick={()=>onRemoveAbility(index)}>X</Button>}
            />
         ))}
        </Steps>
    </div>);
}
export default AbilityTimeline;