import TimelineIcon from "@mui/icons-material/Timeline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function DashButton() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        sx={{
          marginRight: "10px",
          paddingTop: "110px",
          paddingBottom: "110px",
          paddingLeft: "50px",
          paddingRight: "50px",
          border: "1px solid white",
          ":hover": {
            backgroundColor: "white",
            color: "black",
            transition: "0.5s ease-in-out",
          },
        }}
        onClick={() => navigate("/billsystem")}
        variant="filledTonal"
        startIcon={<AddCircleIcon />}
      >
        Create New Bill
      </Button>
      <Button
        sx={{
          border: "1px solid white",
          paddingTop: "110px",
          paddingBottom: "110px",
          paddingLeft: "50px",
          paddingRight: "50px",
          ":hover": {
            backgroundColor: "white",
            color: "black",
            transition: "0.5s ease-in-out",
          },
        }}
        onClick={() => navigate("/stockmanage")}
        variant="filledTonal"
        startIcon={<TimelineIcon />}
      >
        Stock Management
      </Button>
    </>
  );
}
