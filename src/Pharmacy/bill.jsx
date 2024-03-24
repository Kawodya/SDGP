import React, { forwardRef, useEffect, useRef } from "react";
import { Button, Typography } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";

import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Navbar from "../Navbar";
import axiosClient from "../axios-client";
import { useReactToPrint } from "react-to-print";

const BillPrint = forwardRef(({ data, addedMedicines, billTotal }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        border: "1px solid",
        height: "calc(100vh - 20px)",
        margin: "10px",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "25px", marginTop: "20px" }}>
        MedLink
      </h1>
      <div style={{ marginLeft: "25px", marginTop: "15px" }}>
        <p>Bill Number: {data}</p>
      </div>
      <div style={{ marginLeft: "25px", marginTop: "15px" }}>
        {addedMedicines.map((medicine) => {
          return (
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <div style={{ flex: "2" }}>{medicine.name}</div>
              <div style={{ flex: "1" }}>{medicine.qty}</div>
              <div style={{ flex: "1" }}>
                {parseFloat(medicine.price)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </div>
            </div>
          );
        })}
        <div
          style={{ marginTop: "20px", textAlign: "right", marginRight: "25px" }}
        >
          Total : {billTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </div>
      </div>
    </div>
  );
});

export default function BillSystem() {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [noOfPills, setNoOfPills] = useState(0);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [addedMedicines, setAddedMedicines] = useState([]); // Use useState to manage added medicines

  const [data, setData] = useState(null);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // Function returning the component to print
    onAfterPrint: () => {
      setData(null);
    },
  });

  const saveBill = async () => {
    const pharmacistId = JSON.parse(localStorage.getItem("user"));
    const payload = {
      pharmacistId: pharmacistId.user_id,
      products: addedMedicines,
    };
    try {
      axiosClient
        .post("/bills", payload)
        .then(({ data }) => {
          setData(data.data);
          handlePrint();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data) handlePrint();
  }, [data]);

  const formateMedicine = () => {
    if (selectedMedicine) {
      return (
        <div className="selected-medicine">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h4" color="initial">
              {selectedMedicine.label}
            </Typography>
          </div>
          <Typography variant="h7" color="initial">
            Per pill price:- Rs. {selectedMedicine.id.price}
          </Typography>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleAdd = () => {
    setIsAddClicked(true);
    setAddedMedicines([
      ...addedMedicines,
      {
        productId: selectedMedicine.id._id,
        name: selectedMedicine.label,
        qty: noOfPills,
        price: parseFloat(selectedMedicine.id.price) * parseInt(noOfPills),
      },
    ]);
  };

  const handleRemove = (index) => {
    const newMedicines = addedMedicines.filter((medicine, i) => i !== index);
    setAddedMedicines(newMedicines);
  };

  const formateBillTotal = () => {
    return (
      <div>
        <Typography variant="h6" color="initial">
          Total: Rs.{billTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </Typography>
      </div>
    );
  };

  const formateAddedMedicines = () => {
    return (
      <div>
        <Typography variant="h4" color="initial">
          Medicine Information
        </Typography>
        {addedMedicines.map((medicine, index) => (
          <div className="medicine-name">
            <div className="name-close">
              <p className="name">{`${medicine.name}`}</p>
              <CloseIcon onClick={() => handleRemove(index)} />
            </div>
            <div className="medicine-bill-info" key={index}>
              <p>Qty : {medicine.qty}</p>
              <p>
                Rs.
                {parseFloat(medicine.price)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const [billData, setBillData] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [billList, setBillList] = React.useState([]);
  const [billTotal, setBillTotal] = React.useState(0);

  const displayBillList = () => {
    if (billList.length > 0) {
      return billList.map((bill, index) => (
        <div key={index}>
          <Button variant="contained" color="primary">
            <InsertDriveFileIcon />
            {bill}
          </Button>
        </div>
      ));
    }
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleBillNameChange = (event) => {
    setBillData(event.target.value);
  };

  const handleCreateBill = () => {
    if (billData) {
      setBillList([...billList, billData]);
      setOpen(false);
      setBillData("");
    }
  };

  useEffect(() => {
    let total = 0;
    addedMedicines.map((medicine) => {
      total = total + medicine.price;
    });
    setBillTotal(total);
  }, [addedMedicines]);

  const styles = {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    p: 1,
    bgcolor: "background.paper",
  };

  const [medicineOptions, setMedicineOptions] = useState([]);

  useEffect(() => {
    axiosClient.get(`/products/`).then(({ data }) => {
      const array = [];
      data.data.map((medicine) => {
        const obj = {
          label: `${medicine.brand.brand_name} ${medicine.drug.drug_name} ${medicine.dosage}`,
          id: medicine,
        };
        array.push(obj);
      });
      setMedicineOptions(array);
    });
  }, []);

  useEffect(() => {
    // axiosClient.get(`/products/`).then(({ data }) => {
    //   const array = [];
    //   data.data.map((medicine) => {
    //     const obj = {
    //       label: `${medicine.brand.brand_name} ${medicine.drug.drug_name} ${medicine.dosage}`,
    //       id: medicine,
    //     };
    //     array.push(obj);
    //   });
    //   setMedicineOptions(array);
    // });
  }, [data]);

  return (
    <div>
      <div className="container" style={{ display: "flex" }}>
        <div style={{ flex: "1" }} className="bills">
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: "relative" }}>
              <Button
                sx={{
                  bgcolor: "lightblue",
                  width: "100%",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  color: "black",
                }}
                // onClick={handleClick}
              >
                <AddCircleIcon />
                New Bill
              </Button>
              {open ? (
                <Box sx={styles}>
                  <TextField
                    sx={{ width: "100%", marginBottom: "10px" }}
                    id="outlined-basic"
                    label="Enter Bill Name"
                    variant="outlined"
                    value={billData}
                    onChange={handleBillNameChange}
                  />
                  <Button
                    onClick={handleCreateBill}
                    variant="contained"
                    color="primary"
                  >
                    Create Bill
                  </Button>
                </Box>
              ) : null}
            </Box>
          </ClickAwayListener>

          <div>{displayBillList()}</div>
        </div>
        <div style={{ flex: "1" }} className="medicine">
          <Autocomplete
            disablePortal
            style={{ margin: "10px" }}
            id="combo-box-demo"
            options={medicineOptions}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            onChange={(event, value) => setSelectedMedicine(value)}
            renderInput={(params) => (
              <TextField {...params} label="Search Medicines" />
            )}
          />
        </div>
        <Navbar currentPage={"billing"} />
        <div style={{ flex: "5" }} className="info">
          <div className="medicine-info" style={{ marginLeft: "40px" }}>
            {formateMedicine(selectedMedicine)}
            {selectedMedicine && (
              <TextField
                id="outlined-basic"
                sx={{
                  width: "40%",
                  marginTop: "15px",
                  marginBottom: "25px",
                }}
                type="number"
                label="No of Pills"
                variant="outlined"
                value={noOfPills}
                onChange={(e) => setNoOfPills(e.target.value)}
              />
            )}
            {selectedMedicine && (
              <Button
                // style={{ padding: "30px" }}
                sx={{
                  marginTop: "25px",
                  ml: 10,
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  border: "2px solid",
                  borderRadius: "50px ",
                  color: "black",
                  background: "lightblue",
                }}
                onClick={handleAdd}
              >
                Add
              </Button>
            )}
          </div>
          <div className="added-medicines" style={{ marginLeft: "40px" }}>
            {isAddClicked && formateAddedMedicines()}
          </div>
          <div
            className="bill-total"
            style={{ marginLeft: "40px", padding: "0" }}
          >
            {(addedMedicines.length > 0 || selectedMedicine) &&
              billTotal !== 0 && (
                <div className="bill-total">{formateBillTotal()}</div>
              )}
            {isAddClicked && (
              <Button onClick={saveBill} style={{ border: "1px solid" }}>
                <PrintIcon />
                Save & Print
              </Button>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <BillPrint
          ref={componentRef}
          data={data}
          addedMedicines={addedMedicines}
          billTotal={billTotal}
        />
      </div>
    </div>
  );
}
