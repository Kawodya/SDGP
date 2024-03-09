import React from 'react';
import Verification from '../sudew/Verification';
import veriimg from '../sudew/veriimg.jpeg';
import './Veridoc.css';
const Veridoc = () => {
  return (
    <>
      <img src={veriimg} alt="veri doc" />
      <Verification />
    </>
  );
};

export default Veridoc;
