import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function AddStudent() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFirstName("");
        setLastName("");
    };

    const handleAdd = async () => {
        if (firstName !== "" && lastName !== "") {
            const data = { firstName, lastName };
            const response = await fetch("http://localhost:5000/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response) {
                setOpen(false);
            }
        }
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Student
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter first and last name of student.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
