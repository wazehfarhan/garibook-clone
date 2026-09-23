import { useEffect, useRef, useState } from "react";

const COUNTERS = [
  { label: "Trip Requests", value: 300000, delay: 1000 },
  { label: "Total Customers", value: 850000, delay: 750 },
  { label: "Active Drivers", value: 35000, delay: 1000 },
  { label: "District Covered", value: 64, delay: 1350 },
];

/* Count-up: slow 5s roll with an expo-style ease — quick pickup,
   gentle settle so the number glides into place */
function useCountUp(end, run, duration = 5000) {
  const [value, setValue] = useState(0);
  const raf = useRef();
  useEffect(() => {
    if (!run) return undefined;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo: dynamic launch, silky deceleration at the end
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(end * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [end, run, duration]);
  return value;
}

function CounterItem({ label, value, delay }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const current = useCountUp(value, inView);
  const display = value >= 1000 ? current.toLocaleString("en-US") : current;

  return (
    <li
      ref={ref}
      data-aos="zoom-in"
      data-aos-duration="600"
      data-aos-delay={delay}
      style={{ opacity: inView ? undefined : 0 }}
    >
      <h4 className="text-warning-gb mb-0">
        {display}
        {value >= 1000 ? "+" : ""}
      </h4>
      <span className="text-white">{label}</span>
    </li>
  );
}

function Stats() {
  return (
    <div className="happy-client-wrap-inside">
      <div className="container">
        <div className="happy-client-wrap">
          <div className="happy-client-title-row">
            <h2 className="title-hcw text-white" data-aos="fade-up" data-aos-duration="600">
              From Everyday Rides to
              <br />
              Meaningful Journeys
            </h2>
          </div>
          <div className="happy-client-count-wrap">
            <ul className="hccw-count-list">
              {COUNTERS.map((c) => (
                <CounterItem key={c.label} {...c} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
