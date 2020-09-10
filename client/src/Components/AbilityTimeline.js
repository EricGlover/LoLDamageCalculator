import React from "react";
function AbilityTimeline ({props}){
    const {selectedAbilities, setSelectedAbilites} = props;
    return(<div>
{        selectedAbilities.length ? selectedAbilities.map((ability, i)=>{
            return(i ? ', ' + ability.name : ability.name);
        })
        :
        "no abilities selected"}
    </div>);
}
export default AbilityTimeline;