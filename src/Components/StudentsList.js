import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditStudent from "./EditStudent";

export default function StudentsList() {
    const [students, setStudents] = useState(null);

    const getStudents = async () => {
        try {
            const response = await fetch("http://localhost:5000/students");
            const jsonData = await response.json();

            setStudents(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteStudent = async (id) => {
        await fetch(`http://localhost:5000/students/${id}`, {
            method: "DELETE",
        });
    };

    useEffect(() => {
        getStudents();
    }, [students]);
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                    {students !== null &&
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>
                                    <EditStudent id={student.id} firstName={student.firstName} lastName={student.lastName}></EditStudent>
                                </td>
                                <td
                                    onClick={() => {
                                        deleteStudent(student.id);
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
