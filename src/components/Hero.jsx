import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Btn from "./Btn";

const TYPING_WORDS = [
  "Assurance of Effortless <span>Travel</span>",
  "Luxury <span>Trips</span> with Comfort",
  "Your <span>Journey</span> Starts Here ...",
];

/*
 * Faithful port of garibook.com's TypingText:
 * - types 1 char every 60ms (HTML tags inserted instantly)
 * - pauses 2s when a text completes, then moves to the next phrase
 * - loops forever
 */
function useTypingText(texts, typingSpeed = 60, delayBetweenTexts = 2000) {
  const [textIndex, setTextIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [html, setHtml] = useState("");

  useEffect(() => {
    const current = texts[textIndex];
    const tokens = current.match(/(<[^>]+>|[^<]+)/g) || [];
    const total = tokens.filter((t) => !t.startsWith("<")).join("").length;

    const slice = (n) => {
      let acc = 0;
      let out = "";
      for (const t of tokens) {
        if (t.startsWith("<")) {
          out += t;
        } else if (acc + t.length < n) {
          out += t;
          acc += t.length;
        } else {
          out += t.substring(0, n - acc);
          break;
        }
      }
      return out;
    };

    if (charCount < total) {
      const t = setTimeout(() => {
        setHtml(slice(charCount + 1));
        setCharCount((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCharCount(0);
      setHtml("");
      setTextIndex((i) => (i + 1 < texts.length ? i + 1 : 0));
    }, delayBetweenTexts);
    return () => clearTimeout(t);
  }, [charCount, textIndex, texts, typingSpeed, delayBetweenTexts]);

  return html;
}

function Hero() {
  const typingHtml = useTypingText(TYPING_WORDS);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const rightRef = useRef(null);

  /*
   * GSAP animation #1 — hero entrance timeline.
   * On mount: the title container slides up + fades in, then the right
   * column (description + button) follows with a slight overlap.
   */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(titleRef.current, { y: 60, opacity: 0, duration: 1 })
        .from(rightRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.55");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-wrapper homepage_hero_wrapper" ref={sectionRef}>
      <div className="container">
        <div className="hero-row">
          <div className="hero-col hero-col-left">
            <div className="hero-left">
              <div className="hero-title-container" ref={titleRef}>
                <h1 className="hero-title">
                  <span
                    className="typing-text"
                    dangerouslySetInnerHTML={{ __html: typingHtml }}
                  />
                </h1>
              </div>
            </div>
          </div>
          <div className="hero-col hero-col-right">
            <div className="hero-right" ref={rightRef}>
              <p className="hero-r-text-mute">
                Choose your city, pick your car and enjoy the journey with
                Garibook&rsquo;s best drivers.
              </p>
              <Btn
                className="mt-4 theme-warning-btn"
                url="https://onelink.to/gbweb"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
