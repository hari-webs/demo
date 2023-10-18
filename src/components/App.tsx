import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import { Carousel } from "antd";
import Slider from "react-slick";
import placeHolderImage from "../img/image.png";
import placeholerLogo from "../img/BrandInsight.svg";
import placeholderLogo2 from "../img/logo.svg";
import Arrow from "../img/arrow.png";

function App() {
  const [contentData, setContentData] = useState<any>({});
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const settings = {
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    className: "center",
    centerMode: true,
    variableWidth: true,
    prevArrow: (
      <div className="arrowNext">
        <img src={Arrow} />
      </div>
    ),
    nextArrow: (
      <div className="arrowNext">
        <img src={Arrow} />
      </div>
    ),
  };
  const getData = () => {
    fetch("./ila-json.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson?.data?.allIlaLandingPages[5]);
        setContentData(myJson?.data?.allIlaLandingPages[5]);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  type Props = {
    textTitle: "";
  };

  const SliderComponents = (props: any) => {
    return (
      <>
        <img src={props.logoUrl} className="absolute-logo" />
        <div className="bg-overlay">
          <img src={placeHolderImage} />
        </div>
        <div className="content-bottom">
          <p>{props.textTitle}</p>
          <div className="divider"></div>
          <div className="learnMore">
            <div className="slot">{props.timeSlot}</div>
            <div className="linkText">
              <a href="">
                Learn More <span className="learMoreButton">→</span>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="App container">
      <h1 className="font-h1">Leadership Programs</h1>
      <h2 className="font-h2 mb-30">CRAFTED By sadhguru</h2>
      {isMobile ? (
        // Place this components inside map function for mobile view
        <div className="carousle-placeholder mobile-holder">
          <SliderComponents
            timeSlot="04 Nov 2023"
            logoUrl={placeholderLogo2}
            textTitle="Enhance your ability to “see” and explore the science of scaling up your business through real-life case studies of leaders."
          />
        </div>
      ) : (
        <div className="custom-carousel">
          <Slider {...settings}>
            <div className="carousle-placeholder">
              <SliderComponents
                timeSlot="04 Nov 2023"
                logoUrl={placeholderLogo2}
                textTitle="Enhance your ability to “see” and explore the science of scaling up your business through real-life case studies of leaders."
              />
            </div>
            <div className="carousle-placeholder">
              <SliderComponents
                timeSlot="03 Nov 2023"
                logoUrl={placeholerLogo}
                textTitle="Enhance your ability to “see” and explore the science of scaling up your business through real-life case studies of leaders."
              />
            </div>
            <div className="carousle-placeholder">
              <SliderComponents
                timeSlot="02 Nov 2023"
                logoUrl={placeholderLogo2}
                textTitle="Enhance your ability to “see” and explore the science of scaling up your business through real-life case studies of leaders."
              />
            </div>
            <div className="carousle-placeholder">
              <SliderComponents
                timeSlot="01 Nov 2023"
                logoUrl={placeholerLogo}
                textTitle="Enhance your ability to “see” and explore the science of scaling up your business through real-life case studies of leaders."
              />
            </div>
          </Slider>
        </div>
      )}
    </div>
  );
}

export default App;
