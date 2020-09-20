import { Card } from "antd";
import React from "react";
import championsImages from '../data/champion-splash-tiles/championImages';

function AbilityInfo ({props}){
    const {selectedChampion} = props;
    return(<div class="cf" style={{
        paddingRight:"20px",
        float:'right'
        }}>
        <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
            <div>{selectedChampion.name}</div>
    <img src={championsImages.selectedChampion} ></img>
            <div>Ability Info</div>
        </Card>
    </div>);
}
export default AbilityInfo;