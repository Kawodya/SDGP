import Selectrole from "./Selectrole.jsx"
import PatientApplication from "./PatientApplication.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Veridoc from "./sudew/Veridoc.jsx";
function App() {
    return(
        <div>
            <BrowserRouter>
                  <Routes>
                        <Route path="Location" element={<Location/>}> </Route>
                        <Route path="/" element={<Veridoc/>}> </Route>
                    
                    </Routes>  
            
            
            </BrowserRouter>
        </div>
        
        // this is my comment
        
         
        
        
        
        
    );  
}

export default App
