import * as React from 'react';
import axios from "axios";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./store/actions/product";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { InsertEmoticon } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function AddProduct() {
    let dis = useDispatch();
    let [product, setProduct] = useState({ name: "מי פנים", price:120, campony: "GARNIER" ,
    description:"מי פנים לניקוי והסרת איפור, מתאים לכל סוגי העור",content:"120 מל",
    isFragile:false,img:"faceWater.jpg",qty:0});
    let [qt,setQt]=React.useState(0);
    let change = (e) => {
        let {name, value,type}=e.target;
        if(type=="number")
        value=+value;
        if(type=="checkbox")
        value=e.target.checked;
        let p={...product};
        p[name]=value;
        setProduct(p);
            }
    const save = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5002/product", product).
            then(res => {
                console.log(res.data);
                dis(addProduct(res.data))
            })
    }
    
    
    
    return (<>
{/* <input type="text" placeholder="name" name="name" onChange={change}/> */}
<input type="button" value="הוסף" onClick={save}/>
      
</>
    )
            
}