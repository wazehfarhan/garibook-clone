import Btn from "./Btn";

const FOOTER_WIDGETS = [
  {
    title: "garibook",
    links: [
      "About Us",
      "Customer Reviews",
      "Career",
      "Newsroom",
      "Garibook Map",
    ],
  },
  {
    title: "Services",
    links: [
      "Intercity Rental",
      "Airport Pick and Drop",
      "Hourly Rental",
      "Vehicle Management System (VMS)",
    ],
  },
  {
    title: "Become Our Partner",
    links: [
      "Become a Smart Driver",
      "Become a member of Garibook Club",
      "Garibook Business for Corporate Travel",
    ],
  },
];

const SOCIALS = ["facebook", "youtube", "instagram", "linkedin"];

function SocialIcon({ name }) {
  const paths = {
    facebook:
      "M27 12h-5V9c0-1.1.9-2 2-2h3V2h-5c-3.9 0-7 3.1-7 7v3h-4v6h4v16h6V18h4l2-6z",
    youtube:
      "M34 8c-1-3-3-3-9-3H11c-6 0-8 0-9 3S1 14 1 18s0 7 1 10 3 3 9 3h14c6 0 8 0 9-3s1-6 1-10 0-7-1-10zM15 24V12l11 6-11 6z",
    instagram:
      "M18 4c-4 0-4.5 0-6 .1-1.6.1-2.6.3-3.5.7-1 .4-1.8 1-2.6 1.7-.8.8-1.3 1.6-1.7 2.6-.4.9-.6 1.9-.7 3.5C3.5 14 3.5 14.5 3.5 18s0 4 .1 5.5c.1 1.6.3 2.6.7 3.5.4 1 1 1.8 1.7 2.6.8.8 1.6 1.3 2.6 1.7.9.4 1.9.6 3.5.7 1.5.1 2 .1 6 .1s4.5 0 6-.1c1.6-.1 2.6-.3 3.5-.7 1-.4 1.8-1 2.6-1.7.8-.8 1.3-1.6 1.7-2.6.4-.9.6-1.9.7-3.5.1-1.5.1-2 .1-5.5s0-4-.1-5.5c-.1-1.6-.3-2.6-.7-3.5-.4-1-1-1.8-1.7-2.6-.8-.8-1.6-1.3-2.6-1.7-.9-.4-1.9-.6-3.5-.7-1.5-.1-2-.1-6-.1zm0 3.2c4 0 4.4 0 6 .1 1.4.1 2.2.3 2.7.5.7.3 1.2.6 1.7 1.1.5.5.9 1 1.1 1.7.2.5.4 1.3.5 2.7.1 1.6.1 2 .1 6s0 4.4-.1 6c-.1 1.4-.3 2.2-.5 2.7-.3.7-.6 1.2-1.1 1.7-.5.5-1 .9-1.7 1.1-.5.2-1.3.4-2.7.5-1.6.1-2 .1-6 .1s-4.4 0-6-.1c-1.4-.1-2.2-.3-2.7-.5-.7-.3-1.2-.6-1.7-1.1-.5-.5-.9-1-1.1-1.7-.2-.5-.4-1.3-.5-2.7-.1-1.6-.1-2-.1-6s0-4.4.1-6c.1-1.4.3-2.2.5-2.7.3-.7.6-1.2 1.1-1.7.5-.5 1-.9 1.7-1.1.5-.2 1.3-.4 2.7-.5 1.6-.1 2-.1 6-.1zm0 5.4a5.4 5.4 0 100 10.8 5.4 5.4 0 000-10.8zm0 8.9a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm7-9.1a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6z",
    linkedin:
      "M6.5 4A2.5 2.5 0 104 6.5 2.5 2.5 0 006.5 4zM4.3 8.9h4.4V30H4.3zM13 8.9h4.2v2.9h.1a4.6 4.6 0 014.1-2.3c4.4 0 5.2 2.9 5.2 6.7V30h-4.4v-11c0-2.6-.1-6-3.6-6s-4.2 2.8-4.2 5.8V30H13z",
  };
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path fill="currentColor" d={paths[name]} />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="footer-wrapper bg-black">
      <div className="container">
        <div className="footer-wrap">
          <div className="footer-main">
            <div className="footer-main-wrap section-padding">
              <div className="footer-grid">
                <div className="footer-brand-col">
                  <a className="footer-logo" href={import.meta.env.BASE_URL}>
                    <img src={`${import.meta.env.BASE_URL}assets/images/logo-white.svg`} alt="Garibook" />
                  </a>
                  <div className="footer-socials">
                    {SOCIALS.map((s) => (
                      <a key={s} href={`#${s}`} aria-label={s} className="footer-social-link">
                        <SocialIcon name={s} />
                      </a>
                    ))}
                  </div>
                </div>

                {FOOTER_WIDGETS.map((w) => (
                  <div className="footer-widget" key={w.title}>
                    <h6 className="footer-widget-title mb-20">{w.title}</h6>
                    <ul className="footer-widget-list">
                      {w.links.map((l) => (
                        <li key={l}>
                          <a className="hover-style-link" href="#">
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="footer-widget">
                  <h6 className="footer-widget-title mb-20">Contacts</h6>
                  <ul className="footer-widget-list">
                    <li>
                      <a className="hover-style-link" href="mailto:support@garibook.com">
                        support@garibook.com
                      </a>
                    </li>
                    <li>
                      <a className="hover-style-link" href="tel:+8809678112233">
                        +88 09 678 11 22 33
                      </a>
                    </li>
                    <li>
                      <span className="footer-contact-address">
                        Police Plaza Concord Tower -01, 13th Floor, Plot-02, Road- 144, Gulshan, Dhaka-1212
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-app-download">
              <p className="footer-app-download-text">Download Our Garibook Mobile App</p>
              <Btn className="theme-warning-btn" url="https://onelink.to/gbweb" />
            </div>

            <div className="footer-partners">
              <div className="footer-partner">
                <h2 className="footer-title-one text-white">A Product By</h2>
                <h5>NRB Solution Ltd.</h5>
                <Btn className="theme-outline-btn" value="Visit Website" url="#" icon={false} />
              </div>
              <div className="footer-partner">
                <h2 className="footer-title-one text-white">Powered By</h2>
                <h5>Link 3 Technologies</h5>
                <Btn className="theme-outline-btn" value="Visit Website" url="#" icon={false} />
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Garibook.com</p>
            <div className="footer-bottom-links">
              <a className="hover-style-link" href="#">
                Terms &amp; Conditions
              </a>
              <a className="hover-style-link" href="#">
                Privacy Policy
              </a>
              <span className="footer-bottom-license">
                Trade license number: TRAD/DNCC/013806/2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
