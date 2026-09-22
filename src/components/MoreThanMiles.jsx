const MILES_ITEMS = [
  {
    img: "/assets/images/services/Airport Rental_Webp.webp",
    title: "Airport Rentals",
    delay: 200,
  },
  {
    img: "/assets/images/services/family_trips.webp",
    title: "Family Trips",
    delay: 300,
  },
  {
    img: "/assets/images/services/Group Tour_Webp.webp",
    title: "Long Tours",
    delay: 400,
  },
];

function MoreThanMiles() {
  return (
    <section className="people-together-wrapper section-padding">
      <div className="container">
        <div className="miles-header-row">
          <div className="section-header" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
            <h2>
              More Than Miles &mdash; <br />
              We Bring People Together
            </h2>
          </div>
        </div>

        <div className="section-content section-margin-mt-50">
          <div className="miles-cards-row">
            {MILES_ITEMS.map((item) => (
              <div key={item.title} className="miles-card-col">
                <div
                  className="people-together-box"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={item.delay}
                >
                  <img src={item.img} alt={item.title} className="rounded-4 object-fit-cover" />
                  <div className="people-together-text">
                    <h4 className="text-white">{item.title}</h4>
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

export default MoreThanMiles;
