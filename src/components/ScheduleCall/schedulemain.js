import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import "../../assets/css/bootstrape.css";
import enterPrice from "../../assets/images/enterprise-bg2.jpg";
import Schedule from "./schedule";
import Info from "./info";
import RequestMeeting from "./requestmeeting";

function ScheduleMain() {
  const [stateChange, setStateChange] = useState("schedule");
  const [scheduleData,setScheduleData] = useState("");

  const changeState = (state) => {
    setStateChange(state);
  };

  useEffect(() =>{
    function getCurrentTimeZone() {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timeZone;
    }
    const currentTimeZone = getCurrentTimeZone();
    console.log('Current Timezone:', currentTimeZone);
  },[])

  return (
    <>
      <div
        className="second_banner_wrapper"
        style={{ backgroundImage: `url(${enterPrice})` }}
      >
        <div className="form-wizard">
          <div className="steps">
            <ul>
              <li onClick={() => changeState("schedule")}>
                <span className="second">1</span>
                Choose Time
              </li>
              <li onClick={() => changeState("info")}>
                <span className={stateChange === "schedule" ? "" : "second"}>2</span>
                Your Info
              </li>
            </ul>
          </div>
          {stateChange === "schedule" ? (
            <Schedule changeState={changeState} setScheduleData={setScheduleData}/>
          ) : stateChange === "info" ? (
            <Info changeState={changeState} scheduleData={scheduleData}/>
          ) : (
            <RequestMeeting />
          )
          }
        </div>
      </div>
    </>
  );
}

export default ScheduleMain;