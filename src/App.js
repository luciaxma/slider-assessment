import React from "react";

import "./App.css";
import Slider from "./components/Slider";
import data from "./assets/data";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: data
    };
  }

  /**
   * For mobile and tablets, show 1 slide
   * For desktops, show 3 slides
   */
  detectDevice = () => {
    return window.innerWidth <= 992 ? 1 : 3;
  }

  render () {
    const { data } = this.state;

    return (
      <div className="container">
        <Slider
          data={data}
          show={this.detectDevice()}
        />
      </div>
    );
  }
}

export default App;
