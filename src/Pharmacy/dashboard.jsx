// import { useState } from 'react'
// import Button from '@mui/material/Button';
// import Navbar from './Navbar';
// import UserCard from './userCard'
// import DashButton from './dashButtons'
// import TimelineIcon from '@mui/icons-material/Timeline';
// import AddCircleIcon from '@mui/icons-material/AddCircle';


// function DashBoard() {
//   return (
//     <div style={{ backgroundColor: 'blue' }}>
//       <Navbar currentPage={"Dashboard"}/>
//       <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',marginTop:'200px',marginLeft:'150px'}}>
//         <UserCard style={{marginRight:'10px'}}></UserCard>
//       <DashButton/>
//       </div>
//     </div>
//   )
// }

// export default DashBoard;

import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import UserCard from './userCard';
import DashButton from './dashButtons';
import TimelineIcon from '@mui/icons-material/Timeline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function DashBoard() {
  useEffect(() => {
    // Set the background color of the body to blue
    document.body.style.backgroundColor = 'lightblue';

    // Cleanup: Reset the background color when the component is unmounted
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div>
      <Navbar currentPage={"Dashboard"}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: '200px', marginLeft: '150px' }}>
        <UserCard style={{ marginRight: '10px' }}></UserCard>
        <DashButton />
      </div>
    </div>
  );
}

export default DashBoard;
