import React, { useState, useEffect } from "react";
import AatroxSplash from "../data/champion-splash-tiles/Aatrox_Splash_Tile_0.jpg";
import ChampSplashs from "../data/champion-splash-tiles/championImages";
const { AutoComplete, Avatar } = require("antd");

function LeftWindow ({props}){
    const [value, setValue] = useState('')
    const [options, setOptions] = useState([]);
    const {selectedChampion, fetchAndSetSelectedChampion} = props;



    useEffect(()=>{
        let newOptions = championNames.map(championSTR=>{
            return {label: championSTR, value: championSTR};
        })
        setOptions(newOptions);
    },[]);
    
   const onAutoCompleteSelectChampion = data=>{
    fetchAndSetSelectedChampion({name:data})
       let newOptions = championNames.map(championSTR=>{
        return {label: championSTR, value: championSTR};
    }) 
       setOptions(newOptions)
    };
   const onAutoCompleteChampionChange = (data) => {
        const filteredOptions=[]   
        championNames.forEach(championName=>{
            if(championName.toLowerCase().includes(data.toLowerCase())){
                filteredOptions.push({label:championName, value:championName})
            }
        })
        setOptions(filteredOptions);
    };
    const onChampClick=(championName)=>{
        //todo make axios call for specific champion
        fetchAndSetSelectedChampion({name:championName})
        console.log(championName)
    }
    return(<div>
        <div>Search Champion:</div>
        <AutoComplete
        onChange={onAutoCompleteChampionChange}
        onSelect={onAutoCompleteSelectChampion}
        options={options}
        style={{ width: 200 }}
        />
        <div>{selectedChampion.name}</div>
        <div style={{overflow:"auto", maxHeight:"400px", paddingRight:"40px"}}>
            {options.map(championName=>{return(
            <span style={{paddingRight:"10px", paddingBottom:"10px", display:"inline-block"}}
            onClick={()=>onChampClick(championName.value)}
            >
                <Avatar
                    size="large"
                    shape='square'
                    src={ChampSplashs[championName.value]}

                >{championName.value}</Avatar>
            </span>
            )})}
        </div>

        
    </div>);
}

const championNames = [
    "Jarvan IV",
    "Aurelion Sol",
    "Riven",
    "Shyvana",
    "Yuumi",
    "Kog'Maw",
    "Vel'Koz",
    "Ekko",
    "Hecarim",
    "Malphite",
    "Kalista",
    "Zac",
    "Nocturne",
    "Janna",
    "Darius",
    "Vladimir",
    "Pyke",
    "Brand",
    "Urgot",
    "Ahri",
    "Skarner",
    "LeBlanc",
    "Jinx",
    "Leona",
    "Swain",
    "Shen",
    "Trundle",
    "Karma",
    "Camille",
    "Soraka",
    "Lucian",
    "Amumu",
    "Kayle",
    "Draven",
    "Jhin",
    "Wukong",
    "Sivir",
    "Zed",
    "Cho'Gath",
    "Blitzcrank",
    "Ezreal",
    "Lux",
    "Kha'Zix",
    "Udyr",
    "Volibear",
    "Nasus",
    "Nami",
    "Diana",
    "Singed",
    "Kassadin",
    "Caitlyn",
    "Yone",
    "Annie",
    "Tahm Kench",
    "Syndra",
    "Poppy",
    "Garen",
    "Xin Zhao",
    "Twitch",
    "Alistar",
    "Anivia",
    "Sion",
    "Master Yi",
    "Graves",
    "Yasuo",
    "Kayn",
    "Akali",
    "Neeko",
    "Kindred",
    "Elise",
    "Sylas",
    "Karthus",
    "Sejuani",
    "Sett",
    "Warwick",
    "Heimerdinger",
    "Sona",
    "Twisted Fate",
    "Rek'Sai",
    "Senna",
    "Shaco",
    "Jayce",
    "Ornn",
    "Kennen",
    "Varus",
    "Nautilus",
    "Rumble",
    "Mordekaiser",
    "Lee Sin",
    "Veigar",
    "Tryndamere",
    "Ivern",
    "Xerath",
    "Thresh",
    "Talon",
    "Ryze",
    "Viktor",
    "Fiora",
    "Azir",
    "Zoe",
    "Jax",
    "Rengar",
    "Taliyah",
    "Vayne",
    "Yorick",
    "Bard",
    "Braum",
    "Nunu",
    "Gangplank",
    "Tristana",
    "Corki",
    "Malzahar",
    "Gragas",
    "Teemo",
    "Lissandra",
    "Fizz",
    "Morgana",
    "Evelynn",
    "Aphelios",
    "Gnar",
    "Ziggs",
    "Vi",
    "Irelia",
    "Ashe",
    "Nidalee",
    "Dr. Mundo",
    "Zilean",
    "Qiyana",
    "Lulu",
    "Katarina",
    "Illaoi",
    "Aatrox",
    "Lillia",
    "Zyra",
    "Kled",
    "Renekton",
    "Pantheon",
    "Fiddlesticks",
    "Olaf",
    "Rakan",
    "Quinn",
    "Orianna",
    "Maokai",
    "Xayah",
    "Rammus",
    "Galio",
    "Miss Fortune",
    "Kai'Sa",
    "Taric",
    "Cassiopeia"
  ]
export default LeftWindow;

