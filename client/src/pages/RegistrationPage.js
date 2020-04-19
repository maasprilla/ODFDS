import React, { Component } from "react";
import CustomButtons from "../components/CustomButtons";
import { Link } from "react-router-dom";
import "./TempCSS.css";

class Registration extends Component {
  state = {
    step: 1,
    type: "",
    name: "",
    email: "",
    password: "",
    businessName: "",
    address: "",
    driversLicense: "",
    vehicle: "",
  };

  handleChooseType = (e) => {
    console.log(e.target.value);
    this.setState({ type: e.target.value, step: 2 });
  };

  handleGoBack = (e) => {
    this.setState({
      step: 1,
      name: "",
      email: "",
      password: "",
      businessName: "",
      address: "",
      driversLicense: "",
      vehicle: "",
    });
  };

  handleSignUp = (e) => {
    if (this.state.type === "business") {
      if (
        !this.state.name ||
        !this.state.email ||
        !this.state.password ||
        !this.state.businessName ||
        !this.state.address
      ) {
        alert("Please fill out the entire form");
        e.preventDefault();
        return;
      } else {
        fetch("http://localhost:5000/api/users/registration", {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: this.state.type,
            name: this.state.name,
            email: this.state.email.toLowerCase(),
            password: this.state.password,
            businessName: this.state.businessName,
            address: this.state.address,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.user) {
              console.log(res.user);
            } else {
              alert(res.error);
            }
          });
      }
    } else {
      if (
        !this.state.name ||
        !this.state.email ||
        !this.state.password ||
        !this.state.driversLicense ||
        !this.state.vehicle
      ) {
        alert("Please fill out the entire form");
        e.preventDefault();
        return;
      } else {
        fetch("http://localhost:5000/api/users/registration", {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: this.state.type,
            name: this.state.name,
            email: this.state.email.toLowerCase(),
            password: this.state.password,
            driversLicense: this.state.driversLicense,
            vehicle: this.state.vehicle,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.user) {
              console.log(res.user);
            } else {
              alert(res.error);
            }
          });
      }
    }
    e.preventDefault();
  };

  renderForm = () => {
    //Form for business
    if (this.state.type === "business") {
      return (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 30,
            color: "#4E4E4E",
          }}
        >
          <div className="registrationInput">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              placeholder="Name"
            />
          </div>
          <div className="registrationInput">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              placeholder="Email"
            />
          </div>
          <div className="registrationInput">
            <label>Password</label>
            <input
              type="password"
              name="businessName"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
            />
          </div>
          <div className="registrationInput">
            <label>Business Name</label>
            <input
              type="text"
              name="businessName"
              onChange={(e) => {
                this.setState({ businessName: e.target.value });
              }}
              placeholder="Business Name"
            />
          </div>
          <div className="registrationInput">
            <label>Address</label>
            <input
              type="text"
              name="address"
              onChange={(e) => {
                this.setState({ address: e.target.value });
              }}
              placeholder="Address"
            />
          </div>
          <div className="registrationInput">
            <CustomButtons
              text="Sign Up"
              color="#DB3979"
              width="100%"
              fontSize="30px"
              onClick={this.handleSignUp}
            />
          </div>
        </form>
      );
    }
    //Form for drivers
    else {
      return (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 30,
            color: "#4E4E4E",
          }}
        >
          <div className="registrationInput">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              placeholder="Name"
            />
          </div>
          <div className="registrationInput">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              placeholder="Email"
            />
          </div>
          <div className="registrationInput">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
            />
          </div>
          <div className="registrationInput">
            <label>Driver's License</label>
            <input
              type="text"
              name="driversLicense"
              onChange={(e) => {
                this.setState({ driversLicense: e.target.value });
              }}
              placeholder="Driver's License"
            />
          </div>
          <div className="registrationInput">
            <label>Car Type (Make and Model)</label>
            <input
              type="text"
              name="car"
              onChange={(e) => {
                this.setState({ vehicle: e.target.value });
              }}
              placeholder="Car Type"
            />
          </div>

          <div className="registrationInput">
            <CustomButtons
              text="Sign Up"
              color="#DB3979"
              width="100%"
              fontSize="30px"
              onClick={this.handleSignUp}
            />
          </div>
        </form>
      );
    }
  };

  render() {
    //Step 1 /2 of registration
    if (this.state.step === 1) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            // justifyContent: "",
            // backgroundColor: "blue"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#4E4E4E",
              // backgroundColor: "pink"
            }}
          >
            <h1 style={{ fontSize: window.innerWidth * 0.04 }}>Step 1/2</h1>
            <h2 style={{ fontSize: window.innerWidth * 0.02 }}>
              Are you a business or a driver?
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              // backgroundColor: "red"
            }}
          >
            <CustomButtons
              text="business"
              value="business"
              color="#DB3979"
              width="40%"
              fontSize="30px"
              onClick={this.handleChooseType}
            />
            <CustomButtons
              text="driver"
              value="driver"
              color="#DB3979"
              width="40%"
              fontSize="30px"
              onClick={this.handleChooseType}
            />
          </div>
          <Link to="/">
            <div
              style={{ position: "absolute", left: 10, bottom: 10, width: 200 }}
            >
              <CustomButtons
                text="<"
                color="#4E4E4E"
                width="50%"
                fontSize="30px"
              />
            </div>
          </Link>
        </div>
      );
    }
    //Step 2
    else {
      let registrationText = "";
      if (this.state.type === "business") {
        registrationText =
          "Hello! We're so glad to see you're interested in our service. Let's collect some information to get started.";
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              // justifyContent: "",
              // backgroundColor: "blue"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#4E4E4E",
                // backgroundColor: "pink"
              }}
            >
              <h1 style={{ fontSize: window.innerWidth * 0.04 }}>Step 2/2</h1>
              <h2 style={{ fontSize: window.innerWidth * 0.02 }}>
                {registrationText}
              </h2>
            </div>
            <div>{this.renderForm()}</div>
            <div
              style={{ position: "absolute", left: 10, bottom: 10, width: 200 }}
            >
              <CustomButtons
                text="<"
                color="#4E4E4E"
                width="50%"
                fontSize="30px"
                onClick={this.handleGoBack}
              />
            </div>
          </div>
        );
      } else {
        registrationText =
          "Hello! Thank you for your interest in driving for us. Let's collect some information to get started.";
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              // justifyContent: "",
              // backgroundColor: "blue"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#4E4E4E",
                // backgroundColor: "pink"
              }}
            >
              <h1 style={{ fontSize: window.innerWidth * 0.04 }}>Step 2/2</h1>
              <h2 style={{ fontSize: window.innerWidth * 0.02 }}>
                {registrationText}
              </h2>
            </div>
            <div>{this.renderForm()}</div>
            <div
              style={{ position: "absolute", left: 10, bottom: 10, width: 200 }}
            >
              <CustomButtons
                text="<"
                color="#4E4E4E"
                width="50%"
                fontSize="30px"
                onClick={this.handleGoBack}
              />
            </div>
          </div>
        );
      }
      // return <div>{form}</div>;
    }
  }
}

export default Registration;
