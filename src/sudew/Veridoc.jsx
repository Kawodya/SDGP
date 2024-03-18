import React from 'react';
import Verification from '../sudew/Verification';
<<<<<<< Updated upstream
import veriimg from '../sudew/veriimg.jpeg';// import the verification image
import './Veridoc.css';
=======
import veriimg from '../sudew/veriimg.jpeg';

>>>>>>> Stashed changes
const Veridoc = () => {
  return (
    <>
    
      <div className="veridoc-container"> 
      <img className='veridoc-logo' src="logomedlink.png" alt="main medlink logo" />
      <div className='veridoc-content'> 
      <img className='veridocwall' src={veriimg} alt="veri doc" />
      <div className='verification-container'>
      <Verification />
      </div>
      </div>
      </div>
    </>
  );
};

export default Veridoc;
