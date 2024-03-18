import OTPAuthentication from "../components/OTPAuthentication"
import { Link } from 'react-router-dom';
import Otpimg from "../images/otp.jpeg"
import { useNavigate } from 'react-router-dom';
import '../sunera/Photp.css'

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
        <img className='LogoPhotp' src="logomedlink.png" alt="main medlink logo" />
        <p className='NewUserPhotp'>New user? </p>
        <div>
        <Link to=' #' className='SignUpPhotp'> sign up </Link>
        </div>
        <div>
        <h2 className="HeadpartPhotp">Verify your email address to create <br /> your new account </h2>
        <p className="ppartPhotp">An email with a verification code has been sent to <br /> <b>abcd@gmail.com</b> <br /> Enter the code here.</p> 

        </div>
           <img className="wallimgPhotp" src= {Otpimg} alt="" />
            <OTPAuthentication handleNext={handleNext}/>
       </div>    
        </>
    )
}

export default Photp;