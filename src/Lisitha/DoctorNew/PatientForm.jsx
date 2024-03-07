import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function PatientForm() {
  const [fullName, setFullName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleNext = () => {
    // Handle form submission or navigation to the next step
    console.log('Submitted:', { fullName, age, date });
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Canceled');
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleNext}>
        <h2>Patient Information</h2>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="Date"
          variant="outlined"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginRight: '10px' }}
        >
          Next
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
}
