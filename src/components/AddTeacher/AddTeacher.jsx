import { useReducer } from "react";
const initialState = {
  id: "",
  name: "",
  password: "",
  password2: "",
  phoneNumber: "",
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setID":
      return { ...state, id: action.payload };
    case "setName":
      return { ...state, name: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setPassword2":
      return { ...state, password2: action.payload };
    case "setPhoneNumber":
      return { ...state, phoneNumber: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown type");
  }
}
function AddTeacher({ onAdd }) {
  const [{ id, name, password, password2, phoneNumber, error }, dispatch] =
    useReducer(reducer, initialState);

  const isValidName = () => {
    const regex = /^[a-zA-Z ]+$/; // Match letters and spaces only
    return regex.test(name);
  };
  const validation = () => {
    if (id.length === 0 || name.length === 0 || phoneNumber.length === 0) {
      dispatch({ type: "setError", payload: "Empty fields" });
    }
    if (!isValidName(name)) {
      dispatch({ type: "setError", payload: "Name isn't valid" });
    }
    if (password.length < 4) {
      dispatch({
        type: "setError",
        payload: "Password must be at least 6 characters",
      });
    }
    if (password !== password2) {
      dispatch({ type: "setError", payload: "Passwords do not match" });
    }
    return error === "";
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validation()) {
      const teacher = {
        ID: id,
        Name: name,
        Password: password,
        PhoneNumber: phoneNumber,
      };
      onAdd(teacher);
    }
  };
  return (
    <section className="vh-50">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-50">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-10 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-3">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) =>
                          dispatch({ type: "setID", payload: e.target.value })
                        }
                        value={id}
                      />

                      <label className="form-label">ID (username)</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) =>
                          dispatch({ type: "setName", payload: e.target.value })
                        }
                        value={name}
                      />

                      <label className="form-label">Your Name </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        onChange={(e) =>
                          dispatch({
                            type: "setPassword",
                            payload: e.target.value,
                          })
                        }
                        value={password}
                      />
                      <label className="form-label">Password</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        onChange={(e) =>
                          dispatch({
                            type: "setPassword2",
                            payload: e.target.value,
                          })
                        }
                        value={password2}
                      />
                      <label className="form-label">Repeat your password</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) =>
                          dispatch({
                            type: "setPhoneNumber",
                            payload: e.target.value,
                          })
                        }
                        value={phoneNumber}
                      />
                      <label className="form-label">Phone number</label>
                    </div>
                    <span className="text-danger">{error}</span>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-info btn-block btn-lg gradient-custom-4 text-body"
                        onClick={handleSubmit}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <a href="#!" className="fw-bold text-body">
                        <u>Login here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddTeacher;
