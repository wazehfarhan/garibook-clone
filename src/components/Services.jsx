import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Btn from "./Btn";

const RIDE_CARDS = [
  {
    img: `${import.meta.env.BASE_URL}assets/images/cars/intercity_car_rental.svg`,
    title: "Intercity Car Rental",
    text: "Travel between cities with comfort and confidence.",
  },
  {
    img: `${import.meta.env.BASE_URL}assets/images/cars/rideshare.svg`,
    title: "Ride share",
    text: "Go anywhere in the city, quickly and easily.",
  },
  {
    img: `${import.meta.env.BASE_URL}assets/images/cars/airport_rental.svg`,
    title: "Airport Rental",
    text: "Whether you\u2019re flying abroad or returning home, enjoy a comfortable and worry-free airport journey.",
  },
  {
    img: `${import.meta.env.BASE_URL}assets/images/cars/hourly_rental.svg`,
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
  // Pane keys currently un-hidden. Normally just the active tab; during a
  // crossfade it briefly holds BOTH the outgoing and incoming pane.
  const [visible, setVisible] = useState(["rides"]);
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const stackRef = useRef(null);
  const animatingRef = useRef(false);
  // Current tab as a ref: GSAP's onComplete (and a click queued from it)
  // must read the LIVE tab, not the value captured when the tween started.
  const tabRef = useRef("rides");
  // Clicks that arrive mid-crossfade are queued here (last one wins)
  // instead of being silently dropped, and run right after the tween ends.
  const pendingRef = useRef(null);

  useEffect(() => {
    tabRef.current = tab;
  }, [tab]);

  /*
   * Strip GSAP's leftover inline styles (opacity/transform/zIndex/...) from
   * panes that are hidden again. useLayoutEffect runs right after React
   * commits `hidden` and BEFORE the browser paints, so the outgoing pane
   * (which ends its fade at opacity 0) can never pop back to full opacity
   * for one frame — the ghost flash that used to appear at the end of
   * every tab transition.
   */
  useLayoutEffect(() => {
    stackRef.current?.querySelectorAll("[data-pane]").forEach((pane) => {
      if (pane.hasAttribute("hidden")) {
        gsap.set(pane, { clearProps: "opacity,transform,zIndex,pointerEvents" });
      }
    });
  });

  /*
   * GSAP animation #2 — service cards scroll reveal.
   * When the Rides card grid scrolls into view, cards rise + fade in with
   * a stagger. Scoped to the section via gsap.context + ScrollTrigger,
   * plays once so switching tabs never replays it.
   */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".service-card-col", {
        y: 48,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        onComplete: () =>
          gsap.set(".service-card-col", { clearProps: "opacity,transform" }),
        scrollTrigger: {
          trigger: ".service-cards-row",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
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
      img: `${import.meta.env.BASE_URL}assets/images/busines.jpeg`,
    },
    {
      key: "club",
      title: "Turn Your Car into Earnings with Garibook Club",
      text: "Garibook Club is more than just a community. Join a vibrant network of car enthusiasts, and turn your car into a source of earnings.",
      img: `${import.meta.env.BASE_URL}assets/images/garibook_club.jpg`,
    },
    {
      key: "vms",
      title: "Vehicle Management System - VMS",
      text: "Just like Garibook Business makes traveling easy for your team, our Vehicle Management System makes managing your fleet easy for you.",
      img: `${import.meta.env.BASE_URL}assets/images/Frame_1000001473.png`,
    },
  ];

  /*
   * Tab switch — GSAP crossfade.
   *
   * All 4 panes stay mounted and share ONE CSS grid cell (.services-panes in
   * services.css), and hidden panes keep display:block (visibility:hidden),
   * so the container height always equals the TALLEST pane: switching tabs
   * never changes the section height (no jump) and never triggers a
   * ScrollTrigger refresh (no neighboring-section re-animation).
   *
   * The outgoing pane stays visible (fading out) while the incoming pane
   * fades/rises in — both briefly share the locked grid cell, which cannot
   * change layout — so there is never a blank frame ("section breaks").
   * The outgoing pane is only re-hidden in the tween's onComplete.
   */
  const switchTab = (key) => {
    if (animatingRef.current) {
      // A click during the crossfade is queued (last one wins) instead of
      // being ignored, so every click lands — it runs in onComplete below.
      pendingRef.current = key;
      return;
    }

    const outgoingKey = tabRef.current;
    if (key === outgoingKey) return;

    const panes = stackRef.current;
    const outgoing = panes?.querySelector(`[data-pane="${outgoingKey}"]`);
    const incoming = panes?.querySelector(`[data-pane="${key}"]`);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setTab(key); // nav highlight responds immediately

    if (!outgoing || !incoming || reduced) {
      setVisible([key]);
      return;
    }

    animatingRef.current = true;

    // Kill any stale tween and set the crossfade start styles SYNCHRONOUSLY,
    // while the incoming pane is still hidden. That way no paint can ever
    // show it at full opacity before the tween begins — including the
    // queued-click path, where setState commits outside this event handler.
    gsap.killTweensOf([incoming, outgoing]);
    gsap.set(incoming, { opacity: 0, y: 16, zIndex: 2 });
    gsap.set(outgoing, { pointerEvents: "none", zIndex: 1 });

    setVisible((v) => (v.includes(key) ? v : [...v, key]));

    // Start styles were already set synchronously above; the timeline starts
    // on the next frame, before any paint of the newly un-hidden pane.
    requestAnimationFrame(() => {
      gsap
        .timeline({
          onComplete: () => {
            setVisible((v) => v.filter((k) => k !== outgoingKey));
            // Clear ONLY the incoming (now active) pane: it ends at its
            // natural styles, so clearing changes nothing visually. The
            // outgoing pane keeps opacity 0 until React commits `hidden`;
            // the useLayoutEffect above strips its styles after that
            // commit — never during a paint where it is still visible.
            gsap.set(incoming, {
              clearProps: "opacity,transform,zIndex,pointerEvents",
            });
            animatingRef.current = false;
            // Run the click that arrived during this crossfade, if any.
            const queued = pendingRef.current;
            pendingRef.current = null;
            if (queued) switchTab(queued);
          },
        })
        .to(outgoing, { opacity: 0, duration: 0.3, ease: "power1.out" }, 0)
        .to(incoming, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0);
    });
  };

  return (
    <section className="service-wrapper section-padding" ref={sectionRef}>
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
                onClick={() => switchTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="section-content section-margin-mt-50 services-panes"
          ref={stackRef}
        >
          <div
            className="tab-pane-inner"
            role="tabpanel"
            aria-label="Rides"
            data-pane="rides"
            hidden={!visible.includes("rides")}
          >
            <div className="section-header mb-5">
              <h2>
                Every Ride <br /> One Platform
              </h2>
            </div>
            <div className="service-cards-row" ref={cardsRef}>
              {RIDE_CARDS.map((card) => (
                <div key={card.title} className="service-card-col">
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
              data-pane={pane.key}
              hidden={!visible.includes(pane.key)}
            >
              <div className="split-text">
                <h2>{pane.title}</h2>
                <p className="my-4">{pane.text}</p>
                <SectionBtnRow />
              </div>
              <div className="split-image">
                <img
                  src={pane.img}
                  alt={pane.title}
                  width="640"
                  height="640"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
