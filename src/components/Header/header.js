import React from "react";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import "../../assets/css/bootstrape.css";
import sentImage from "../../assets/images/sent.png";

function Header() {
  return (
    <>
      <div className="container header">
        <div className="row align-items-center">
          <div className="col-6">
            <div className="logo">
              Flick<span> Schedule</span>
            </div>
          </div>
          <div className="col-6">
            <div className="fill_btn text-end">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="fdvsf">
                {" "}
                Apply FlickERP <img src={sentImage} alt="Sent" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
