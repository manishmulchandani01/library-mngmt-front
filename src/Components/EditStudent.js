import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function EditStudent(props) {
    const [open, setOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = useState("");

    const handleClickOpen = () => {
        setFirstName(props.firstName);
        setLastName(props.lastName);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (firstName !== "" && lastName !== "") {
            const data = { firstName, lastName };
            const response = await fetch(
                `http://localhost:5000/students/${props.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            if (response) {
                setOpen(false);
            }
        }
    };

    return (
        <div>
            <IconButton
                onClick={handleClickOpen}
                aria-label="delete"
                size="small"
            >
                <EditIcon fontSize="small" color="primary" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student</DialogTitle>
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
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
