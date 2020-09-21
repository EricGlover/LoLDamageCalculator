import { Card } from "antd";
import React from "react";
// import championsImages from '../data/champion-splash-tiles/championImages';

function AbilityInfo ({props}){
    const {selectedChampion, levels} = props;
    console.log('important',selectedChampion.image.smallSquareSprite)
    return(<div 
        class="cf" style={{
        paddingRight:"20px",
        float:'right'
        }}
        >
        <div>WTF</div>
        <div>{selectedChampion.smallSquareSprite}</div>
        <Card title={selectedChampion.name} extra={<a href="#">More</a>} style={{ width: 300 }}>
            <img alt="please select a champion" src={selectedChampion.image.smallSquareSprite} style={{float:'right'}} ></img>
            <div>{selectedChampion.name} {selectedChampion.smallSquareSprite}</div>
            <Card.Meta>

            </Card.Meta>
            <div>Tags: {selectedChampion.tags ? selectedChampion.tags.join(', '): 'woops'}</div>
        </Card>
    </div>);
}
export default AbilityInfo;