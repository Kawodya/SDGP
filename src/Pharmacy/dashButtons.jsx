import TimelineIcon from '@mui/icons-material/Timeline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';


export default function DashButton() {
  return (
    <>
      <Button sx={{marginRight:'10px', border: '1px solid white',
        ":hover": {
          backgroundColor: 'white',
          color: 'black',
          transition: '0.5s ease-in-out',
        },
        }} variant="filledTonal" startIcon={<AddCircleIcon />}>
            Create New Bill
        </Button>
        <Button sx={{border: '1px solid white',
        ":hover": {
          backgroundColor: 'white',
          color: 'black',
          transition: '0.5s ease-in-out',
        },
        }} variant="filledTonal" startIcon={<TimelineIcon />}>
            Stock Management
        </Button>
    </>
  );
}