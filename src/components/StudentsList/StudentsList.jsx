import StudentItem from "../StudentItem/StudentItem";
import { useState } from "react";

function StudentsList({ students, setStudents }) {
  // student, onUpdate, onDelete

  function handleDeleteStudent(id) {
    const updatedStd = students.filter((student) => student.ID !== id);
    setStudents(updatedStd);
  }
  function UpdateLessonsForStudent(id, newlessons) {
    const updatedStudents = students.map((student) => {
      if (student.ID === id) {
        return { ...student, NoLessons: student.NoLessons + newlessons };
      }
      return student;
    });

    setStudents(updatedStudents);
  }
  function handlePayment(id, payment) {
    const updatedStudents = students.map((student) => {
      if (student.ID === id) {
        return { ...student, TotalPayed: student.TotalPayed + Number(payment) };
      }
      return student;
    });
    setStudents(updatedStudents);
  }
  return (
    <div>
      {students.map((std) => (
        <StudentItem
          student={std}
          onUpdate={UpdateLessonsForStudent}
          onDelete={handleDeleteStudent}
          onPayment={handlePayment}
          key={std.ID}
        />
      ))}
    </div>
  );
}

export default StudentsList;
