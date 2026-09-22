import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "../styles/navbar.css";

const NAV_LINKS = [
  { label: "About Us", href: "#" },
  { label: "Earn With Garibook", href: "#" },
  { label: "Garibook Business", href: "#" },
  { label: "Garibook Club", href: "#" },
  { label: "Campaign", href: "#" },
  { label: "Blogs", href: "#" },
];

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 90);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className={`theme-navbar-wrapper ${isSticky ? "is-sticky" : ""}`}>
      <div className="container">
        <nav className="theme-navbar">
          <a className="brand-logo" href="/" aria-label="Garibook home">
            <img src="/assets/images/logo.svg" alt="Garibook" width="150" height="34" />
          </a>

          <div className={`offcanvas-body ${menuOpen ? "show" : ""}`}>
            <ul className="nav-menu">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a className="nav-theme-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {menuOpen && (
            <div
              className="offcanvas-backdrop"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <div className="nav-right">
            <span className={`language-title ${isSticky ? "lang-hidden" : ""}`}>
              English
            </span>
            <a
              className="header-auth-item nav-login-desktop"
              href="#login"
            >
              <span className="btn-label">login</span>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
