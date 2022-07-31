import React from "react";
import AddStudent from "../Components/AddStudent";
import StudentsList from "../Components/StudentsList";

export default function Students() {
    return (
        <div>
            <div className="row">
                <div>
                    <h2>Students List</h2>
                </div>
                <div>
                    <AddStudent></AddStudent>
                </div>
            </div>
            <br></br>
            <div>
                <StudentsList></StudentsList>
            </div>
        </div>
    );
}
