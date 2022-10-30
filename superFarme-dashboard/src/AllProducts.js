import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { saveProducts,changeQty } from "./store/actions/product";
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {addToCart} from './store/actions/order';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useEffect} from 'react';


export default function AllProducts() {
  const dispatch=useDispatch();
  let arr=useSelector(state => state.prod.productsArr);
  
  useEffect(() => {
    if(arr.length==0){
    axios.get("http://localhost:5002/product").then(res => {
      console.log(res);
      dispatch(saveProducts(res.data));
  }
  ).catch(err => {
      console.log(err)
  });}
  }, []);



  let cart = useSelector(state => state.ord.cart);
  const addProdToCart=(p)=>{
       p.qty=1;
       dispatch(addToCart(p,1)); 
  }
  const changeQ =(e,value,item)=>{
       if(value=="plus")
         ++item.item.qty;
       else if(item.item.qty)
         --item.item.qty;
        dispatch(addToCart(item.item,item.item.qty)); 
        dispatch(changeQty(item.item,item.item.qty));
    }
    //יhooks שהתווספו לרידקס
    //useSelector_מאפשר לקבל נתונים מתוך הסטייט הכללי
    //useDispatch--מאפשר לשמור בסטייט הכללי ולערוך בו שינויים
    

    return (<>
    
        
            <Grid sx={{ flexGrow: 1 }} container spacing={2} marginTop="3vw" >
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing="100">
                {arr.map((item) => (
                  
                  <Grid key={item.id} item >
                      <Card sx={{ width:300 ,height:550}} key={item._id} > 
           
              <CardMedia
              fullwidth
                  component="img"
                  height="300"
                   image={item.img}
                    alt="sorry...no img"
                />
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" height={40}>
          {item.description}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" style={{marginRight:"5vw"}}>
         {item.price} ש"ח
        </Typography>
      </CardContent>
      <CardActions>
      <div dir='ltr' style={{ margin:"1vw",marginRight: "4vw" ,marginTop:"0"}}>
    {!item.qty? <Button variant="contained" disableElevation onClick={()=>addProdToCart(item)}  style={{ width:"7vw",height: "6vh" }}>
        <AddShoppingCartIcon color="action"/>
     הוסף לסל
    </Button>:<ToggleButtonGroup
      exclusive
      aria-label="text alignment"
      onChange={(e,value)=>changeQ(e,value,{item})}
    
    >
      <ToggleButton value="minus" aria-label="left aligned"  >
        < RemoveIcon  />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered" disabled >
       {item.qty}
      </ToggleButton>
      <ToggleButton  value="plus" aria-label="justified" >
        <AddIcon />
      </ToggleButton>
    </ToggleButtonGroup>}


      
    </div>
      </CardActions>
    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            </Grid>
    </>)
};