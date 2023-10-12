import React from "react";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import "../../assets/css/bootstrape.css";
import profileImage from "../../assets/images/dharmendra.png";
import jsonData from "../../formconfig.json";
import DynamicForm from "../../common/DynamicForm/dynamicform";

function Info(props) {
  console.log("jsonData",jsonData);
  const goBack = () => {
    props.changeState("schedule");
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-md-4">
          <div className="wizard_right_content">
            <div className="wizard_right_detail text-center">
              <img src={profileImage} alt="profile"></img>
              <h4>{jsonData?.name}</h4>
              <span>Sales Manager</span>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="myContainer">
            <div className="form-containers animated">
              <div className="form-container animated">
                <h4 className="text-center form-title">
                  {jsonData.config.heading}
                </h4>
                <DynamicForm fields={jsonData.config.fields} goBack={goBack} changeState={props.changeState} scheduleData={props.scheduleData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Info;
