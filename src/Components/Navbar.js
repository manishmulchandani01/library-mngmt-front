import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Link to="/">
                            <HomeIcon />
                        </Link>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Library Management
                    </Typography>
                    <Link to="/students">
                        <Button color="inherit">Students</Button>
                    </Link>
                    <Link to="/books">
                        <Button color="inherit">Books</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
