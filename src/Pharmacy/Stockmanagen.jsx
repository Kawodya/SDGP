import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  colors,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import Divider from "@mui/material/Divider";
import "./Pharmacy.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { FormControl, FormLabel } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import Navbar from "../Navbar";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
export default function Stockmanagen() {
  const [isFormValid, setIsFormValid] = useState(true); // State to check if form is valid
  const [showForm, setShowForm] = useState(false); // State to check if form is visible

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [openingStock, setOpeningStock] = useState("");
  const [addStock, setAddStock] = useState("");
  const [removeStock, setRemoveStock] = useState("");
  const [finalStock, setFinalStock] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenBrand, setIsModalOpenBrand] = useState(false);
  const [isModalOpenDrug, setIsModalOpenDrug] = useState(false);
  const [formError, setFormError] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [drugName, setDrugName] = useState("");
  const [dosage, setDosage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addQty, setAddQty] = useState("");
  const [removeQty, setRemoveQty] = useState("");
  const [brandId, setBrandId] = useState(null);
  const [drugId, setDrugId] = useState(null);
  const [load, setLoad] = useState(false);
  const [price, setPrice] = useState("");
  const [instructions, setInstructions] = useState("");
  const [qty, setQty] = useState("");

  const addMedicine = () => {
    setIsModalOpen(true);
  };

  const addBrand = () => {
    setIsModalOpenBrand(true);
  };

  const addDrug = () => {
    setIsModalOpenDrug(true);
  };

  // Function to handle adding new medicine
  const handleUpdate = () => {
    if (removeStock === "" && finalStock === "") {
      Swal.fire({
        text: "Please fill all required fields",
        icon: "error",
      });
    } else {
      const payload = {
        qty: finalStock,
      };

      axiosClient
        .put(`/products/${productId}`, payload)
        .then(() => {
          setSelectedProduct(null);
          setLoad((pre) => !pre);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
  }, [load]);

  const handleChange = (event, value) => {
    setSelectedProduct(value);
    if (value) {
      setProductId(value.id._id);
      setProductName(value.id.brand.brand_name);
      setScientificName(value.id.drug.drug_name);
      setOpeningStock(value.id.qty);
      setFinalStock(value.id.qty);
    } else {
      setProductId("");
      setProductName("");
      setScientificName("");
      setOpeningStock("");
      setFinalStock("");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseModalBrand = () => {
    setIsModalOpenBrand(false);
  };

  const handleCloseModalDrug = () => {
    setIsModalOpenDrug(false);
  };

  const handleSaveMedicine = () => {
    if (
      brandId &&
      drugId &&
      qty !== "" &&
      price !== "" &&
      dosage !== "" &&
      instructions !== ""
    ) {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        brand_id: brandId.id,
        drug_id: drugId.id,
        user_id: user.user_id,
        qty: qty,
        price: price,
        dosage: dosage,
        special_instruction: instructions,
      };
      console.log(user);
      axiosClient
        .post("/products", payload)
        .then(() => {
          setLoad((pre) => !pre);
        })
        .catch((err) => {
          console.log(err);
        });

      handleCloseModal();
    } else {
      handleCloseModal();
      Swal.fire({
        text: "Please fill all required fields",
        icon: "error",
      });
    }
  };

  const handleSaveBrand = () => {
    if (brandName === "") {
      handleCloseModalBrand();
      Swal.fire({
        text: "Please fill all required fields",
        icon: "error",
      });
    } else {
      const payload = {
        brand_name: brandName,
      };
      axiosClient
        .post("/brands", payload)
        .then(() => {
          setLoad((pre) => !pre);
        })
        .catch((err) => {
          console.log(err);
        });
      handleCloseModalBrand();
    }
  };

  const handleSaveDrug = () => {
    if (drugName === "") {
      handleCloseModalDrug();
      Swal.fire({
        text: "Please fill all required fields",
        icon: "error",
      });
    } else {
      const payload = {
        drug_name: drugName,
      };
      axiosClient
        .post("/drugs", payload)
        .then(() => {
          setLoad((pre) => !pre);
        })
        .catch((err) => {
          console.log(err);
        });
      handleCloseModalDrug();
    }
  };

  const [brandOptions, setBrandOptions] = useState([]);
  const [drugOptions, setDrugOptions] = useState([]);

  useEffect(() => {
    axiosClient.get("/brands").then(({ data }) => {
      const array = [];
      data.data.map((brand) => {
        const obj = {
          label: brand.brand_name,
          id: brand._id,
        };
        array.push(obj);
      });
      setBrandOptions(array);
    });

    axiosClient.get("/drugs").then(({ data }) => {
      const array = [];
      data.data.map((drug) => {
        const obj = {
          label: drug.drug_name,
          id: drug._id,
        };
        array.push(obj);
      });
      setDrugOptions(array);
    });
  }, [load]);

  return (
    <div>
      <Navbar />
      <div className="container" style={{ width: "100%", display: "flex" }}>
        <div className="bills" style={{ flex: "1" }}>
          <Button
            startIcon={<InventoryIcon />}
            sx={{
              bgcolor: "lightgreen",
              width: "100%",
              textAlign: "left",
              justifyContent: "flex-start",
            }}
            variant="filled"
          >
            All Stock Medicine
          </Button>
        </div>
        {/*  */}
        {/* <div className="medicine"> */}
        <div style={{ flex: "1" }}>
          <Autocomplete
            disablePortal
            style={{ margin: "10px" }}
            id="combo-box-demo"
            options={medicineOptions}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            value={selectedProduct}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} label="Search Medicines" />
            )}
          />
        </div>

        {/* </div> */}
        <div className="info" style={{ flex: "5" }}>
          <Button
            variant="outlined"
            style={{ marginLeft: "50px", marginBottom: "20px" }}
            onClick={addMedicine}
            startIcon={<AddCircle />}
          >
            Add Medicine
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: "50px", marginBottom: "20px" }}
            onClick={addBrand}
            startIcon={<AddCircle />}
          >
            Add Brand
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: "50px", marginBottom: "20px" }}
            onClick={addDrug}
            startIcon={<AddCircle />}
          >
            Add Drug
          </Button>
          <div>
            <FormControl
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                alignItems: "center",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              <FormLabel className="form-label">Product ID: </FormLabel>
              <TextField
                disabled
                className="form-label"
                id="filled-basic"
                label="Product ID"
                variant="filled"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              />
              {/* <FormLabel className="form-label">Product Name: </FormLabel>
              <TextField
                className="form-label"
                id="filled-basic"
                label="Product Name"
                variant="filled"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              /> */}
              <FormLabel className="form-label">Scientific Name: </FormLabel>
              <TextField
                disabled
                className="form-label"
                id="filled-basic"
                label="Scientific Name"
                variant="filled"
                value={scientificName}
                onChange={(e) => setScientificName(e.target.value)}
                required
              />
              <FormLabel className="form-label">Opening Stock: </FormLabel>
              <TextField
                disabled
                className="form-label"
                id="filled-basic"
                label="Opening Stock"
                variant="filled"
                value={openingStock}
                onChange={(e) => setOpeningStock(e.target.value)}
                required
              />
              <FormLabel className="form-label">Add Stock: </FormLabel>
              <TextField
                className="form-label"
                id="filled-basic"
                label="Add Stock"
                variant="filled"
                type="number"
                value={addStock}
                onChange={(e) => {
                  setAddStock(e.target.value);
                  setFinalStock(
                    parseFloat(openingStock) +
                      parseInt(e.target.value === "" ? 0 : e.target.value)
                  );
                }}
                required
              />
              <FormLabel className="form-label">Remove Stock: </FormLabel>
              <TextField
                className="form-label"
                id="filled-basic"
                type="number"
                label="Remove Stock"
                variant="filled"
                value={removeStock}
                onChange={(e) => {
                  setRemoveStock(e.target.value);
                  setFinalStock(
                    parseFloat(openingStock) -
                      parseInt(e.target.value === "" ? 0 : e.target.value)
                  );
                }}
                required
              />
              <FormLabel className="form-label">Final Stock: </FormLabel>
              <TextField
                disabled
                className="form-label"
                id="filled-basic"
                label="Final Stock"
                variant="filled"
                value={finalStock}
                onChange={(e) => setFinalStock(e.target.value)}
                required
              />
            </FormControl>
            <div
              style={{
                marginLeft: "50px",
                marginTop: "30px",
                display: "flex",
                gap: "20px",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleUpdate}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button variant="outlined" startIcon={<CancelIcon />}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Medicine Details</DialogTitle>
        <DialogContent>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={brandOptions}
            sx={{ width: "full" }}
            style={{ marginBottom: "10px" }}
            value={brandId}
            onChange={(event, value) => {
              if (value) {
                setBrandId(value);
              } else {
                setBrandId(null);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Brand" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={drugOptions}
            sx={{ width: "full" }}
            style={{ marginBottom: "10px" }}
            value={drugId}
            onChange={(event, value) => {
              if (value) {
                setDrugId(value);
              } else {
                setDrugId(null);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Drug" />}
          />
          <TextField
            fullWidth
            label="Dosage"
            variant="standard"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />
          <TextField
            fullWidth
            label="Quantity"
            variant="standard"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <TextField
            fullWidth
            label="Price"
            variant="standard"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            fullWidth
            label="Special Instructions"
            variant="standard"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {formError && (
            <p className="error-message">Please fill in all required fields</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button onClick={handleSaveMedicine}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isModalOpenBrand} onClose={handleCloseModalBrand}>
        <DialogTitle>Brand Details</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Brand Name"
            variant="standard"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalBrand}>Close</Button>
          <Button onClick={handleSaveBrand}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isModalOpenDrug} onClose={handleCloseModalDrug}>
        <DialogTitle>Drug Details</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Drug Name"
            variant="standard"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDrug}>Close</Button>
          <Button onClick={handleSaveDrug}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
