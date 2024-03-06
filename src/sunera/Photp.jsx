import OTPAuthentication from "../components/OTPAuthentication"
import Otpimg from "../images/otp.jpeg"
import { useNavigate } from 'react-router-dom';


const Photp = () => {
    const navigate = useNavigate();


    const handleNext = () => {
        // Navigate to the next page based on your application's logic
        // Example navigation, customize the URLs accordingly
        navigate('/veriph');
      }

    return(
        <>
        <div>
        <h2>Verify your email address to create <br /> your new account </h2>
        <p>An email with a verification code has been sent to <br /> <b>abcd@gmail.com</b> <br /> Enter the code here.</p> 

        </div>
           <img src= {Otpimg} alt="" />
            <OTPAuthentication handleNext={handleNext}/>
        </>
    )
}

export default Photp;