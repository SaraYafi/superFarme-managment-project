import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import {Outlet } from 'react-router';
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { Login } from './login';
import { Register } from './register';
import { exitUser } from './store/actions/user';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from './cart';
import { finishOrder } from './store/actions/order';
import {saveProducts} from './store/actions/product';

const ResponsiveAppBar = () => {
  const [open, setOpen] = React.useState(false);
  const[registerOpen,setRegisterOpen]= React.useState(false);
  const[cartOpen,setCartOpen]= React.useState(false);
  const cartHandleClose = () => {
    setCartOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const registerHandleClose=()=>{
    setRegisterOpen(false);
  }
  let currentU = useSelector(state => state.user.currnetUser);
  let cart= useSelector(state => state.ord.cart);
  const settings = currentU?['עדכון פרטים', 'יציאה']:['כניסה','הרשמה'];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate();
  let dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    if(e.target.textContent=="כניסה"){
      setOpen(true);
    }
    if(e.target.textContent=="הרשמה"){
   setRegisterOpen(true);
    }
    if(e.target.textContent=="יציאה"){
      // dispatch(saveProducts([]));
      dispatch(exitUser());
      dispatch(finishOrder());
      navigate(`/AllProducts`);
    }
  };
  
    const showCart=()=>{
      setCartOpen(true)
    }

  const BringProducts=()=>{
        navigate(`AllProducts`);
  }
  const BringAddProduct=()=>{
        navigate(`AddProduct`);
  }

  return (<>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{  mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
SUPER-FARM          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button 
                onClick={BringProducts}
                sx={{ my: 2, color: 'white', display: 'block' }}>
כל המוצרים</Button>
<Button 
                onClick={BringAddProduct}
                sx={{ my: 2, color: 'white', display: 'block' }}>הוסף מוצר</Button>
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="סל קניות">
          <Badge color="secondary" badgeContent={cart.length}>
          <ShoppingCartIcon sx={{marginLeft:20}} fontSize='large' onClick={showCart} />
        </Badge>
            </Tooltip>
            <Tooltip title="הגדרות משתמש">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentU ? currentU.name : "אורח"}  variant="rounded" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"  >{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Outlet/>
    <Login open={open} handleClose={handleClose}/>
    <Register open={registerOpen} handleClose={registerHandleClose}/>
    <Cart open={cartOpen} handleClose={cartHandleClose}/>
   </>
  );
};
export default ResponsiveAppBar;