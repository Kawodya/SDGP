import Selectrole from "./Selectrole.jsx"
import PatientApplication from "./PatientApplication.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Profile.jsx";
import Veridoc from "./sudew/Veridoc.jsx";
import Veriph from "./sudew/Veriph.jsx";
import Verip from "./sudew/Verip.jsx";


function App() {
    return(
        <div>
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Profile/>}> </Route>
                        <Route path="/veridoc" element={<Veridoc/>}> </Route>
                        <Route path="/veriph" element={<Veriph/>}> </Route>
                        <Route path="/verip" element={<Verip/>}> </Route>




                    </Routes>  
            
            
            </BrowserRouter>
        </div>
        
        // this is my comment
        
         
        
        
        
        
    );  
}

export default App
