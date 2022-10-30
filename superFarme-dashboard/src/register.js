import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
 import axios from 'axios';
 import { useDispatch } from 'react-redux';
import {saveUser} from "./store/actions/user"
export const Register=(props)=>{
    let dispatch = useDispatch();
    let [user, setUser] = useState({ name: "",password:"",city:"",street:"",numHouse:"",phone:"",mail:"" ,position:0});
    let change = (e) => {
        let {name, value,type}=e.target;
        if(type=="number")
        value=+value;
        let u ={...user};
        u[name]=value;
        setUser(u);
    }
    const register=()=>{
        props.handleClose();
        axios.post("http://localhost:5002/user",user).then(res => {
            console.log(res);
            dispatch(saveUser(res.data));
        }
        ).catch(err => {
            console.log(err)
            
        });

    }

    return (<>
    <Dialog
    fullWidth={true}
    maxWidth='md'
    open={props.open}
    onClose={props.handleClose}
  >
    <DialogTitle>הרשמה</DialogTitle>
    <DialogContent>
      <DialogContentText>
      יש למלא את כל הפרטים במדויק.
      </DialogContentText>
      <Box
       
        component="form"
        sx={{
          display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 3,
          '& .MuiTextField-root': { m: 1.5, width: '45ch' },
        }}
        noValidate
      >
          <TextField
          required
          name="name"
          label="שם"
          type="text"
          defaultValue=""
          onChange={change} 
          color="warning"
        /> 
        <TextField
          name="password"
          required
          label="סיסמא"
          type="password"
          autoComplete="current-password"
          onChange={change} 
          color="warning"
        />    
         <TextField
          name="phone"
          required
          label="פלאפון"
          type="phone"
          onChange={change} 
          color="warning"
        /> 
        <TextField
          name="mail"
          required
          label="מייל"
          type='email'
          onChange={change} 
          color="warning"
          
          //color="success"
        /> 
      <DialogContentText>
       כתובת
      </DialogContentText>
  </Box>
  <Box
       
       component="form"
       sx={{
         '& .MuiTextField-root': { m: 1.5, width: '30ch' },
       }}
       noValidate
     >
      <TextField
          name="city"
          required
          label="עיר"
          type="text"
          onChange={change} 
          color="warning"
        /> 
                 <TextField
          name="street"
          required
          label="רחוב"
          type="text"
          onChange={change} 
          color="warning"
        /> 
                 <TextField
          name="numHouse"
          required
          label="מספר בית"
          type="number"
          onChange={change} 
          color="warning"
        /> 
  </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={register}>אישור</Button>
      <Button onClick={props.handleClose}>ביטול</Button>
    </DialogActions>
  </Dialog>
</>
)};