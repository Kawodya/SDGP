import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import radioimg from '../image/radioimg.jpeg'


const  NextP  = () => {

    const Navigate = useNavigate ();
  return (
    <div>
       <div> 
        <img src="logomedlink.png" alt="main medlink logo" />
          
         </div>
      <img src= {radioimg} alt="" />
      <h2 className='role selecters'> Choose your role model</h2>
    <label htmlFor="Doctor"> Doctor</label>
     <button onClick={() => Navigate ("/dapplication")}> select </button>
     <br />
     <label htmlFor="Patient"> Patient</label>
     <button onClick={() => Navigate ("/papplication")}>select </button>
     <br />
     <label htmlFor="Pharmacy">Pharmacy </label>
     <button onClick={() => Navigate ("/phapplication")}>select </button>


    </div>
  )
}

export default NextP