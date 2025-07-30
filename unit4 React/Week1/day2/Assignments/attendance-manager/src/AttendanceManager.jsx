import React, { useState } from "react";

const initialStudents = [
  { id: 1, name: "John", present: true },
  { id: 2, name: "Sneha", present: false },
  { id: 3, name: "Rahul", present: true },
  { id: 4, name: "Isha", present: false },
  { id: 5, name: "Vikram", present: true },
];

export default function AttendanceManager() {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState("All");

  const toggleAttendance = (id) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updated);
  };

  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    if (filter === "Present") return student.present;
    if (filter === "Absent") return !student.present;
    return true;
  });

  const presentCount = students.filter((s) => s.present).length;

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>📋 Attendance Manager </h2>

      <label>Filter: </label>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option>All</option>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredStudents.map((student) => (
          <li
            key={student.id}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: student.present ? "#e0ffe0" : "#ffe0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {student.name} -{" "}
              <strong style={{ color: student.present ? "green" : "red" }}>
                {student.present ? "Present" : "Absent"}
              </strong>
            </span>
            <button onClick={() => toggleAttendance(student.id)}>Toggle</button>
          </li>
        ))}
      </ul>

      <h4>Total Present: {presentCount}</h4>
    </div>
  );
}
