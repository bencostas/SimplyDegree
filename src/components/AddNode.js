import React, { useState, useContext } from "react";
import { Card, Typography, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { CourseContext } from "../utils/context";
import { collection, addDoc } from "firebase/firestore";

const { db } = require("../utils/firebaseConfig");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddNode() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const { nodes, setNodes, handleClose } = useContext(CourseContext);

  async function addCourse(e) {
    console.log(courseName, " ", courseCode);
    setNodes((e) =>
      e.concat({
        id: `horizontal-${e.length + 1}`,
        data: { label: `${courseName}` },
        sourcePosition: "right",
        targetPosition: "left",
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      })
    );
    e.preventDefault();
    // db.collection("courses").add({
    //   course_name: courseName,
    //   course_code: courseCode,
    //   course_desc: courseDescription,
    // });
    const docRef = await addDoc(collection(db, "courses"), {
      course_name: courseName,
      course_code: courseCode,
      course_desc: courseDescription,
    });
    handleClose();
  }
  return (
    <Card sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add a Course
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "2rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Course Name [required]"
          variant="outlined"
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Course Code [required]"
          variant="outlined"
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Course Description [optional]"
          variant="outlined"
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" endIcon={<SendIcon />} onClick={addCourse}>
          Add
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
}
