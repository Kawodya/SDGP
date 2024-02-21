import React, { useState } from 'react';
import patient from "../applicaton/patient.png";
import {useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Papplication = () => {
    const [Firstname, setFirstname] = useState('');
    const [address, setAdress] = useState(''); 
    const [lastname, setLastname] = useState(''); 
    const[email,setemail] =useState ('');
    const navigate = useNavigate ();
    

    const handleLogin = () => {
        // Validation logic can be added here
        if (!Firstname || !lastname || !address || !email) {
            alert('Please fill in all fields before submitting.');
            return;
        }
             navigate('/patientotp');
        
      };

    return (
        <div className='Dapplication'>

                <div> 
                    <header>
                    <img src="logomedlink.png" alt="main medlink logo" />
                    <div> 
                        <p> </p>
                        <Link to=' /patientotp'> signin </Link> </div>
                        </header> 
                </div>


            <h2>Patient Application</h2>
            <img src={patient} alt="doctor" />
            <form action='patientotp' className='Dform'>
            <input
            type="text"
            id="Firstname"
            placeholder="First name"
            value={Firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            /><br/>
               <input
            type="text"
            id="lastname"
            placeholder="last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            />
            <br />
            <input
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAdress(e.target.value)}
            required
            />
            <br />
             <input
            type="text"
            id="email"
            placeholder="email or Contact number"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            />
            <br />
           
            <button type="button" onClick={handleLogin}>
                    Next
                </button>
            </form>
        </div>
    )
}

export default Papplication;