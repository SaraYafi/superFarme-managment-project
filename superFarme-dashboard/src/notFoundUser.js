import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Register } from './register';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export const NotFound=(props)=>{
 
  const[registerOpen,setRegisterOpen]= React.useState(false);
  const registerHandleClose=()=>{
      setRegisterOpen(false);
  }
  const openRegister=()=>{
      props.handleClose();
     setRegisterOpen(true)
  }
  const openLogin=()=>{
    props.handleClose();
   
 }
   

    return (<>
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>{"שגיאה"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={openRegister}>{props.button1}</Button>
          <Button onClick={openLogin}>{props.button2}</Button>
        </DialogActions>
      </Dialog>
      <Register open={registerOpen} handleClose={registerHandleClose}/>
      </>
)};