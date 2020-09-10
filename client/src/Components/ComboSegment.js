import React from "react";
import AbilityButtons from "./AbilityButtons";
import AbilityTimeline from "./AbilityTimeline";
function ComboSegment ({props}){
    const {selectedAbilities, stuff, setSelectedAbilites} = props;
    const {choosableAbilities} = stuff;
    return(<div>
         <div>zoomed out view of timeline</div>
        <div>enemy HP</div>
        <AbilityTimeline props={{selectedAbilities, setSelectedAbilites}}/>
        <div>ability info</div>
        <AbilityButtons props={{choosableAbilities, setSelectedAbilites, selectedAbilities}}/>
    </div>);
}
export default ComboSegment;