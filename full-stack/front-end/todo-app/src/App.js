import React, { Component } from 'react';
import FirstComponent from './components/learning-examples/FirstComponent';
import SecondComponent from './components/learning-examples/SecondComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp'
import logo from './logo.svg';
import './App.css';
import './bootstrap.css'
 
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter/>*/}
        <TodoApp/>
      </div>
    );
  }
}

class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        Hello
        <FirstComponent/>
        <SecondComponent/>
        <ThirdComponent/>
      </div>
    );
  }
}



export default App;
