import "./TeacherProfile.module.css";
function TeacherProfile() {
  return (
    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-7">
          <div class="card p-3 py-4">
            <div class="text-center">
              <img
                src="https://i.imgur.com/bDLhJiP.jpg"
                width="100"
                class="rounded-circle"
                alt="teacherimg"
              />
            </div>

            <div class="text-center mt-3">
              <span class="bg-secondary p-1 px-4 rounded text-white">Pro</span>
              <h5 class="mt-2 mb-0">Alexender Schidmt</h5>

              <div class="px-4 mt-1">
                <p class="fonts">
                  Experienced and patient driving instructor dedicated to
                  helping learners develop safe and confident driving skills.
                  With a passion for road safety and a comprehensive
                  understanding of traffic regulations, I provide personalized
                  instruction tailored to individual needs.
                </p>
              </div>

            
              <div class="buttons">
                <button class="btn btn-outline-primary px-4">
                  Edit Profile
                </button>
                <button class="btn btn-primary px-4 ms-3">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
