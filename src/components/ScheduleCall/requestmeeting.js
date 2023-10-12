import React from "react";
import callImg from "../../assets/images/call-img.jpg";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import "../../assets/css/bootstrape.css";
import profileImage from "../../assets/images/dharmendra.png";

function RequestMeeting() {
  return (
    <div className="row g-0">
      <div className="col-md-4">
        <div className="wizard_right_content">
          <div className="wizard_right_detail text-center">
            <img src={profileImage} alt="profile"></img>
            <h4>Dharmendra Chouhan</h4>
            <span>Sales Manager</span>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="myContainer">
          <div className="form-containers animated">
            <div className="form-container animated">
              <div className="form-container animated text-center">
                <div className="call_icon text-center">
                  <img src={callImg} alt="icon"></img>
                </div>
                <h4 className="text-center form-title mb-3">
                  Meeting time requested
                </h4>
                <p>
                  Keep an eye out for an email confirming your meeting request
                  or suggesting a new time to meet.
                </p>
                <ul>
                  <li>June 7, 2023</li>
                  <li> 5:15 PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RequestMeeting;
