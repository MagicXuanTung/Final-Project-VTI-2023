import { useNavigate } from "react-router-dom";
import "./Profile.css"

function Profile() {
  const navigate = useNavigate();

  const onBackClick = () => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    navigate('/Homelogin', {
      state: {
        token: token, username: username
      }
    })
  }


  return (
    <div class="h-screen w-screen bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
      <div class="container ">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar flex items-center justify-center">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="ADMIN NAME" />
                    </div>
                    <h5 class="user-name">Yuki Hayashi</h5>
                    <h6 class="user-email">yuki@Maxwell.com</h6>
                  </div>
                  <div class="about">
                    <h5>YOUR INFO</h5>
                    <p className="text-black">I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="fullName">Full Name</label>
                      <input type="text" class="form-control" id="fullName" placeholder="Enter full name" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="eMail">Email</label>
                      <input type="email" class="form-control" id="eMail" placeholder="Enter email ID" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">USERNAME</label>
                      <input type="text" class="form-control" id="phone" placeholder="USERNAME" />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="website">PASSWORD</label>
                      <input type="text" class="form-control" id="website" placeholder="PASSWORD" />
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full"></div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      <button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
                      <button type="button" id="submit" name="submit" class="btn btn-primary" onClick={onBackClick}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Profile;
