import React, {Component} from 'react';
import './Counter.css'


class Counter extends Component {
    //define the initial state: counter = 0
    constructor(){
        super(); // most common error got without this
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }
    //GUI
    render(){
        return (
          <div className="Counter">
            <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <span className='count'>{this.state.counter}</span>
            <div><button className='reset' onClick={this.reset}>Reset</button></div>
          </div>
        );
    }
    reset(){
        this.setState({counter : 0})
    }
    //update state: counter++
    increment(by){
        this.setState(
            (prevState) => {
                return {counter : prevState.counter + by}
            }
        )
    }
    //update state: counter--
    decrement(by){
        this.setState(
            (prevState) => {
                return {counter : prevState.counter - by}
            }
        )
    }
}

class CounterButton extends Component {
    render(){
        return (
            <div className="CounterButton">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
                {/*comment out this code: <span className='count'>{this.state.counter}</span>*/}
            </div>
        );
    }
}

export default Counter