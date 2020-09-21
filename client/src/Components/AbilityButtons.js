import React from "react";
import { Button, Select } from "antd";
const {Option} = Select;
function AbilityButtons ({props}){
    let {championAbilities, setSelectedAbilites, selectedAbilities, levels,
        setLevels}=props;
    console.log('stuff',championAbilities)
    let handleAbilityClick = (ability)=>{
        console.log(selectedAbilities);
        setSelectedAbilites(selectedAbilities.concat([ability]));
        console.log(selectedAbilities.concat([ability]));
    };
    let handleAbilityRankChange = (changeTo, ability)=>{
        let newLevels = {
            ...levels
        }
        newLevels[ability.skill] = changeTo;
        setLevels(newLevels);
    }
    return(<div>
        {championAbilities ? championAbilities.map((ability)=>{
            return(
            <div>
                <Select
                defaultValue={levels[ability.skill]} 
                onChange={changedTo=>handleAbilityRankChange(changedTo, ability)}
                >
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                </Select>
                <Button onClick={()=>handleAbilityClick(ability)}>
                    {ability.name}
                    
                </Button>
            </div>
            )
        }) : "No Abilities"}
    </div>);
}
export default AbilityButtons;