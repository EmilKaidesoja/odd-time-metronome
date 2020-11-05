import './css/App.css';
import { Component } from "react"
import Metronome from "./components/Metronome"
import Configuration from "./components/Configuration"

class App extends Component {

  render() {
    return (
      <div className="app-container">
        <h2>Metronome</h2>
        <Metronome />
        <Configuration />
      </div>
    );
  }
}

export default App;
