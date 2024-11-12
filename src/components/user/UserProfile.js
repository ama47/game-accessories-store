import { useState } from "react";
import { Button, Popover, FormControl, TextField } from "@mui/material";
import axios from "axios";

export default function UserProfile(prop) {
  const {
    userData,
    setSnackBarMessage,
    setOpenSuccessSnackBar,
    setOpenErrorSnackBar,
  } = prop;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [formUserData, setFormUserData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  function onChangeHandler(event) {
    setFormUserData({
      ...formUserData,
      [event.target.id]: event.target.value,
    });
  }

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    let userPut = userData;
    userPut.firstName = formUserData.firstName;
    userPut.lastName = formUserData.lastName;
    // verify user first
    const url = "https://game-accessories-api.onrender.com/api/v1/Users/signIn";
    axios
      .post(url, {
        email: userData.email,
        password: formUserData.password,
      })
      .then((response) => {
        if (response.status === 200) {
          userPut.password = formUserData.password;
          // send updated data
          axios
            .put(
              `https://game-accessories-api.onrender.com/api/v1/Users/${userData.userId}`,
              userPut,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((response) => {
              setSnackBarMessage("User information updated successfully");
              setOpenSuccessSnackBar(true);
              handleClose();
            })
            .catch((error) => {
              setSnackBarMessage("User information update failed");
              setOpenErrorSnackBar(true);
            });
        }
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 500) {
          setSnackBarMessage("Incorrect password");
          setOpenErrorSnackBar(true);
        }
      });
  };

  return (
    <>
      <h2 className="text-4xl font-extrabold text-gray-800 mt-5 mb-12">
        Profile
      </h2>
      <div className="font-[sans-serif] p-4 mx-auto my-5 lg:max-w-5xl md:max-w-3xl max-w-lg gap-12 shadow-md shadow-pink-500/30rounded-lg">
        <h3 className="mb-5 text-xl font-bold text-gray-800">Username</h3>
        <p>{userData.username}</p>
        <div className="divider"></div>
        <h3 className="mt-5 mb-5 text-xl font-bold text-gray-800">
          First Name
        </h3>
        <p>{userData.firstName}</p>
        <div className="divider"></div>
        <h3 className="mt-5 mb-5 text-xl font-bold text-gray-800">Last Name</h3>
        <p>{userData.lastName}</p>
        <div className="divider"></div>
        <h3 className="mt-5 mb-5 text-xl font-bold text-gray-800">Email</h3>
        <p>{userData.email}</p>
        <div className="divider"></div>
        <h3 className="mt-5 mb-5 text-xl font-bold text-gray-800">
          Phone Number
        </h3>
        <p>{userData.phoneNumber}</p>
        <Button
          sx={{ marginTop: 5, marginBottom: 1 }}
          variant="contained"
          onClick={handleClick}
        >
          Edit Profile
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <FormControl variant="standard">
            <TextField
              id="firstName"
              label="First Name"
              onChange={onChangeHandler}
            />
            <TextField
              id="lastName"
              label="Last Name"
              onChange={onChangeHandler}
            />
            <TextField
              id="password"
              label="Password to confirm"
              type="password"
              onChange={onChangeHandler}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Done
            </Button>
          </FormControl>
        </Popover>
      </div>
    </>
  );
}
