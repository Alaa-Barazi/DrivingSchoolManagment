import React, { useState } from "react";
import styles from "./StudentsList.module.css";
import StudentItem from "../StudentItem/StudentItem";
import FilterStudents from "../FilterStudents/FilterStudents";
import { useStudents } from "../../context/StudentsContext";
import Spinner from "../Spinner/Spinner";
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
          Number(student.NoLessons) === Number(filters.totalLessonsCompleted))
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

  return (
    <div>
      {isLoading && <Spinner />}
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
      {/* some issue with filtering and displaying the students */}
      {students.map((std) => (
        <StudentItem student={std} key={std.id} />
      ))}
    </div>
  );
}

export default StudentsList;
