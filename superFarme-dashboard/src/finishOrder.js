import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { alpha,styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch } from 'react-redux';
import { finishOrder } from './store/actions/order';
import {saveProducts} from './store/actions/product';

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





export default function FinishOrder(){
  const dispatch=useDispatch();
  let currentUser= useSelector(state=> state.user.currnetUser);
  let [user, setUser] = useState({ name: "",userId:currentUser._id,city:currentUser.city,street:currentUser.street,
numHouse:currentUser.numHouse,orderDate:new Date(),destDate:addDays(new Date(),10)});
 
  let userdetails=useSelector(state=> state.ord.details);
  const navigate= useNavigate();
  let cart= useSelector(state => state.ord.cart);
  const steps = ['פרטים', 'המוצרים שלך', 'תשלום'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});


  let change = (e) => {
      let {name, value}=e.target;
      let u ={...user};
      u[name]=value;
      setUser(u);
  }
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 600,
    color: theme.palette.text.primary,
  }));


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

const BringProducts=()=>{
  dispatch(saveProducts([]));
  dispatch(finishOrder());
    navigate(`/AllProducts`);
}
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleChange = (newValue) => {
    if(newValue>=Date.now())
      setUser({...user,orderDate:newValue,destDate:addDays(newValue,10)})
  };
  const handleChange2 = (newValue) => {
    if(newValue>=addDays(user.orderDate,10))
       setUser({...user,destDate:newValue})
   };
 

  return (
    <Box sx={{ width: '50%' ,marginRight:"25vw",marginTop:"5vh"}}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              ההזמנה נשלחה!
              תודה שבחרתם בנו
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={BringProducts}>חזרה לאתר</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
              <Container maxWidth="sm" sx={{ overflow: 'auto',bgcolor: '#cfe8fc', height: '70vh' }}>

              {!activeStep?
              <Box
              noValidate
              component="form"
               sx={{
               '& .MuiTextField-root': { m: 1, width: '35ch' },
               }}>
                    <Typography sx={{ mt: 2, mb: 1 }} style={{color:'orange',marginRight:"1vw"}}>
       *פרטים אלו ישמרו בהזמנתך
      </Typography> 
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
          <RedditTextField
           style={{ marginTop: 11 }}
          required
          name="name"
          label="שם"
          type="text"
          defaultValue={currentUser?currentUser.name:""}
          onChange={change} 
          color="primary"
        /> 
         <Typography sx={{ mt: 2, mb: 1 }} style={{color:'orange',marginRight:"1vw"}}>
       כתובת
      </Typography> 
        <Box
       component="form"
       sx={{
         '& .MuiTextField-root': { m: 1.5, width: '17ch' },
       }}
       noValidate
     >
      <TextField
          name="city"
          required
          label="עיר"
          type="text"
          onChange={change} 
          color="primary"
          defaultValue={user.city}
        /> 
                 <TextField
          name="street"
          required
          label="רחוב"
          type="text"
          onChange={change} 
          color="primary"
          defaultValue={user.street}
        /> 
                 <TextField
          name="numHouse"
          required
          label="מספר בית"
          type="number"
          onChange={change} 
          color="primary"
          defaultValue={user.numHouse}
        /> 
  </Box>  <Typography sx={{ mt: 2, mb: 1 }} style={{color:'orange',marginRight:"1vw"}}>
       תאריכים
      </Typography> 
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
          name="orderDate"
          label="תאריך הזמנה"
          inputFormat="dd/MM/yyyy"
          value={user.orderDate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          />  <DesktopDatePicker
          name="destDate"
          label="תאריך הגעה"
          inputFormat="dd/MM/yyyy"
          value={user.destDate}
          onChange={handleChange2}
          renderInput={(params) => <TextField {...params} />}
          />
          
           </LocalizationProvider>
           <Typography sx={{ mt: 2, mb: 1 }} style={{color:'blue',marginRight:"1vw"}}>
       *תאריך הגעה במינמום עשרה ימים לאחר תאריך ההזמנה
      </Typography> 
        </FormControl></Box>
      :activeStep==1?<Box sx={{ flexGrow: 1, overflow: 'auto', px: 3 }}> 
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
      </Box>
     
    </Card>     ))}
      </StyledPaper>
    </Box> :<div>null</div>}</Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                קודם
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                הבא
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                   שלב  {activeStep + 1} הושלם
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'שלח'
                      : 'שמור והמשך'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
    );
}