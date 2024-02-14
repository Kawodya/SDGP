import Rolepage from"./DPP.jpeg"

function Selectrole(){
    return(
      
    
         <div
       className="Selectrole">
        <a id="Log into account"
        title="Go to your account">
            Already have an account</a>
          <h3>Sign in as a ?</h3>
          <input type="radio" name="Doctor" value="regular" id="Doc"/>
            <label htmlFor="Doc">Doctor</label>
            <br/>
            <br/>
            <input type="radio" name="Patien" value="regular" id="Patient"/>
            <label htmlFor="Patient">Patient</label>
            <br/>
            <br/>
            <input type="radio" name="Pharma" value="regular" id="Pharmacy"/>
            <label htmlFor="Pharmacy">Pharmacist</label>
            <br/>
            <br/>
            <div className="rolepageSubmit">
            <button
            
            title="go to the next page"
             >Next</button>
             </div>
             <div
             className="logo">
              <img src={Rolepage}
              height={200}/>
             
             </div>
             

        </div>
      
        


    );

}
export default Selectrole
//this is a row
