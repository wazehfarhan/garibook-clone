import { useState } from "react";
import Btn from "./Btn";

const RIDE_CARDS = [
  {
    img: "/assets/images/cars/intercity_car_rental.svg",
    title: "Intercity Car Rental",
    text: "Travel between cities with comfort and confidence.",
  },
  {
    img: "/assets/images/cars/rideshare.svg",
    title: "Ride share",
    text: "Go anywhere in the city, quickly and easily.",
  },
  {
    img: "/assets/images/cars/airport_rental.svg",
    title: "Airport Rental",
    text: "Whether you\u2019re flying abroad or returning home, enjoy a comfortable and worry-free airport journey.",
  },
  {
    img: "/assets/images/cars/hourly_rental.svg",
    title: "Hourly Rental",
    text: "Rent a car by the hour, tailored to your needs.",
  },
];

function SectionBtnRow({ btnClass = "theme-primary-btn", value = "Learn More" }) {
  return (
    <Btn className={btnClass} value={value} url="#learn-more" />
  );
}

function Services() {
  const [tab, setTab] = useState("rides");

  const tabs = [
    { key: "rides", label: "Rides" },
    { key: "business", label: "Garibook Business" },
    { key: "club", label: "Garibook Club" },
    { key: "vms", label: "VMS" },
  ];

  const splitPanes = [
    {
      key: "business",
      title: "Garibook Business",
      text: "Simplify your corporate transportation, ensure on-time team mobility, and gain control with our VMS.",
      img: "/assets/images/busines.jpeg",
    },
    {
      key: "club",
      title: "Turn Your Car into Earnings with Garibook Club",
      text: "Garibook Club is more than just a community. Join a vibrant network of car enthusiasts, and turn your car into a source of earnings.",
      img: "/assets/images/garibook_club.jpg",
    },
    {
      key: "vms",
      title: "Vehicle Management System - VMS",
      text: "Just like Garibook Business makes traveling easy for your team, our Vehicle Management System makes managing your fleet easy for you.",
      img: "/assets/images/Frame_1000001473.png",
    },
  ];

  /*
   * All 4 panes stay mounted and share ONE CSS grid cell (.services-panes
   * in services.css). The container height always equals the tallest pane
   * so switching tabs never changes the section height (no jump), and
   * there is never an empty frame (no flash). Only the entering pane
   * animates (pure-CSS keyframes, re-triggered by key={tab}).
   * (No lookup variable needed — panes map directly with hidden={...}.)
   */

  return (
    <section className="service-wrapper section-padding">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
          <h2>Our Services</h2>
        </div>

        <div className="service-tab-navs mt-4">
          <div className="nav nav-tabs" role="tablist" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                className={`nav-link ${tab === t.key ? "active" : ""}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="section-content section-margin-mt-50 services-panes"
          key={tab}
        >
          <div
            className="tab-pane-inner"
            role="tabpanel"
            aria-label="Rides"
            hidden={tab !== "rides"}
          >
            <div className="section-header mb-5">
              <h2>
                Every Ride <br /> One Platform
              </h2>
            </div>
            <div
              className="service-cards-row"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="200"
            >
              {RIDE_CARDS.map((card) => (
                <div key={card.title} className="service-card-col">
                  <div className="box-item-wrap-one">
                    <div className="box-iwo-img">
                      <img src={card.img} alt={card.title} className="mt-2" />
                    </div>
                    <div className="box-iwo-text mt-4">
                      <h5>{card.title}</h5>
                      <p className="mt-3">{card.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {splitPanes.map((pane) => (
            <div
              key={pane.key}
              className="tab-pane-inner service-split-pane"
              role="tabpanel"
              aria-label={pane.title}
              hidden={tab !== pane.key}
            >
              <div className="split-text">
                <h2>{pane.title}</h2>
                <p className="my-4">{pane.text}</p>
                <SectionBtnRow />
              </div>
              <div className="split-image">
                <img
                  src={pane.img}
                  alt={pane.title}
                  width="640"
                  height="640"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
