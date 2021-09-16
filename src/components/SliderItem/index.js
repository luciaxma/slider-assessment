import "./Styles.css";

const SliderItem = (props) => {
  const { item } = props;

  const image = require(`../../assets/images/${item.img_src}`).default;

  return (
    <div className="sliderItem__container">
      <div className="sliderItem__card">
        <div className="sliderItem__img-container">
          <img className="sliderItem__img" src={image} />
        </div>
        <div className="sliderItem__info-container">
          <div className="sliderItem__info-container--top">
            <h2 className="sliderItem__info-text--title">{item.title}</h2>
            <div className="sliderItem__info-text--description">{item.description}</div>
          </div>
          <div className="sliderItem__info-container--link">
            <a className="sliderItem__info-text--link" href="#">READ MORE</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderItem;