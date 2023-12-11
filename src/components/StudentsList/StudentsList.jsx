import React, { useState } from "react";
import styles from "./StudentsList.module.css";
import StudentItem from "../StudentItem/StudentItem";
import FilterStudents from "../FilterStudents/FilterStudents";
import { useStudents } from "../../context/StudentsContext";
const Lessons_beginner = 10;
const Lessons_intermediate = 20;
const Lessons_advanced = 20;
function StudentsList() {
  const { students, isLoading, error, dispatch } = useStudents();
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const applyFilter = (filters) => {
    const updatedStudents = students.filter((student) => {
      return (
        (filters.carType === "" ||
          student.CarType.toLowerCase() === filters.carType.toLowerCase()) &&
        (filters.lessonProgress === "" ||
          (filters.lessonProgress === "Beginner"
            ? student.NoLessons <= Lessons_beginner
            : filters.lessonProgress === "Intermediate"
            ? student.NoLessons <= Lessons_intermediate &&
              student.NoLessons > Lessons_beginner
            : student.NoLessons >= Lessons_advanced &&
              student.NoLessons > Lessons_intermediate)) &&
        (filters.location === "" ||
          student.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (filters.totalLessonsCompleted === 0 ||
          student.NoLessons === Number(filters.totalLessonsCompleted))
      );
    });
    if (updatedStudents.length === 0) {
      dispatch({
        type: "rejected",
        payload:
          "Oops! 🤔 It seems we couldn't find any matching students. Adjust your filters and try again! 🧐🔍",
      });
      setFilteredStudents([]);
      setFilterModalOpen(false);
      return;
    }
    dispatch({ type: "rejected", payload: "" });
    setFilteredStudents(updatedStudents);
    setFilterModalOpen(false);
  };

  function handleDeleteStudent(id) {
    const updatedStd = students.filter((student) => student.ID !== id);
    setFilteredStudents(updatedStd);
  }

  function UpdateLessonsForStudent(id, newlessons) {
    const updatedStudents = students.map((student) => {
      if (student.ID === id) {
        return { ...student, NoLessons: student.NoLessons + newlessons };
      }
      return student;
    });

    // setStudents(updatedStudents);
  }

  function handlePayment(id, payment) {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return { ...student, TotalPayed: student.TotalPayed + Number(payment) };
      }
      return student;
    });
    //const srd =
    //updateStudent
    //setStudents(updatedStudents);
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
      <h1 className={styles.error}>{`${error} `}</h1>

      {/* Student List */}
      {students.map((std) => (
        <StudentItem
          student={std}
          onUpdate={UpdateLessonsForStudent}
          onDelete={handleDeleteStudent}
          onPayment={handlePayment}
          key={std.id}
        />
      ))}
    </div>
  );
}

export default StudentsList;
