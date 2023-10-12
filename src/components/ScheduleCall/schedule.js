import {useState,useEffect} from "react";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import "../../assets/css/bootstrape.css";
import profileImage from "../../assets/images/dharmendra.png";

import formConfig from "../../formconfig.json";
import { posssibleSlots } from "./slotGenerator";
function Schedule(props) {
  const [slots, setSlots] = useState([]);
  const [date,setDate] = useState(null);
  const [slot,setSlot] = useState(null);

  useEffect(() => {
    const { start_time, end_time, time_difference, time_duration } =
      formConfig.config;

    setSlots(
      posssibleSlots({
        time_duration,
        start_time,
        end_time,
        time_difference,
      })
    );

    setDate(getTodayDate());
  }, []);
  function nextHandler(){
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dataObject ={ slot:(!slot?`${slots[0].starts+ '-' +slots[0].ends}`:slot ),date,timeZone}
    handleClick(dataObject);
  }
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const handleClick = (dataObject) => {
    props.changeState("info");
    props.setScheduleData(dataObject);
  };
  return (
    <div className="row g-0">
      <div className="col-md-4">
        <div className="wizard_right_content">
          <div className="wizard_right_detail text-center">
            <img src={profileImage} alt="profile"></img>
            <h4>{formConfig?.name}</h4>
            <span>Sales Manager</span>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="myContainer">
          <div className="form-containers animated">
            <h4 className="text-center form-title">Schedule a call</h4>
            <form action="" className="form__time">
              <div className="row">
                <div className="col-md-6">
                  <div className="date">
                    <label for="date">Date*</label>
                    <br />
                    <input 
                      id="date" 
                      type="date"
                      defaultValue={getTodayDate()}
                      min={formConfig.config.start_date}
                      max={formConfig.config.end_date}
                      onChange={(e)=>setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="time">
                    <label for="time">Time*</label>
                    <br />
                    <select
                    onChange={(e)=>{
                      setSlot(e.target.value);
                      }}> 
                      {slots?.map((data, i) => {
                        return (
                          <option key={i}>
                    
                                <h3>
                                {data.starts} - {data.ends}
                              </h3>
                        
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="timezone">
                    <label for="timezone">Timezone*</label>{" "}
                    <select name="timezone">
                      <option value="-12">
                        (GMT -12:00) Eniwetok, Kwajalein
                      </option>
                      <option value="-11">
                        (GMT -11:00) Midway Island, Samoa
                      </option>
                      <option value="-10">(GMT -10:00) Hawaii</option>
                      <option value="-9">(GMT -9:00) Alaska</option>
                      <option value="-8">
                        (GMT -8:00) Pacific Time (US &amp; Canada)
                      </option>
                      <option value="-7">
                        (GMT -7:00) Mountain Time (US &amp; Canada)
                      </option>
                      <option value="-6">
                        (GMT -6:00) Central Time (US &amp; Canada), Mexico City
                      </option>
                      <option value="-5">
                        (GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
                      </option>
                      <option value="-4.5">(GMT -4:30) Caracas</option>
                      <option value="-4">
                        (GMT -4:00) Atlantic Time (Canada), La Paz, Santiago
                      </option>
                      <option value="-3.5">(GMT -3:30) Newfoundland</option>
                      <option value="-3">
                        (GMT -3:00) Brazil, Buenos Aires, Georgetown
                      </option>
                      <option value="-2">(GMT -2:00) Mid-Atlantic</option>
                      <option value="-1">
                        (GMT -1:00 hour) Azores, Cape Verde Islands
                      </option>
                      <option selected="selected" value="0">
                        (GMT) Western Europe Time, London, Lisbon, Casablanca,
                        Greenwich
                      </option>
                      <option value="1">
                        (GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris
                      </option>
                      <option value="2">
                        (GMT +2:00) Kaliningrad, South Africa, Cairo
                      </option>
                      <option value="3">
                        (GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
                      </option>
                      <option value="3.5">(GMT +3:30) Tehran</option>
                      <option value="4">
                        (GMT +4:00) Abu Dhabi, Muscat, Yerevan, Baku, Tbilisi
                      </option>
                      <option value="4.5">(GMT +4:30) Kabul</option>
                      <option value="5">
                        (GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent
                      </option>
                      <option value="5.5">
                        (GMT +5:30) Mumbai, Kolkata, Chennai, New Delhi
                      </option>
                      <option value="5.75">(GMT +5:45) Kathmandu</option>
                      <option value="6">
                        (GMT +6:00) Almaty, Dhaka, Colombo
                      </option>
                      <option value="6.5">
                        (GMT +6:30) Yangon, Cocos Islands
                      </option>
                      <option value="7">
                        (GMT +7:00) Bangkok, Hanoi, Jakarta
                      </option>
                      <option value="8">
                        (GMT +8:00) Beijing, Perth, Singapore, Hong Kong
                      </option>
                      <option value="9">
                        (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
                      </option>
                      <option value="9.5">(GMT +9:30) Adelaide, Darwin</option>
                      <option value="10">
                        (GMT +10:00) Eastern Australia, Guam, Vladivostok
                      </option>
                      <option value="11">
                        (GMT +11:00) Magadan, Solomon Islands, New Caledonia
                      </option>
                      <option value="12">
                        (GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
                      </option>
                    </select>
                  </div>
                </div>
                {/* <div className="col-md-12">
                  <div className="timezone">
                    <label for="timezone">How long do you need?*</label>{" "}
                    <select name="timezone">
                      <option onClick={setDuration('15 Min')} value="22">15 Min</option>
                      <option onClick={setDuration('')} value="23">30 Min</option>
                      <option value="24">1 Hours</option>
                    </select>
                  </div>
                </div> */}
              </div>
            </form>
            <div className="form-group text-end">
              <div className="fill_btn next">
                <button className="next-button" onClick={nextHandler}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
