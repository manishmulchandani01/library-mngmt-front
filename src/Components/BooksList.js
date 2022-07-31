import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditBook from "./EditBook";

export default function BooksList() {
    const [books, setBooks] = useState(null);

    const getBooks = async () => {
        try {
            const response = await fetch("http://localhost:5000/books");
            const jsonData = await response.json();

            setBooks(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteBook = async (id) => {
        await fetch(`http://localhost:5000/books/${id}`, {
            method: "DELETE",
        });
    };

    useEffect(() => {
        getBooks();
    }, [books]);
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Borrowed By</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                    {books !== null &&
                        books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.borrowedBy}</td>
                                <td>{book.borrowDate}</td>
                                <td>{book.returnDate}</td>
                                <td>
                                    <EditBook
                                        id={book.id}
                                        name={book.name}
                                        author={book.author}
                                        borrowedBy={book.borrowedBy}
                                        borrowDate={book.borrowDate}
                                        returnDate={book.returnDate}
                                    ></EditBook>
                                </td>
                                <td
                                    onClick={() => {
                                        deleteBook(book.id);
                                    }}
                                >
                                    <IconButton
                                        aria-label="delete"
                                        size="small"
                                    >
                                        <DeleteIcon
                                            fontSize="small"
                                            color="error"
                                        />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
