import React, { useState } from 'react';
import pharmacy from "../applicaton/pharmacy.jpeg";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Phapplication = () => {
    const [Firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState(''); 
    const [address, setAdress] = useState(''); 
    const [pharmacyID,setPharmacyID] =useState ('');
    const[email,setemail] =useState ('');
    const navigate = useNavigate ();
    

    const handleLogin = () => {
           // Validation logic can be added here
           if (!Firstname || !lastname || !address || !pharmacyID || !email) {
            alert('Please fill in all fields before submitting.');
            return;
        }
             navigate('/dotp');
        
      };
    return (
        <div className='Dapplication'>
            <h2>Pharmacy Application</h2>
            <div> 
                <header>
                    <img src="logomedlink.png" alt="main medlink logo" />
                    <div> 
                        <p>New user? </p>
                        <Link to=' /patientotp'> signin</Link> </div>
                        </header>
                </div>
            {/* <img src={doctor} alt="Login Image" className="login-image" /> */}
            <img src={pharmacy} alt="doctor" />
            <form className='Dform'>
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
            id="phID"
            placeholder="PharmacyId"
            value={pharmacyID}
            onChange={(e) => setPharmacyID(e.target.value)}
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

export default Phapplication;