import React from 'react'
import Verification from '../sudew/Verification';
import veripimg from '../sudew/veripimg.png'
import './Verip.css';

const Verip = () => {
  return (
    <>

<div className="verip-container">
      <img className='verip-logo' src="logomedlink.png" alt="main medlink logo" />
      <div className='verip-content'> 
      <img className='veripwall' src={veripimg} alt="verip" />
      <div className='verification-new'>
      <Verification />
      </div>
      </div>
      </div>
    </>
  )
}

export default Verip