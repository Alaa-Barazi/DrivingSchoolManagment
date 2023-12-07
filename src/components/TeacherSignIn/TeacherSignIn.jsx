import { useReducer } from "react";
const initialState = {
  id: "",
  password: "",
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setID":
      return { ...state, id: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown type");
  }
}
function TeacherSignIn() {
  const [{ id, password, error }, dispatch] = useReducer(reducer, initialState);
  function handleSubmit() {}
  return (
    <section className="vh-50">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-50">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-10 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-3">Sign in</h2>

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) =>
                          dispatch({ type: "setID", payload: e.target.value })
                        }
                        value={id}
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
                    </div>

                    <span className="text-danger">{error}</span>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-info btn-block btn-lg gradient-custom-4 text-body"
                        onClick={handleSubmit}
                      >
                        Sign in
                      </button>
                    </div>

                    <div>
                      <p className="mb-0 center">
                        Don't have an account?{" "}
                        <a href="#!" className="text-black-50 fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
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

export default TeacherSignIn;
