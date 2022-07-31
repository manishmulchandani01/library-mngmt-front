import React from "react";
import AddBook from "../Components/AddBook";
import BooksList from "../Components/BooksList";

export default function Books() {
    return (
        <div>
            <div className="row">
                <div>
                    <h2>Books List</h2>
                </div>
                <div>
                    <AddBook></AddBook>
                </div>
            </div>
            <br></br>
            <div>
                <BooksList></BooksList>
            </div>
        </div>
    );
}
