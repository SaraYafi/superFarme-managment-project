import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
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
import { NotFound } from './notFoundUser';




const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));


export const Login=(props)=>{
    let dispatch = useDispatch();
    let [user, setUser] = useState({ name: "",password:"" });
    let change = (e) => {
        let {name, value}=e.target;
        let u ={...user};
        u[name]=value;
        setUser(u);
    }
    const login=()=>{
        props.handleClose();
        axios.get("http://localhost:5002/user/"+user.password +"/"+ user.name).then(res => {
            console.log(res);
            dispatch(saveUser(res.data));
        }
        ).catch(err => {
            console.log(err)
            setOpen(true);
        });

    }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
   

    return (<>
    <Dialog
    fullWidth={true}
    maxWidth='xs'
    open={props.open}
    onClose={props.handleClose}
  >
    <DialogTitle  color="warning">כניסה למערכת</DialogTitle>
    <DialogContent>
      <DialogContentText  color="warning">
      ברוכים הבאים!!
      </DialogContentText>
      <Box
        noValidate
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
     
      >
        {/* <FormControl sx={{ mt: 2, minWidth: 120 }}> */}
          <RedditTextField
           variant="filled"
           style={{ marginTop: 11 }}
          required
          name="name"
          label="שם"
          type="text"
          defaultValue=""
          onChange={change} 
          color="warning"
        /> 
        <RedditTextField
           variant="filled"
           style={{ marginTop: 11 }}
          name="password"
          required
          label="סיסמא"
          type="password"
          autoComplete="current-password"
          onChange={change} 
          color="warning"
        />    
        {/* </FormControl> */}
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={login}>אישור</Button>
      <Button onClick={props.handleClose}>ביטול</Button>
    </DialogActions>
  </Dialog>
  <NotFound open={open} handleClose={handleClose} message="נראה שאחד הנתונים שהקשתם שגוי או שאינכם רשומים במערכת
"  button1="מעבר להרשמה"   button2="נסיון נוסף"/></>
)};