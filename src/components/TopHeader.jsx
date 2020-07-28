import React from "react";
import TERNDataDropdown from "./dropdowns/TERNDataDropdown";
import CommunityDropdown from "./dropdowns/CommunityDropdown";
import CoESRADropdown from "./dropdowns/CoESRADropdown";
import DataVisualiserDropdown from "./dropdowns/DataVisualiserDropdown";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default function TopHeader() {
  return (
    <Router>
        <Col style={{display: 'flex', justifyContent: 'center', backgroundColor: '#043E4F'}}>
  
  
      
              
              <Row style={{ marginRight: "1%", display: 'flex', alignItems: 'center'}}>
                <Col style={{ marginRight: "15px" }}>
                  {" "}
                  <TERNDataDropdown />
                </Col>
                <Col>
                  {" "}
                  <DataVisualiserDropdown />
                </Col>
                <Col style={{ marginLeft: "40px" }}>
                  {" "}
                  <CoESRADropdown />
                </Col>
                <Col>
                  <CommunityDropdown />
                </Col>
              </Row>
              <div className="above-header-section-1">
                <div style={{lineHeight: "2"}}>
                  <Link to="/">
                    {" "}
                    <img src="img/logo-mini-all.png" alt="logo"/>{" "}
                  </Link>
                </div>
              </div>
              <div className="above-header-section above-header-section-2">
                <div id="data">
                  {" "}
                  <Link to="/data" style={{ color: "#fff", fontSize: "16px" }}>
                    <p className="center">Data</p>
                  </Link>
                </div>
              </div>
      
          
     
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/data">
            <DataPortal />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </Col>
   
    </Router>
  );
}

function Home() {
  return (
    <div>
      {/* <MainMenu />
      <MainBanner />
      <SignIn />
      <MainFooter />
      <BioimagesSubFooter /> */}
    </div>
  );
}

function DataPortal() {
  return <div></div>;
}
