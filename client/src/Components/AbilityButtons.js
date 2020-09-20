import React from "react";
const { Button } = require("antd");

function AbilityButtons ({props}){
    let {championAbilities, setSelectedAbilites, selectedAbilities}=props;
    console.log('stuff',championAbilities)
    let handleAbilityClick = (ability)=>{
        console.log(selectedAbilities);
        setSelectedAbilites(selectedAbilities.concat([ability]));
        console.log(selectedAbilities.concat([ability]));
    };
    return(<div>
        {championAbilities ? championAbilities.map((ability)=>{
            return(<Button onClick={()=>handleAbilityClick(ability)}>
                {ability.name}
            </Button>)
        }) : "No Abilities"}
    </div>);
}
export default AbilityButtons;