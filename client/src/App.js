import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Divider, Row, Col} from 'antd';
import Grid from 'antd/lib/card/Grid';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import ComboSegment from './Components/ComboSegment';
import LeftWindow from './Components/LeftWindow';
import Axios from 'axios';

let ogStuff = {};
ogStuff = [
  {
    name: "dark binding",
    skill: "Q",
    flatDamage: [50]
  }, 
  {
    name: "tormented soil",
    skill: "W",
    flatDamage: [100]
  } 
];
function App() {
  const [championAbilities, setchampionAbilities] = useState(ogStuff);
  const [selectedAbilities, setSelectedAbilites] = useState([]);
  const [selectedChampion, setSelectedChampion]=useState({name:'no name'});

  useEffect(()=>{
    Axios.get(`/champion/caitlyn`)
      .then(({data})=>{
        let champData = data;
        console.log(champData.abilities)
        setchampionAbilities(champData.abilities)
      })
  },[])
  return (
<div>
  <Row>
    <Col span="12">
        hello
        <LeftWindow props={{selectedChampion, setSelectedChampion}}></LeftWindow>
        {/* {selectedAbilities[0] ? selectedAbilities[0].name : 'no selection'} */}
    </Col>
    <Col span="12">
      combo segment        
      <ComboSegment props={{championAbilities, selectedAbilities, setSelectedAbilites, selectedChampion}}></ComboSegment>
    </Col>
  </Row>
</div>
  );
}

export default App;
