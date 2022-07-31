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
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function EditBook(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [borrowedBy, setBorrowedBy] = useState("");
    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [students, setStudents] = useState(null);

    const handleClickOpen = () => {
        setName(props.name);
        setAuthor(props.author);
        setBorrowedBy(props.borrowedBy);
        setBorrowDate(props.borrowDate);
        setReturnDate(props.returnDate);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getStudents = async () => {
        try {
            const response = await fetch("http://localhost:5000/students");
            const jsonData = await response.json();

            setStudents(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getStudents();
    }, [students]);

    const handleSave = async () => {
        if (name !== "" && author !== "") {
            const data = { name, author, borrowedBy, borrowDate, returnDate };
            const response = await fetch(
                `http://localhost:5000/books/${props.id}`,
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
                <DialogTitle>Edit Book</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter book details.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Book Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="author"
                        label="Author"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <InputLabel sx={{ mt: 2 }} id="student">
                        Borrowed By
                    </InputLabel>
                    <Select
                        labelId="borrowedBy"
                        id="borrowedBy"
                        value={borrowedBy}
                        label="borrowedBy"
                        onChange={(e) => setBorrowedBy(e.target.value)}
                    >
                        {students &&
                            students.map((student) => (
                                <MenuItem
                                    key={student.id}
                                    value={student.firstName}
                                >
                                    {student.firstName}
                                </MenuItem>
                            ))}
                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="borrowDate"
                        label="Borrow Date"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="returnDate"
                        label="Return Date"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
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
