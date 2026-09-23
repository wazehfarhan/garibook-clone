const FREEDOM_ITEMS = [
  {
    icon: `${import.meta.env.BASE_URL}assets/images/icon_car.svg`,
    title: "Choose the Car",
    text: "Pick what suits your comfort.",
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/images/icon_driver.svg`,
    title: "Choose the Driver",
    text: "Based on ratings and reviews.",
  },
  {
    icon: `${import.meta.env.BASE_URL}assets/images/icon_fare.svg`,
    title: "Choose the Fare",
    text: "Select the bid that fits your budget.",
  },
];

function FreedomSection() {
  return (
    <section className="freedom-wrapper section-padding bg-black">
      <div className="container">
        <div className="freedom-header-row">
          <div className="section-header" data-aos="fade-up" data-aos-duration="400" data-aos-delay="200">
            <h2 className="text-white">Freedom in Every Journey</h2>
          </div>
        </div>

        <div className="section-content section-margin-mt-50">
          <div className="freedom-inner-image" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="200">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/garibook_freedom.webp`}
              alt="Freedom in every journey"
              className="rounded-top-3"
            />
          </div>

          <div className="freedom-items-row">
            {FREEDOM_ITEMS.map((item, i) => (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={200 + i * 200}
                className="freedom-item-col"
              >
                <div className="layout-two-box-item">
                  <img src={item.icon} alt="" />
                  <div className="ltbt-text mt-4">
                    <h5 className="text-white">{item.title}</h5>
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreedomSection;
