import { useSelector } from "react-redux";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {addToCart} from './store/actions/order';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {changeQty } from "./store/actions/product";
import { NotFound } from './notFoundUser';

export default function Cart(props){
    let dis = useDispatch();
    const navigate=useNavigate();
    const changeQ =(e,value,item)=>{
        if(value=="plus")
          ++item.item.qty;
        else if(item.item.qty)
          --item.item.qty;
         dis(addToCart(item.item,item.item.qty)); 
         dis(changeQty(item.item,item.item.qty));
     }
    const StyledPaper = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        maxWidth: 600,
        color: theme.palette.text.primary,
      }));
    let cart = useSelector(state => state.ord.cart);
    let currentUser= useSelector(state=> state.user.currnetUser);
    const totalPrice = cart.map(x=>x.price*x.qty).reduce((x, c) => x + c, 0);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const finishOrder=()=>{
      props.handleClose();
      if(currentUser)
         navigate(`finishOrder`);
      else{
      setOpen(true);
      }
    }
  return (<>
    <Dialog
    fullWidth={true}
    maxWidth='md'
    open={props.open}
    onClose={props.handleClose}
  >
    <DialogTitle  color="warning">סל קניות- {totalPrice} ש"ח</DialogTitle>
    <DialogContent>
<Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
            {cart.map((item) => (
<Card sx={{ display: 'flex' , marginBottom:"2vw"}} >
         <CardMedia
        component="img"
        sx={{ width: 151,height:150 ,marginRight:"2vw"}}
        image={item.img}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex',flexGrow: 1, marginRight:"2vw" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
           {item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {item.qty}X{item.price}={(item.qty)*(item.price)}
          </Typography>
        </CardContent>
        <div dir="ltr" style={{height:"12vh",width:"10vw" ,marginRight:"3vw",marginTop:"5vh"}}>
        <ToggleButtonGroup
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
    </ToggleButtonGroup></div>
      </Box>
     
    </Card>     ))}
      </StyledPaper>
    </Box> </DialogContent>
    <DialogActions>
      <Button onClick={finishOrder}>סיים הזמנה</Button>
      <Button onClick={props.handleClose}>חזרה לקניה</Button>
    </DialogActions>
  </Dialog>
  <NotFound open={open} handleClose={handleClose} message="עדיין לא ביצעתם כניסה/הרשמה למערכת
  "  button1="מעבר להרשמה"   button2="ביטול"/></>
  );
}