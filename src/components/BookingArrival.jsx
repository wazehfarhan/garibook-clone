import Btn from "./Btn";

const ARRIVAL_IMAGES = [
  { src: "/assets/images/services/explore.jpeg", col: "col-8", delay: 100 },
  { src: "/assets/images/services/freedom.jpg", col: "col-top4", delay: 200 },
  { src: "/assets/images/services/safe_travel.png", col: "col-4", delay: 300 },
  { src: "/assets/images/services/prefarred_car.jpg", col: "col-4", delay: 400 },
  { src: "/assets/images/services/smooth.jpg", col: "col-4", delay: 500 },
];

function BookingArrival() {
  return (
    <section className="booking-arrival-wrapper section-padding bg-black">
      <div className="container">
        <div className="booking-arrival-header">
          <div className="section-header">
            <h2 className="text-white" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
              From Booking to Arrival &nbsp; &nbsp; It&rsquo;s All in Your Hands
            </h2>
          </div>
          <div data-aos="flip-right" data-aos-duration="600" data-aos-delay="400" className="ba-btn-col">
            <Btn className="theme-primary-btn" url="https://onelink.to/gbweb" />
          </div>
        </div>

        <div className="section-content section-margin-mt-50">
          <div className="booking-arrival-grid">
            {ARRIVAL_IMAGES.map((img) => (
              <div
                key={img.src}
                className={`ba-grid-item ${img.col}`}
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={img.delay}
              >
                <div className="booking-arrival-inner-image">
                  <img src={img.src} alt="" className="rounded-top-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingArrival;
