import React from 'react'
import Verification from '../sudew/Verification';
import veriphimg from '../sudew/veriphimg.png';
import './Veriph.css';


const Veriph  = () =>{
  return (
    <>
   <div className="veriph-container">
      <img className='veriph-logo' src="logomedlink.png" alt="main medlink logo" />
      <div className='veriph-content'> 
      <img className='veriphwall' src={veriphimg} alt="veriph" />
      <div className='verification-newph'>
      <Verification />
      </div>
      </div>
      </div>
    </>
  )
}

export default Veriph