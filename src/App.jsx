import Selectrole from "./Selectrole.jsx"
import PatientApplication from "./PatientApplication.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Veridoc from "./sudew/Veridoc.jsx";
import Navbar from "./sudew/Navbar.jsx";
import Search from "./sudew/Search.jsx";

function App() {
    return(
        <div>
            <BrowserRouter>
                  <Routes>
                        <Route path="Location" element={<Search/>}> </Route>
                        <Route path="/" element={<Navbar/>}> </Route>
                    
                    </Routes>  
            
            
            </BrowserRouter>
        </div>
        
        // this is my comment
        
         
        
        
        
        
    );  
}

export default App
