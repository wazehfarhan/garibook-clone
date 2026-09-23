import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Btn from "./Btn";

gsap.registerPlugin(ScrollTrigger);

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
  const [stackHeight, setStackHeight] = useState(0);
  const sectionRef = useRef(null);
  const cardsRowRef = useRef(null);
  const stackRef = useRef(null);

  /*
   * Height lock for the tab area.
   * Every pane is always mounted and stacked in the same CSS grid cell
   * (see .tab-stack in services.css), so the section keeps ONE height while
   * switching tabs instead of jumping.
   *
   * The grid row is sized from the tallest pane we measure, because the
   * browser's own "max-content" estimate of these panes is unstable (they
   * contain percentage-width flex items and images), which is exactly what
   * made the section resize when a tab changed.
   */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;
    let mounted = false;

    const measure = () => {
      const panes = Array.from(stack.querySelectorAll(".tab-pane-inner"));
      if (!panes.length) return;

      // Temporarily reveal every pane at its natural height and measure it.
      const prevHidden = panes.map((p) => p.hidden);
      const prevAlign = panes.map((p) => p.style.alignSelf);
      const prevRows = stack.style.gridTemplateRows;
      stack.style.gridTemplateRows = "auto";
      panes.forEach((p) => {
        p.hidden = false;
        p.style.alignSelf = "start";
      });
      const tallest = Math.max(...panes.map((p) => p.offsetHeight));
      panes.forEach((p, i) => {
        p.hidden = prevHidden[i];
        p.style.alignSelf = prevAlign[i];
      });
      stack.style.gridTemplateRows = prevRows;

      setStackHeight((h) => (Math.abs(h - tallest) > 1 ? tallest : h));

      // Locking the height changes the page layout, so ScrollTrigger has to
      // recompute where the animations start.
      if (mounted) ScrollTrigger.refresh();
    };

    measure();
    mounted = true;
    const raf = requestAnimationFrame(measure);

    // Re-measure once every image has decoded, otherwise text/image swapping
    // could leave us with a slightly wrong (too small) locked height.
    const imgs = Array.from(stack.querySelectorAll("img"));
    const pending = imgs.filter((img) => !img.complete);
    pending.forEach((img) => img.addEventListener("load", measure));

    let timer = null;
    let cancelled = false;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", measure);
    // Webfonts can change text metrics (and therefore wrapping), so measure again.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) measure();
        })
        .catch(() => {});
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      pending.forEach((img) => img.removeEventListener("load", measure));
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", measure);
    };
  }, []);

  /*
   * GSAP animation #2 — service cards stagger reveal.
   * First reveal: the cards slide up + fade in one after another as the
   * section scrolls into view (ScrollTrigger, plays once).
   * If the section is already on screen — e.g. the user just switched back to
   * the Rides tab — the reveal plays immediately, so the cards can never be
   * left invisible waiting for a scroll that already happened.
   */
  useEffect(() => {
    if (tab !== "rides") return undefined;
    const row = cardsRowRef.current;
    if (!row) return undefined;

    const cards = Array.from(row.children);
    let trigger = null;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        cards,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          paused: true,
        }
      );

      if (ScrollTrigger.isInViewport(row, 0.15)) {
        tween.play();
      } else {
        trigger = ScrollTrigger.create({
          trigger: row,
          start: "top 85%",
          once: true,
          onEnter: () => tween.play(),
        });
      }
    }, sectionRef);

    return () => {
      if (trigger) trigger.kill();
      ctx.revert();
      gsap.set(cards, { clearProps: "opacity,transform" });
    };
  }, [tab]);

  /*
   * Keep ScrollTrigger's cached positions in sync.
   * The page keeps settling after first paint (webfonts, images, the locked
   * tab height), and a stale position would make the cards reveal fire at the
   * wrong scroll offset — or not at all. Watching the body size and refreshing
   * ScrollTrigger on change keeps the reveal accurate.
   */
  useEffect(() => {
    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("load", refresh);
    };
  }, []);

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
          className="section-content section-margin-mt-50 tab-stack"
          ref={stackRef}
          style={stackHeight ? { gridTemplateRows: `${stackHeight}px` } : undefined}
        >
          <div
            className="tab-pane-inner"
            role="tabpanel"
            aria-label="Rides"
            hidden={tab !== "rides"}
          >
            <div className="section-header mb-5" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
              <h2>
                Every Ride <br /> One Platform
              </h2>
            </div>
            <div className="service-cards-row" ref={cardsRowRef}>
              {RIDE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="service-card-col"
                >
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
                <img src={pane.img} alt={pane.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
