import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
// import "./navbar.css";

function UserCard() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  return (
    <Button>
      <Card variant="outlined">
        <div
          className="card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding:"20px"
          }}
        >
          <Avatar
            style={{ textAlign: "center" }}
            alt="Sudew"
            src="/static/images/avatar/5.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              paddingTop: "20px",
              paddingBottom: "10px",
            }}
          >
            {name}
          </Typography>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            {email}
          </Typography>
        </div>
      </Card>
    </Button>
  );
}

export default UserCard;
