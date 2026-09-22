import { useRef } from "react";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Our journey was seamless and enjoyable from start to finish. The booking process was straightforward, and the staff were incredibly attentive, ensuring we felt comfortable throughout the trip.",
    name: "Sadia Rahman",
    role: "Travelling to Cox's Bazar",
  },
  {
    text: "Booked an airport pick-up for my parents and everything was on time. The driver was courteous and helped with the luggage. Highly recommended for families.",
    name: "Tanvir Hasan",
    role: "Airport Rental",
  },
  {
    text: "The fare bidding feature is a game changer. I chose a driver with great reviews at a price that suited my budget. Best intercity experience so far.",
    name: "Nusrat Jahan",
    role: "Intercity Trip",
  },
  {
    text: "Hourly rental made our city errands so easy. Clean car, professional driver, and transparent pricing. Will use Garibook again.",
    name: "Rafiul Islam",
    role: "Hourly Rental",
  },
];

function TestimonialSection() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector(".passenger-slide");
    const step = slide ? slide.offsetWidth + 16 : 400;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="passenger-speak-wrapper testimonial-wrapper section-padding bg-light-gray-gb">
      <div className="container">
        <div className="testimonial-header">
          <div className="section-header testimonial-header-text">
            <h2>Our Passengers Speak For Us</h2>
            <p>
              Our journey was seamless and enjoyable from start to finish. The
              booking process was straightforward, and the staff were
              incredibly attentive, ensuring we felt comfortable throughout the
              trip.
            </p>
          </div>
          <div className="customer_style_wrap mt-3 mt-lg-0">
            <button type="button" className="custom-slider-arrow" aria-label="Previous" onClick={() => scroll(-1)}>
              <ArrowLeft size={18} />
            </button>
            <button type="button" className="custom-slider-arrow" aria-label="Next" onClick={() => scroll(1)}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="section-content section-margin-mt-50">
          <div className="passenger-slider-wrap">
            <div className="passenger-track" ref={trackRef}>
              {TESTIMONIALS.map((t) => (
                <div className="passenger-slide" key={t.name}>
                  <div className="passenger-card">
                    <div className="passenger-card-top">
                      <Quote size={28} className="quote-icon" />
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={16} className="star" />
                        ))}
                      </div>
                    </div>
                    <p className="passenger-text">{t.text}</p>
                    <div className="passenger-person">
                      <div className="avatar">{t.name.charAt(0)}</div>
                      <div>
                        <h6>{t.name}</h6>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
