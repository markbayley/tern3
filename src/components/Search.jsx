import React, { useState } from "react";
import {
  Container,
  Button,
  FormControl,
  Col,
  Row,
  InputGroup,
  Navbar,
  Image,
  Form,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import LoginButton from "./buttons/LoginButton";
import RegisterButton from "./buttons/RegisterButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { findByLabelText } from "@testing-library/react";

{
  /* Connects to another test API unsplash, not the TERN API as yet, need to change over*/
}
function Search() {
  const [term, setPhoto] = useState("");
  const [clientId, setClientId] = useState(
    "52d5d5565994d57c3160b4296aef1be1bf8985d9265e313f0f9db7eb1145d86d"
  );

  const [result, setResult] = useState([]);

  function handleChange(event) {
    setPhoto(event.target.value);
  }

  function handleSubmit(event) {
    console.log(term);

    const url =
      "https://api.unsplash.com/search/photos?page=2&per_page=15&query=" +
      term +
      "&client_id=" +
      clientId;

    axios.get(url).then((response) => {
      console.log(response);
      setResult(response.data.results);
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
        <Navbar
       
          bg="white"
      
          style={{ borderBottom: "1.5px solid #6EB3A6" }}
        >
          <Navbar.Toggle />
         
        
              <div className="ternlogo">          
                  <Link to="/">
                    <Image src="img/logo@3x.png" alt="tern logo" width="300px" />
                  </Link>        
              </div>


              
              <Col xl={9} style={{ display: 'flex' , justifyContent: 'space-around', alignItems: 'center'}}>
               <div className="biologo">
                <h3
              style={{           
                    color: "#6EB3A6",
                    marginTop: "5%",
                  }}
                >
                  <Image
                    className="icon"
                    src="/img/icons/bioimages-download.svg"
                    style={{
                      marginBottom: "3%",
                      height: "35px",
                      marginTop: "0%",
                      
                    }}
                  />
                  Bioimages
                </h3>
                </div>

                {/*Search Input */}
                <div className="search">
                <InputGroup
                  inline="true"
                  className="searchbar"
                  style={{
                    height: "65px",
                    width: "455px",
                    paddingLeft: "2%",

                    // position: "absolute",
                    // right: "28%",
                    // top: "19%",
                  }}
                >
                  <Image
                    fluid
                    src="/img/icons/search-bioimages-icon.svg"
                    alt="bioimages search icon"
                    style={{
                      width: "8%",
                      paddingTop: "2%",

                    }}
                  />
                  <FormControl
                    onChange={handleChange}
                    id="place"
                    type="text"
                    placeholder="Search images by region or by site"
                    style={{
                      fontSize: "20px",
                      color: "#00565D",
                      marginTop: "17px",
                    }}
                    aria-label="term"
                  />
                  <Button
                    className="searchbutton"
                    onClick={handleSubmit}
                    variant="outline"
                    type="submit"
                    style={{
                      height: "33px",
                      width: "33px",
                      marginTop: "3.7%",
                      marginRight: "20px",
                     borderRadius: "50px",

                    }}
                  ></Button>
                </InputGroup>
                </div>

                {/*End of Search Input */}

                   {/*Login Buttons */}
              <div className="login">
              <Link to="/login" 
              style={{            
                    // position: "absolute",
                    // right: "24.2%",
                    // top: "33%"
                  }}>
                {" "}
                <LoginButton />{" "}
              </Link>

              <Link to="/login" 
              style={{    
                // position: "absolute",
                // right: "18.9%",
                // top: "33%" 
              }}>
                {" "}
                <RegisterButton />{" "}
              </Link>
              </div>
              </Col>
  
 


       
        </Navbar>


        <Switch>
          <Route
            path="/login"
            component={() => {
              window.location.href =
                "https://auth-test.tern.org.au/auth/realms/tern/protocol/openid-connect/auth?client_id=account&redirect_uri=https%3A%2F%2Fauth-test.tern.org.au%2Fauth%2Frealms%2Ftern%2Faccount%2Flogin-redirect&state=0%2F8b80b485-2114-431c-b92a-1a27748ee396&response_type=code&scope=openid";
              return null;
            }}
          />
        </Switch>
    
    </Router>
  );
}

export default Search;