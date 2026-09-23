import Btn from "./Btn";

const BLOGS = [
  {
    img: `${import.meta.env.BASE_URL}assets/images/blog/6aabc714e2a79.webp`,
    date: "Sep 12, 2026",
    title: "রাইড শেয়ারিংয়ে বদলে যাচ্ছে বাংলাদেশের শহুরে পরিবহন ব্যবস্থা",
  },
  {
    img: `${import.meta.env.BASE_URL}assets/images/blog/260920175045_g3UDrxr4bz.webp`,
    date: "Sep 05, 2026",
    title: "সিলেটের দর্শনীয় স্থান সমূহ, খাবার ও থাকার ব্যবস্থা",
  },
  {
    img: `${import.meta.env.BASE_URL}assets/images/blog/260920175752_kbpbDIIOGX.webp`,
    date: "Aug 28, 2026",
    title: "নওগাঁর দর্শনীয় স্থান সমূহ, খাবার ও থাকার ব্যবস্থা",
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
