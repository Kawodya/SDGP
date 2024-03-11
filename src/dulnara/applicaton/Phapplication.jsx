import React, { useState } from 'react';
import pharmacy from "../applicaton/pharmacy.jpeg";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import '../applicaton/Phapplication.css'
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
            <h2 className='HeadtopicPhapplication'>Pharmacy Application</h2>
            <div> 
                <header>
                    <img className='LogoPhapplication' src="logomedlink.png" alt="main medlink logo" />
                    <div> 
                        <p className='NewuserPhapplication'>New user? </p>
                        <Link to=' /patientotp' className='SignupPhapplication'> signin</Link> </div>
                        </header>
                </div>
            {/* <img src={doctor} alt="Login Image" className="login-image" /> */}
            <img className='MainimgPhapplication' src={pharmacy} alt="doctor" />
            <form className='FormPhapplication'>
            <input
            type="text"
            id="FirstnamePhapplication"
            placeholder="First name"
            value={Firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            /><br/>
               <input
            type="text"
            id="lastnamePhapplication"
            placeholder="last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            />
            <br />
            <input
            type="text"
            id="addressPhapplication"
            placeholder="Address"
            value={address}
            onChange={(e) => setAdress(e.target.value)}
            required
            />
            <br />
             <input
            type="text"
            id="phIDPhapplication"
            placeholder="PharmacyId"
            value={pharmacyID}
            onChange={(e) => setPharmacyID(e.target.value)}
            required
            />
            <br />
             <input
            type="text"
            id="emailPhapplication"
            placeholder="email or Contact number"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            />
            <br />
            <button className='NextbtnPhapplication' type="button" onClick={handleLogin}>
                    Next
                </button>
                <label htmlFor="back button"> <b></b> </label> <br />
     <button className='BackbtnPhapplication' onClick={() => navigate ("/n")} title="back to previous page">Back </button>
            </form>
        </div>
    )
}

export default Phapplication;