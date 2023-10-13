import './ScheduleCall.css'
import Calendar from 'react-calendar';
import { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import "../../assets/css/bootstrape.css";
import profileImage from "../../assets/images/dharmendra.png";
import 'react-calendar/dist/Calendar.css';
import formConfig from "../../formconfig.json";
import { posssibleSlots } from "./slotGenerator";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import img from '../../assets/images/dummy.jpg'
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const datesD = []
function Schedule(props) {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState(null);
  const [value, onChange] = useState(new Date());
  const [apiData, setApiData] = useState(null);
  const [disabledDates, setDisabledDates] = useState([new Date()]);

  const handleNavigate = () => {

    const nextMonth = new Date(value);
    nextMonth.setMonth(value.getMonth() + 1);
    onChange(nextMonth);

  };
  useEffect(() => {

    async function fetchData() {
      try {
        const data = await axios.get('http://api.flickerp.com/api/v1/marketing/event-configs/4/');
        setApiData(data?.data);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    if (apiData && value) {
      const { date_range } = apiData;
      const formattedDate = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
      const selectedDate = date_range[formattedDate];
      if (selectedDate) {
        const { start, end } = selectedDate;
        if (start && end) {
          setSlots(
            posssibleSlots({
              time_duration: '30 min',
              start_time: start,
              end_time: end,
            })
          );
        } else {
          setSlots([]);
        }
      }
    }
  }, [apiData, value]);
  function nextHandler() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let dataObject = undefined;
    if (slots.length > 0)
      dataObject = { slot: (!slot ? `${slots[0].starts + '-' + slots[0].ends}` : slot), date, timeZone }
    if (!dataObject) alert('Slot is not selected');
    else handleClick(dataObject);
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
  useEffect(() => {

    if (apiData !== null) {

      for (let x in apiData?.date_range) {
        setDisabledDates(prev => [...prev, new Date(x)]);
        datesD.push(new Date(x))
      }
    }
  }, [apiData])
  const isDateDisabled = (date) => {

    const disabledDates = datesD;
    return !disabledDates.some(disabledDate => date.getDate() === disabledDate.getDate() && date.getMonth() === disabledDate.getMonth() && date.getFullYear() === disabledDate.getFullYear());
  };
  return (
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
            <h4 className="text-center form-title">Schedule a call</h4>
            <form action="" className="form__time">
              <div className="row">
                <div className="col-md-7">
                  <div className="date">
                    <label for="date">Date*</label>
                    <br />
                    <div className='custom-navigation'>
                      <div className='current-date'>
                        <h3>{monthNames[value.getMonth()]} {value.getFullYear()}</h3>
                      </div>
                      <div className='next-navigate-button'>
                        <ArrowForwardIcon onClick={handleNavigate} />
                      </div>
                    </div>
                    <Calendar
                      onChange={onChange}
                      month={value}
                      allowPartialRange={true}
                      defaultActiveStartDate={new Date()}
                      value={value}
                      view='month'
                      showNeighboringMonth={false}
                      showNavigation={true}
                      tileDisabled={({ date }) => isDateDisabled(date)}
                    />

                  </div>
                </div>
                <div className="col-md-5">
                  <div className="time">
                    <label for="time">Time*</label>

                    <br />

                    {slots.length > 0 ? <div className='slot-container'>

                      {slots.map((data, i) => {
                        return (
                          <div
                            className='slot' key={i}
                            onClick={() => {
                              setSlot(`${data.starts} - ${data.ends}`)
                            }}
                          >
                            <p >
                              {data.starts} - {data.ends}
                            </p>
                          </div>
                        );
                      })}
                    </div> : <div style={{
                      color: 'red',
                      fontFamily: 'sans-serif',
                      fontWeight: 600,
                      textSize: '30px'
                    }}>
                      <p>No Slots availabel for this date</p>
                    </div>}
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
