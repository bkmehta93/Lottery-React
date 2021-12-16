import React, { Component } from "react";
import web3 from "../web3";
import lottery from "../lottery";

class PickWinner extends Component {
    state = {
        message: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({message: 'Picking a winner. Please Wait...'});
        await lottery.methods.pickWinner().send({
            from: accounts[0],
        });
        this.setState({message: 'A winner has been picked!'});

    };

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <h4>Ready to pick a winner?</h4>
                <button>Pick Winner</button>
                <h3>{this.state.message}</h3>
            </form>
        );
    }
}

export default PickWinner;