import "./docone.css";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function Docone() {
    const [isNewPrescriptionClicked, setIsNewPrescriptionClicked] = React.useState(false);
    const [isCardCreated, setIsCardCreated] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isPrescriptionCodeOpen, setIsPrescriptionCodeOpen] = React.useState(false);
    const [fullName, setFullName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [date, setDate] = React.useState('');
    const [brandName, setBrandName] = React.useState('');
    const [genericName, setGenericName] = React.useState('');
    const [dosage, setDosage] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [useInstructions, setUseInstructions] = React.useState('');
    const [specialInstructions, setSpecialInstructions] = React.useState('');
    const [medicineList, setMedicineList] = React.useState([]); // State to hold medicine list
    const [prescriptionCode, setPrescriptionCode] = React.useState('');
    const prescriptionNumbers = ['PRENo:-202401315', 'PRENo:-202401316', 'PRENo:-202401317']; // Sample array of prescription numbers

    const handleNewPrescriptionClick = () => {
        setIsNewPrescriptionClicked(true);
    };

    const handleNextButtonClick = () => {
        setIsCardCreated(true);
    };

    const handleCancelClick = () => {
        setIsNewPrescriptionClicked(false); // Resetting form visibility
        setFullName('');
        setAge('');
        setDate('');
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveMedicineDetails = () => {
        const newMedicine = {
            name: brandName,
            genericName,
            dosage,
            quantity,
            useInstructions,
            specialInstructions
        };
        setMedicineList([...medicineList, newMedicine]); // Add new medicine to the medicine list
        setIsModalOpen(false); // Close the modal after saving details
        setIsPrescriptionCodeOpen(true); // Open the prescription code pop-up
    };

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setPrescriptionCode(result);
    };

    const handleClosePrescriptionCode = () => {
        setIsPrescriptionCodeOpen(false);
    };

    return (
        <div className="main">
            <div className={`red ${isNewPrescriptionClicked ? 'blue' : ''}`}>
                <List>
                    {['NEW PRESCRIPTION', ...prescriptionNumbers].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={index === 0 ? handleNewPrescriptionClick : undefined}>
                            <ListItemIcon>
                                {index === 0 ? <AddCircleIcon /> : <InsertDriveFileIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className="blue">
                <TextField id="standard-basic" label="search" placeholder="Enter prescription Number" variant="standard" />
            </div>
            {!isCardCreated && isNewPrescriptionClicked && (
                <div className="black">
                    <form>
                        <h2 className="head">Patient Information</h2>
                        <div className="form-field">
                            <TextField id="fullName" label="Full Name:" variant="standard" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="form-field">
                            <TextField id="age" label="Age:" variant="standard" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="form-field">
                            <TextField id="date" label="Date:" variant="standard" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="Next-but">
                            <button type="button" onClick={handleNextButtonClick}>Next</button>
                        </div>
                        <div className="cancel-but">
                            <button type="button" onClick={handleCancelClick}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {isCardCreated && (
                <div>
                    <h2>Medicine Information</h2>
                    {medicineList.map((medicine, index) => (
                        <Card key={index} className="medicine-card">
                            <CardContent>
                                <h4>{medicine.name}</h4>
                                <div className="card-content">
                                    <span>{medicine.genericName}, {medicine.dosage}, Qty {medicine.quantity}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Card className="medicine-card">
                        <CardContent onClick={handleCardClick}>
                            <h4>Add New Medicine</h4>
                            <div className="card-content">
                                <AddCircleIcon className="add-icon" />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="Next-but">
                        <button type="button" onClick={handleNextButtonClick}>Next</button>
                    </div>
                    <div className="cancel-but">
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>
            )}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Medical Details</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Brand Name" variant="standard" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                    <TextField fullWidth label="Generic Name" variant="standard" value={genericName} onChange={(e) => setGenericName(e.target.value)} />
                    <TextField fullWidth label="Dosage" variant="standard" value={dosage} onChange={(e) => setDosage(e.target.value)} />
                    <TextField fullWidth label="Quantity" variant="standard" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <TextField fullWidth label="Use Instructions" variant="standard" value={useInstructions} onChange={(e) => setUseInstructions(e.target.value)} />
                    <TextField fullWidth label="Special Instructions" variant="standard" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Close</Button>
                    <Button onClick={handleSaveMedicineDetails}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isPrescriptionCodeOpen} onClose={handleClosePrescriptionCode}>
                <DialogTitle>Prescription Code</DialogTitle>
                <DialogContent>
                    <p>{prescriptionCode}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePrescriptionCode}>Close</Button>
                    <Button onClick={generateRandomCode}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
