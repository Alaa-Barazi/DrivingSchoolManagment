import React, { useState } from "react";
import styles from "./StudentsList.module.css";
import StudentItem from "../StudentItem/StudentItem";
import FilterStudents from "../FilterStudents/FilterStudents";
const Lessons_beginner = 10;
const Lessons_intermediate = 20;
const Lessons_advanced = 20;
function StudentsList({ students: allStudents, setStudents }) {
  const [filteredStudents, setFilteredStudents] = useState(allStudents);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const applyFilter = (filters) => {
    if (filters === "") return setFilteredStudents(allStudents);
    const updatedStudents = allStudents.filter((student) => {
      return (
        (filters.carType === "" ||
          student.CarType.toLowerCase() === filters.carType.toLowerCase()) &&
        (filters.lessonProgress === "" || filters.lessonProgress === "Beginner"
          ? student.NoLessons <= Lessons_beginner
          : filters.lessonProgress === "Intermediate"
          ? student.NoLessons <= Lessons_intermediate
          : student.NoLessons >= Lessons_advanced) &&
        (filters.location === "" ||
          student.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (filters.totalLessonsCompleted === "" ||
          student.NoLessons === Number(filters.totalLessonsCompleted))
      );
    });
    setFilteredStudents(updatedStudents);
    setFilterModalOpen(false);
  };

  function handleDeleteStudent(id) {
    const updatedStd = allStudents.filter((student) => student.ID !== id);
    setStudents(updatedStd);
  }

  function UpdateLessonsForStudent(id, newlessons) {
    const updatedStudents = allStudents.map((student) => {
      if (student.ID === id) {
        return { ...student, NoLessons: student.NoLessons + newlessons };
      }
      return student;
    });

    setStudents(updatedStudents);
  }

  function handlePayment(id, payment) {
    const updatedStudents = allStudents.map((student) => {
      if (student.ID === id) {
        return { ...student, TotalPayed: student.TotalPayed + Number(payment) };
      }
      return student;
    });
    setStudents(updatedStudents);
  }

  return (
    <div>
      <button
        onClick={() => setFilterModalOpen(true)}
        className={styles.openFilterButton}
      >
        Open Filter
      </button>

      {/* Filter Modal */}
      <FilterStudents
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApplyFilter={applyFilter}
      />

      {/* Student List */}
      {filteredStudents.map((std) => (
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
