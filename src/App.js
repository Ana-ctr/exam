import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './login';
import Header from "./header";
import Main from "./main";
import Currency from "./currency";
import HelpCenter from "./help";
import BalancePage from "./wallet";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login/>}> </Route>
          <Route path="header" element={<Header/>}> </Route>
          <Route path="main" element={<Main/>}> </Route>
          <Route path="currency" element={<Currency/>}> </Route>
          <Route path="help" element={<HelpCenter/>}> </Route>
          <Route path="wallet" element={<BalancePage/>}> </Route>
          
          
      










        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
