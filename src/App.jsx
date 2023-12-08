import { useState } from "react";
import StudentItem from "./components/StudentItem/StudentItem";
import AppNav from "./components/AppNav/AppNav";
import TeacherProfile from "./components/TeacherProfile/TeacherProfile";
import AddStudent from "./components/AddStudent/AddStudent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homapage";
import StudentDetails from "./components/StudentDetails/StudentDetails";
import StudentList from "./components/StudentsList/StudentsList";
import Test from "./components/Test";
import NewPayment from "./components/NewPayment/NewPayment";
import TeacherSignIn from "./components/TeacherSignIn/TeacherSignIn";
import EditProfile from "./components/EditProfile/EditProfile";
import TeacherRegister from "./components/TeacherRegister/TeacherRegister";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import FilterStudents from "./components/FilterStudents/FilterStudents";
const RegisterPay = 130;
const AllStudents = [
  {
    ID: "3659",
    Name: "alaa barazi",
    StartDate: "545",
    BDate: "54",
    NoLessons: 10,
    location: "Rehanyia",
    CarType: "Manual",
    TotalPayed: RegisterPay,
    teacher: "teacherId",
  },
  {
    ID: "2369",
    Name: "yahya barazi",
    StartDate: "545",
    BDate: "54",
    NoLessons: 30,
    location: "Dalton",
    CarType: "Manual",
    TotalPayed: RegisterPay,
    teacher: "teacherId",
  },
  {
    ID: "2359",
    Name: "zahraa barazi",
    StartDate: "545",
    BDate: "54",
    NoLessons: 20,
    location: "Zefat",
    CarType: "Automatic",
    TotalPayed: RegisterPay,
    teacher: "teacherId",
  },
  {
    ID: "23759",
    Name: "yahya",
    StartDate: "545",
    BDate: "54",
    NoLessons: 30,
    location: "Dalton",
    CarType: "Manual",
    TotalPayed: RegisterPay,
    teacher: "teacherId",
  },
  {
    ID: "2514",
    Name: "zrazi",
    StartDate: "545",
    BDate: "54",
    NoLessons: 20,
    location: "Zefat",
    CarType: "Automatic",
    TotalPayed: RegisterPay,
    teacher: "teacherId",
  },
];
const AllTeachers = [
  {
    ID: "123456",
    Name: "knkbnl",
    Password: "Admin",
    PhoneNumber: "0504337676",
    Description: "ghyj",
    Img: "",
  },
];
function App() {
  const [students, setStudents] = useState(AllStudents);
  const [teachers, setTeachers] = useState(AllTeachers);
  const [showPay, setShowPay] = useState(false);
  function handleAddStudent(student) {
    const newStd = {
      ...student,
      TotalPayed: RegisterPay,
      teacher: "this teacher",
    };
    setStudents((students) => [...students, newStd]);
    console.log(newStd);
  }
  return (
    <>
      <BrowserRouter>
        <AppNav setShow={setShowPay} />
        <Routes>
          <Route index element={<Homepage />} />

          <Route
            path="Students"
            element={
              <StudentList students={students} setStudents={setStudents} />
            }
          />
          {/* <StudentList students={students} setStudents={setStudents} /> */}
          <Route
            path="Students/:id"
            element={<StudentDetails student={students[0]} />}
          />

          <Route
            path="AddStudent"
            element={<AddStudent onAdd={handleAddStudent} />}
          />
          <Route path="Login" element={<TeacherSignIn />} />
          <Route path="Register" element={<TeacherRegister />} />
          <Route
            path="Profile"
            element={<TeacherProfile teacher={teachers[0]} />}
          />
          <Route path="Profile/:id" element={<EditProfile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
