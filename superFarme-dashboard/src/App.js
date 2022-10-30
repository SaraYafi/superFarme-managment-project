import './App.css';
import AddProduct from "./addProduct.js";
import AllProducts  from './AllProducts';
import FinishOrder from './finishOrder.js';
import ResponsiveAppBar from "./navbar.js";
import { Route,Routes} from "react-router-dom";
import { NotFound } from './notFoundUser';
import Cart from "./cart.js"
function App() {
  return (
    <>
    <ResponsiveAppBar/>
    <NotFound/>
    <Routes>
    <Route path="AllProducts" element={<AllProducts/>}/>
    <Route path="finishOrder" element={<FinishOrder/>}/>
    <Route path="AddProduct" element ={<AddProduct/>}/>
    <Route path="" element={<AllProducts/>}/>
   </Routes>
    
    </>
  );
}

export default App;
