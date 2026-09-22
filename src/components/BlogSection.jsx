import Btn from "./Btn";

const BLOGS = [
  {
    img: "/assets/images/blog/blog1.svg",
    date: "Sep 12, 2026",
    title: "5 Scenic Road Trips from Dhaka You Should Take This Winter",
  },
  {
    img: "/assets/images/blog/blog2.svg",
    date: "Sep 05, 2026",
    title: "How Fare Bidding Works: Getting the Best Price for Your Ride",
  },
  {
    img: "/assets/images/blog/blog3.svg",
    date: "Aug 28, 2026",
    title: "Airport Pick-up and Drop: A Stress-Free Guide for Travellers",
  },
];

function BlogSection() {
  return (
    <section className="blog-section-wrapper section-padding" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
      <div className="container">
        <div className="blog-header">
          <div className="section-header blog-header-text">
            <h2>Beyond Destinations</h2>
            <p>
              Discover travel hacks, guides, and inspirations for your next
              intercity trip with Garibook.
            </p>
          </div>
          <div>
            <Btn
              className="blog-show-all fw-bold fs-5"
              value="Show All Blogs"
              url="#blogs"
            />
          </div>
        </div>

        <div className="section-content section-margin-mt-50">
          <div className="blog-grid">
            {BLOGS.map((b) => (
              <a href="#blogs" className="blog-card" key={b.title}>
                <div className="blog-card-img">
                  <img src={b.img} alt={b.title} />
                </div>
                <div className="blog-card-body">
                  <span className="blog-date">{b.date}</span>
                  <h4>{b.title}</h4>
                  <span className="blog-read-more">Read More &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
