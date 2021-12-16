import React, { Component } from "react";
import web3 from "../web3";
import lottery from "../lottery";

class EnterForm extends Component {
  state = {
    message: "",
    value: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Please Wait! Your transaction is processing...",
    });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({
      message: "You have successfully entered the lottery. All the best!",
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <hr />
        <h4>Wanna try your luck?</h4>
        <p>Enter amount of Ether to Enter: </p>
        <input
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button>Enter</button>
        <hr />
        <h2>{this.state.message}</h2>
      </form>
    );
  }
}

export default EnterForm;
