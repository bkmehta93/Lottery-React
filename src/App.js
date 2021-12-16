import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";
import EnterForm from "./components/EnterForm";
import PickWinner from "./components/PickWinner";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    accounts: "",
  };
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance, accounts });
  }
  render() {
    return (
      <div className="App">
        <h2>Lottery Contract</h2>
        <p>This contract is managed by: {this.state.manager}</p>
        <p>
          {" "}
          Total {this.state.players.length} players have entered the lottery!
          Total pot: {web3.utils.fromWei(this.state.balance, "ether")} Eth
        </p>
        <EnterForm />
        {this.state.manager !== this.state.accounts[0] ? null : <PickWinner />}
      </div>
    );
  }
}
export default App;
