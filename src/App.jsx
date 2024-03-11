import Selectrole from "./Selectrole.jsx"
import PatientApplication from "./PatientApplication.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Profile.jsx";
import Veridoc from "./sudew/Veridoc.jsx";
import Veriph from "./sudew/Veriph.jsx";
import Verip from "./sudew/Verip.jsx";
import Dapplication from "./dulnara/applicaton/Dapplication.jsx";
import Papplication from "./dulnara/applicaton/Papplication.jsx";


function App() {
    return(
        <div>
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Profile/>}> </Route>
                        <Route path="/veridoc" element={<Veridoc/>}> </Route>
                        <Route path="/veriph" element={<Veriph/>}> </Route>
                        <Route path="/verip" element={<Verip/>}> </Route>
                        <Route path="/dapp" element={<Dapplication/>}> </Route>
                        <Route path="/papp" element={<Papplication/>}> </Route>




                    </Routes>  
            
            
            </BrowserRouter>
        </div>
        
        // this is my comment
        
         
        
        
        
        
    );  
}

export default App
