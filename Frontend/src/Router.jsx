import {createBrowserRouter,Link} from "react-router-dom";
  import App from "./Layout/App";
 import Home from "./Pages/Home";
import SignupPage from "./Pages/Signup";
import Login from "./Pages/Login";
import CartPage from "./Pages/Cartpage";
import Product from "./components/Product";
import Productview from "./components/Productview";
// import GetCart from "./components/";

const router = createBrowserRouter([
    {
      path: "",
      element:<App/> ,
      children: [
        {
          path: "/",
          element: <Home/>,
        },

        {
          path:"/get-cart",
          element:<CartPage/>
        },
        {
          path:"/product/:productId",
          element:<Productview/>
        }
       
       
    ]

  
    },
 
    {
      path: "/signup",
      element: <SignupPage/>,
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);
  export default router