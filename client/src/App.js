import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Divider, Row, Col} from 'antd';
import Grid from 'antd/lib/card/Grid';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import ComboSegment from './Components/ComboSegment';

let ogStuff = {};
ogStuff.choosableAbilities = [
  {
    name: "dark binding",
    key: "Q"
  }, 
  {
    name: "tormented soil",
    key: "W"
  } 
];
function App() {
  const [stuff, setStuff] = useState(ogStuff);
  const [selectedAbilities, setSelectedAbilites] = useState([]);
  return (
<div>
  <Row>
    <Col span="12">
        hello
        {selectedAbilities[0] ? selectedAbilities[0].name : 'no selection'}
    </Col>
    <Col span="12">
      combo segment        
      <ComboSegment props={{stuff, selectedAbilities, setSelectedAbilites}}></ComboSegment>
    </Col>
  </Row>
</div>
  );
}

export default App;
