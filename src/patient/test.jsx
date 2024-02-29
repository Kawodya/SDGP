import "./test.css";
import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextField from '@mui/material/TextField';
import Iframe from 'react-iframe'



export default function Test(){
    return(
    <div className="main">
        <div className="red"><List>
            {['New Prescription','PregNo01'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <AddCircleIcon /> : <InsertDriveFileIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List></div>
        <div className="blue"><TextField id="standard-basic" label="search" variant="standard" /></div>
        <div className="black">
        <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2192551877133!2d79.86075469999999!3d6.864307799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25ba501255b35%3A0xe489648fde092442!2sRudra%20Play%20Ground!5e0!3m2!1sen!2slk!4v1709025935105!5m2!1sen!2slk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">

        </Iframe>
        </div>
    </div>
    );
}