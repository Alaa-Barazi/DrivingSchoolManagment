import { useState } from "react";
import styles from "./FilterStudents.module.css";
import StudentItem from "../StudentItem/StudentItem";
function FilterStudents({ isOpen, onClose, onApplyFilter }) {
  const [filters, setFilters] = useState({
    carType: "",
    lessonProgress: "",
    location: "",
    totalLessonsCompleted: "",
  });

  const handleFilterChange = () => {
    onApplyFilter(filters);
    onClose();
  };
  const handleClearFilter = () => {
    setFilters({
      carType: "",
      lessonProgress: "",
      location: "",
      totalLessonsCompleted: "",
    });
    onApplyFilter(""); // Apply an empty filter to show all students
    onClose();
  };

  return (
    <div className={`container ${isOpen ? "" : "hidden"}`}>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div className={styles.titleCloseBtn} onClick={onClose}>
              <button>X</button>
            </div>
            <div className={styles.Mtitle}>
              <h1>Filter By: </h1>
            </div>
            <label>
              Car Type:
              <select
                value={filters.carType}
                onChange={(e) =>
                  setFilters({ ...filters, carType: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </label>

            <label>
              Lesson Progress:
              <select
                value={filters.lessonProgress}
                onChange={(e) =>
                  setFilters({ ...filters, lessonProgress: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>

            <label>
              Location:
              <input
                type="text"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />
            </label>

            <label>
              Total Lessons Completed:
              <input
                type="number"
                value={filters.totalLessonsCompleted}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    totalLessonsCompleted: e.target.value,
                  })
                }
              />
            </label>
            <div className={styles.Mfooter}>
              <button
                onClick={handleClearFilter}
                style={{ backgroundColor: "grey" }}
              >
                Clear Filter
              </button>
              <button
                onClick={onClose}
                style={{ backgroundColor: "cornflowerblue" }}
              >
                Close
              </button>
              <button onClick={handleFilterChange}>Apply Filter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterStudents;
