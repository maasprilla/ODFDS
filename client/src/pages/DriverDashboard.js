import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../components/NavBar";
import DriverDash from "../components/DriverDash";

class DriverDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "driver",
      orders: [],
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    fetch("http://localhost:5000/api/drivers/myorders/" + this.props.user._id)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({ orders: res });
      });
  }

  handleAccept = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 20,
          color: "#4E4E4E",
        }}
      >
        <Navbar type={this.state.type} />

        {this.state.orders.map((item) => (
          <div key={item._id}>
            <center>
              <DriverDash order={item} onAccept={this.handleAccept} />
            </center>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DriverDashboard);
