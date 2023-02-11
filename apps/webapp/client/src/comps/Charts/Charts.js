import React, { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import AuthContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { ChakraProvider, Button } from "@chakra-ui/react";

const Charts = () => {
  const navigate = useNavigate();
  const [usageData, setUsageData] = useState([]);
  console.log("here");
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const handleLogout = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URI}/logout`, {
      withCredentials: true,
    });
    navigate('/')
    //   window.location.replace(data.url)
  };
  useEffect(() => {
    const checkContext = async () => {
      const res = await getLoggedIn();
      if (res === false) navigate("/");
    };
    checkContext();
  }, [loggedIn]);

  const handlerequest = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URI}/getAllUrls`
    );
    setUsageData(data.data.data);
  };

  useEffect(() => {
    handlerequest();
  }, []);

  let sum = 0;
  let formated_data = [["URL", "Data"]];
  usageData.forEach((item) => {
    formated_data.push([item.url, item.dataSent]);
    sum += item.dataSent;
  });

  console.log(formated_data);

  const options = {
    title: "Emissions based on ur internet usage",
    chartArea: { width: "60%" },
    hAxis: {
      title: "Emissions",
      minValue: 0,
    },
    vAxis: {
      title: "Domain",
    },
  };

  return (
    <>
      <div className="dash-wrap">
        <div className="option">
          <div className="profile-pad">
            <div className="logo">
              {/* <div className="dashboto-logo">
                <p>B</p>
                <p>LO</p>
                </div> */}
              <p className="logo rog">EMISSION</p>
              <p className="logo">TRACKER</p>
            </div>
            <p className="tagline">CLEAN BROWSING</p>
            <button
              className="main"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
          <div className="clear"></div>
          <ul className="menu">
            <a href="">
              <i className="fa fa-dashboard"></i>
              Dashboard
            </a>
            <a href="">
              <i className="fa fa-tasks"></i>
              Transactions
            </a>
            <a href="">
              <i className="fa fa-book"></i>
              Invoice Tool
            </a>
            <a href="">
              <i className="fa fa-newspaper-o"></i>
              News
            </a>
            <a href="">
              <i className="fa fa-money"></i>
              Donate
            </a>
          </ul>
        </div>

        <div className="dashboard-heading">
          {/* <div className="panel">
            <i className="fa fa-bell">
              <bold>1</bold>
            </i>
            <div ng-app="app" ng-controller="coin">

            </div>
          </div> */}
          <div className="all">
            <div className="starter-stats">
              <div className="blok">
                <i className="fa fa-money"></i>
                <div className="no">
                  <p>Sites Visited</p>
                  <p> {formated_data.length-1}</p>
                </div>
              </div>

              <div className="blok">
                <i className="fa fa-money kl"></i>
                <div className="no">
                  <p> Total Traffic </p>
                  <p> {sum} </p>
                </div>
              </div>

              <div className="blok">
                <i className="fa fa-money pl"></i>
                <div className="no">
                  <p>Longest HODL</p>
                  <p>8 Months</p>
                </div>
              </div>
              <div className="clear"></div>
              <div className="gains">
                <Chart
                  chartType="BarChart"
                  data={formated_data}
                  width="100%"
                  height="400px"
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
