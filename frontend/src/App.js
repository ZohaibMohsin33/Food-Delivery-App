import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.scss';
import { CartProvider } from "./pages/Components/ContextReducer.js";

import Routes from "./pages/Routes"

function App() {
  return (
   <CartProvider>
        <Routes />
   </CartProvider>
  
    
  );
}

export default App;
