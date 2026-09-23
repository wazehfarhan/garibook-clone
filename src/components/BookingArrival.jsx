import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Btn from "./Btn";

gsap.registerPlugin(ScrollTrigger);

const ARRIVAL_IMAGES = [
  { src: `${import.meta.env.BASE_URL}assets/images/services/explore.jpeg`, col: "col-8" },
  { src: `${import.meta.env.BASE_URL}assets/images/services/freedom.jpg`, col: "col-top4" },
  { src: `${import.meta.env.BASE_URL}assets/images/services/safe_travel.png`, col: "col-4" },
  { src: `${import.meta.env.BASE_URL}assets/images/services/prefarred_car.jpg`, col: "col-4" },
  { src: `${import.meta.env.BASE_URL}assets/images/services/smooth.jpg`, col: "col-4" },
];

function BookingArrival() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  /* GSAP animation #3 — booking-to-arrival gallery scroll reveal.
   * Grid tiles scale + fade in with a stagger as the gallery scrolls into
   * view. GSAP owns this reveal (no data-aos on the same nodes — AOS and
   * GSAP fighting over opacity/transform on one element is what left the
   * pictures stuck invisible). Scoped to real DOM nodes via refs, plays
   * once, and clears inline props afterwards so nothing stays at opacity 0.
   */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const items = Array.from(grid.querySelectorAll(".ba-grid-item"));
    if (!items.length) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(items, {
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          once: true,
        },
        onComplete: () => gsap.set(items, { clearProps: "opacity,transform" }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="booking-arrival-wrapper section-padding bg-black" ref={sectionRef}>
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
          <div className="booking-arrival-grid" ref={gridRef}>
            {ARRIVAL_IMAGES.map((img) => (
              <div key={img.src} className={`ba-grid-item ${img.col}`}>
                <div className="booking-arrival-inner-image">
                  <img
                    src={img.src}
                    alt="Garibook travel experience"
                    className="rounded-top-3"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.closest(".ba-grid-item")?.remove();
                    }}
                  />
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
