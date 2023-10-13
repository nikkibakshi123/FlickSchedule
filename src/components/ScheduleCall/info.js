import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import "../../assets/css/bootstrape.css";
import axios from "axios";
import img from '../../assets/images/dummy.jpg'
import InviteQuestion from "../../common/DynamicForm/InviteQuestion";

function Info(props) {
  const [apiData, setApiData] = useState(null);
  console.log("fdsghbfdghjdfsgnjlkrds");

  useEffect(() => {
    getDynamicForm();
  }, [])

  const getDynamicForm = async () => {
    const data = await axios.get('http://api.flickerp.com/api/v1/marketing/event-configs/4/');
    setApiData(data?.data);
  }

  const goBack = () => {
    props.changeState("schedule");
  };


  return (
    <>
      <div className="row g-0">
        <div className="col-md-4">
          <div className="wizard_right_content">
            <div className="wizard_right_detail text-center">
              <img src={(apiData?.employee?.img) ? apiData?.employee?.img : img} alt="profile"></img>
              <h4>{`${apiData?.employee?.user?.firstname} ${apiData?.employee?.user?.lastname}`}</h4>
              <span>{apiData?.employee?.designation?.name}</span>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="myContainer">
            <div className="form-containers animated">
              <div className="form-container animated">
                <h4 className="text-center form-title">
                  {/* {jsonData.config.heading} */}
                </h4>
                {console.log("Nikki Bakshi", apiData)}
                {apiData ? <InviteQuestion fields={apiData?.booking_info?.initialQuestion} goBack={goBack} changeState={props.changeState} scheduleData={props.scheduleData} /> : null}
                {/* <DynamicForm fields={apiData?.booking_info?.inviteeQuestion} goBack={goBack} changeState={props.changeState} scheduleData={props.scheduleData} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Info;
