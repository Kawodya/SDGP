import React, { useState } from 'react';
import doctor from "../applicaton/doctor.jpeg";
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

const Dapplication = () => {
    const [Firstname, setFirstname] = useState('');
    const [address, setAdress] = useState(''); 
    const [lastname, setLastname] = useState(''); 
    const [doctorId, setDoctorID] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Validation logic
        if (!Firstname || !lastname || !address || !doctorId || !email) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        // If all fields are filled, navigate to another page
        navigate('/photp');
    };

    return (
        <div className='Dapplication'>
                
                <div> 
                    <img src="logomedlink.png" alt="main medlink logo" />
                    <div> 
                        <p>New user? </p>
                        <Link to=' #'> sign up </Link></div>
                </div>

            <h2>Doctor Application</h2>
            <img src={doctor} alt="doctor" />

    
            <form action='/' className='Dform'>
                <input
                    type="text"
                    id="Firstname"
                    placeholder="First name"
                    required
                    value={Firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                /><br />
                <input
                    type="text"
                    id="lastname"
                    placeholder="last name"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    id="doctorID"
                    placeholder="doctorId/Registerd No"
                    required
                    value={doctorId}
                    onChange={(e) => setDoctorID(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    id="email"
                    placeholder="email or Contact number"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <button type="button" onClick={handleLogin}>
                    Next
                </button>
            </form>
        </div>
    );
};

export default Dapplication;
