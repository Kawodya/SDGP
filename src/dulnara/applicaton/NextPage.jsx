import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import radioimg from '../applicaton/radioimg.jpeg'
import '../applicaton/NextP.css'

const  NextP  = () => {

    const Navigate = useNavigate ();
  return (
    <div>
       <div> 
        <img className='Medlinklogo' src="logomedlink.png" alt="main medlink logo" />
          
         </div>
      <img className='Roleimg' src= {radioimg} alt="" />
      <h2 className='RoleHead'> Sign in as a ?</h2>
    <label className='Roledoca' htmlFor="Doctor"> Doctor</label>
     <button className='Roledocaselect' onClick={() => Navigate ("/dapplication")}> select </button>
     <br />
     <label className='RolePatient' htmlFor="Patient"> Patient</label>
     <button className='RolePatientSelect' onClick={() => Navigate ("/papplication")}>select </button>
     <br />
     <label className='RolePharmacy' htmlFor="Pharmacy">Pharmacy </label>
     <button className='RolePharmacySelect' onClick={() => Navigate ("/phapplication")}>select </button>
      <br />    
    </div>
  )
}

export default NextP