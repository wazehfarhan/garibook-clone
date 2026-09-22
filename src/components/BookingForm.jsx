import { useState } from "react";
import { CarFront, PlaneTakeoff, MapPin, ChevronDown, Users } from "lucide-react";
import Btn from "./Btn";

const CAR_OPTIONS = [
  "Sedan Car (4 Seats)",
  "Micro (11 Seats)",
  "Noah / Super GL (11 Seats)",
];

const PICKUP_OPTIONS = [
  "Dhaka — Banani",
  "Dhaka — Uttara",
  "Dhaka — Dhanmondi",
  "Chattogram",
  "Sylhet",
];

function Dropdown({ label, placeholder, options, icon }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="ctd-w-input-wrap ctd-w-input-r-border">
      <span className="form-label">
        {icon}
        <span>
          {label} <span className="text-danger">*</span>
        </span>
      </span>
      <div className="gb-dropdown">
        <button
          type="button"
          className="dropdown-toggle btn btn-primary"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={value ? "dd-value" : "text-muted"}>
            {value || placeholder}
          </span>
          <ChevronDown size={16} className="dd-arrow" />
        </button>
        {open && (
          <ul className="gb-dropdown-menu" role="listbox">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    setValue(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Radios({ name, options }) {
  return (
    <div className="trip-type-group">
      {options.map((t, i) => (
        <label className="form-check" key={t}>
          <input type="radio" name={name} defaultChecked={i === 0} />
          <span className="checkbox-mark" />
          <span className="form-check-label">{t}</span>
        </label>
      ))}
    </div>
  );
}

function BookingForm() {
  const [tab, setTab] = useState("car-rental");

  return (
    <div className="choose-trip-details-wrapper">
      <div className="container">
        <div className="ctd-wrap">
          <div className="ctd-w-navs nav nav-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "car-rental"}
              className={`nav-link fw-semibold ${tab === "car-rental" ? "active" : ""}`}
              onClick={() => setTab("car-rental")}
            >
              <CarFront size={18} className="tab-icon" />
              Car Rental
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "airport-rental"}
              className={`nav-link fw-semibold ${tab === "airport-rental" ? "active" : ""}`}
              onClick={() => setTab("airport-rental")}
            >
              <PlaneTakeoff size={18} className="tab-icon" />
              Airport Rental
            </button>
          </div>

          <div className="ctd-w-nav-contents">
            {tab === "car-rental" ? (
              <div className="ctd-form-row" role="tabpanel">
                <Dropdown
                  label="Choose a Car"
                  placeholder="Select Car Type"
                  options={CAR_OPTIONS}
                  icon={<CarFront size={20} className="label-icon" />}
                />
                <Dropdown
                  label="Pickup Location"
                  placeholder="Select Location"
                  options={PICKUP_OPTIONS}
                  icon={<MapPin size={20} className="label-icon" />}
                />
                <div className="ctd-w-input-wrap">
                  <span className="form-label">
                    <Users size={20} className="label-icon" />
                    <span>Trip Type</span>
                  </span>
                  <Radios name="trip-type" options={["One Way", "Round Way", "Hourly"]} />
                </div>
                <div className="ctd-w-input-wrap ctd-w-btn-wrap">
                  <span className="form-label form-label-hidden">Search</span>
                  <Btn className="theme-primary-btn" value="Search Car" url="#search" />
                </div>
              </div>
            ) : (
              <div className="ctd-form-row" role="tabpanel">
                <div className="ctd-w-input-wrap">
                  <span className="form-label">
                    <PlaneTakeoff size={20} className="label-icon" />
                    <span>Airport Transfer</span>
                  </span>
                  <Radios name="airport-type" options={["From Airport", "From Home"]} />
                </div>
                <Dropdown
                  label="Choose a Car"
                  placeholder="Select Car Type"
                  options={CAR_OPTIONS}
                  icon={<CarFront size={20} className="label-icon" />}
                />
                <Dropdown
                  label="Pickup Location"
                  placeholder="Select Location"
                  options={PICKUP_OPTIONS}
                  icon={<MapPin size={20} className="label-icon" />}
                />
                <div className="ctd-w-input-wrap ctd-w-btn-wrap">
                  <span className="form-label form-label-hidden">Search</span>
                  <Btn className="theme-primary-btn" value="Search Car" url="#search" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
