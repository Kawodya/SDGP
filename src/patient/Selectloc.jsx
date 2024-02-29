import "./Selectloc.css";
import * as React from 'react';
import { Link } from 'react-router-dom';  // Import Link from React Router
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextField from '@mui/material/TextField';

export default function Selectloc() {
  const [showLocationDiv, setShowLocationDiv] = React.useState(false);

  const handleSelectLocationClick = () => {
    setShowLocationDiv(!showLocationDiv);
  };

  const handleCardButtonClick = (name) => {
    // Handle button click for each card
    console.log(`Button clicked for ${name}`);
    // Navigate to another page, you can replace '/map' with your desired route
  };

  const visibleCards = [
    { name: 'City Pharmacy Colombo', price: 'Rs 600' },
    { name: 'City Pharmacy Colombo', price: 'Rs 600' },
    { name: 'Central Pharmacy', price: 'Rs 800' },
    // Add more cards as needed
  ];

  return (
    <div className="main">
      <div className="locone">
        <List>
          {['New Prescription', 'PregNo01'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <AddCircleIcon /> : <InsertDriveFileIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="loctwo">
        <TextField id="standard-basic" label="search" variant="standard" />
      </div>
      <div className="locthree">
        <h4 className="topic">Prescription</h4>
        {showLocationDiv ? (
          <div className="locationDiv">
            {visibleCards.map((card, index) => (
              <div key={index} className="locationCard">
                <div className="cardInfo">
                  <div className="name">{card.name}</div>
                  <div className="price">{`Price: ${card.price}`}</div>
                </div>
                {/* Use Link to navigate to another page */}
                <Link to="/t">
                  <button className="cardButton" onClick={() => handleCardButtonClick(card.name)}>
                    View on Map
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <button className="selectLocationButton" onClick={handleSelectLocationClick}>
            Select Location
          </button>
        )}
      </div>
    </div>
  );
}
