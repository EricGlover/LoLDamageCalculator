import React from "react";
const { Button } = require("antd");

function AbilityButtons ({props}){
    let {choosableAbilities, setSelectedAbilites, selectedAbilities}=props;
    let handleAbilityClick = (ability)=>{
        console.log(selectedAbilities);
        setSelectedAbilites(selectedAbilities.concat([ability]));
        console.log(selectedAbilities.concat([ability]));
    };
    return(<div>
        {choosableAbilities ? choosableAbilities.map((ability)=>{
            return(<Button onClick={()=>handleAbilityClick(ability)}>
                {ability.name}
            </Button>)
        }) : "No Abilities"}
    </div>);
}
export default AbilityButtons;