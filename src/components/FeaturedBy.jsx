import { ArrowLeft, ArrowRight } from "lucide-react";

const PLATFORMS = [
  { name: "The Daily Star", tag: "NEWS" },
  { name: "Prothom Alo", tag: "NEWS" },
  { name: "The Business Standard", tag: "BUSINESS" },
  { name: "Dhaka Tribune", tag: "NEWS" },
  { name: "The Financial Express", tag: "FINANCE" },
];

function FeaturedBy() {
  return (
    <section className="passenger-speak-wrapper featured-wrapper section-margin-mb-70" data-aos="fade-up" data-aos-duration="600" data-aos-delay="50">
      <div className="container">
        <div className="featured-header">
          <div className="section-header">
            <h2>We Featured by Top news Platforms</h2>
          </div>
          <div className="customer_style_wrap">
            <button type="button" className="custom-slider-arrow" aria-label="Previous" disabled>
              <ArrowLeft size={18} />
            </button>
            <button type="button" className="custom-slider-arrow" aria-label="Next">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="section-content section-margin-mt-50">
          <div className="newsroom-slider-wrap">
            <div className="embla">
              <div className="embla__container">
                {PLATFORMS.map((p) => (
                  <div className="embla__slide" key={p.name}>
                    <div className="newsroom-card">
                      <span className="newsroom-tag">{p.tag}</span>
                      <h4>{p.name}</h4>
                      <p>Featured Garibook as a rising star in Bangladesh&rsquo;s mobility space.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBy;
