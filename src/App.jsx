import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppNav from "./components/AppNav/AppNav";
import TeacherProfile from "./components/TeacherProfile/TeacherProfile";
import AddStudent from "./components/AddStudent/AddStudent";
import Homepage from "./components/Homepage/Homapage";
import StudentDetails from "./components/StudentDetails/StudentDetails";
import StudentList from "./components/StudentsList/StudentsList";
import TeacherSignIn from "./components/TeacherSignIn/TeacherSignIn";
import EditProfile from "./components/EditProfile/EditProfile";
import TeacherRegister from "./components/TeacherRegister/TeacherRegister";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { StudentsProvider } from "./context/StudentsContext";
import { TeachersProvider } from "./context/TeachersContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <TeachersProvider>
        <AuthProvider>
          <StudentsProvider>
            <BrowserRouter>
              <AppNav />
              <Routes>
                <Route index element={<Homepage />} />

                <Route path="/Students" element={<StudentList />} />
                {/* <StudentList students={students} setStudents={setStudents} /> */}
                <Route
                  path="Students/:id"
                  element={<StudentDetails  />}
                />

                <Route
                  path="AddStudent"
                  element={<AddStudent  />}
                />
                <Route path="Login" element={<TeacherSignIn />} />
                <Route path="Register" element={<TeacherRegister />} />
                <Route
                  path="Profile"
                  element={<TeacherProfile />}
                />
                <Route path="Profile/:id" element={<EditProfile />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </StudentsProvider>
        </AuthProvider>
      </TeachersProvider>
    </>
  );
}

export default App;
