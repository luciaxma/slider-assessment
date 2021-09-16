import React from "react";

import "./Styles.css";
import { getDataWithClones } from "../../utils";
import SliderItem from "../SliderItem";

class Slider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentIndex: 0,
      length: 0,
      data: props.data,
      dataWithClones: [],
      show: props.show,
      transitionEnabled: true
    };
  }

  componentDidMount () {
    const { data, show } = this.state;

    // Render array with clones and original data
    const result = getDataWithClones({ data, show });

    this.setState({
      dataWithClones: result.dataWithClones,
      currentIndex: result.currentIndex,
      length: result.length
    })
  }

  renderSliderItem = () => {
    const { dataWithClones, show } = this.state;

    return dataWithClones.map(item => (
      <SliderItem
        item={item}
        key={item.id}
        show={show}
      />
    ))
  }

  handlePrev = () => {
    const { currentIndex, show } = this.state;

    if (currentIndex > 0) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - show
      }));
    }

    // Condition for if on desktop and index is 0
    if (show === 3 && currentIndex === 0) {
      this.setState({ currentIndex: 12, transitionEnabled: true });
    }

    // Same condition for mobile and desktop
    // If the current item is not the clone with this index, then enable transition again
    if (currentIndex !== 0) {
      this.setState({ transitionEnabled: true });
    }
  };

  handleNext = () => {
    const { currentIndex, length, show } = this.state;

    if (currentIndex < (length - 1)) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + show
      }));
    }

    // Condition for if on desktop and index is bigger than length
    if (show === 3 && ((currentIndex + show) >= length)) {
      this.setState({
        currentIndex: length - currentIndex,
        transitionEnabled: true
      });
    }

    // Mobile
    if (show === 1) {
      // If the current item is not the clone of the last item, then enable transition again
      if (currentIndex !== length) {
        this.setState({ transitionEnabled: true });
      }
    }

    // Condition for if on desktop
    else if (show === 3 && currentIndex !== 15) {
      this.setState({ transitionEnabled: true });
    }
  };

  toggleTransition = () => {
    const { currentIndex, show } = this.state;

    // Mobile
    if (show === 1) {
      // If current item is the last item i.e. a clone, set index to where the actual first item is
      if (currentIndex === 6) {
        this.setState({ currentIndex: 1 });
      }
      // If current item is the first item i.e. a clone, set index to where the actual last item is
      else if (currentIndex === 0) {
        this.setState({ currentIndex: 5 });
      }

      // Disable transition temporarily when switching from clone to the actual item
      this.setState({ transitionEnabled: false });
    }

    // Desktop
    else if (show === 3) {
      if (currentIndex === 15) {
        this.setState({ currentIndex: 0 });
      } else if (currentIndex === 0) {
        this.setState({ currentIndex: 15 });
      }

      this.setState({ transitionEnabled: false });
    }
  }

  render () {
    const { currentIndex, show, transitionEnabled } = this.state;

    return (
      <div className="slider__container">
        <button
          className="slider__button slider__button-left"
          type="button"
          onClick={this.handlePrev}
        >
          <span className="material-icons">
            keyboard_arrow_left
          </span>
        </button>

        <div className="slider__content-wrapper">
          <div
            className="slider__content"
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
              transition: transitionEnabled ? 'all 250ms linear' : undefined,
            }}
            onTransitionEnd={this.toggleTransition}
          >
            {this.renderSliderItem()}
          </div>
        </div>

        <button
          className="slider__button slider__button-right"
          type="button"
          onClick={this.handleNext}
        >
          <span className="material-icons">
            keyboard_arrow_right
          </span>
        </button>
      </div>
    );
  }
}

export default Slider;