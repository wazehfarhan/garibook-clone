import Btn from "./Btn";

function SmartDriver() {
  return (
    <section className="no-commission-wrapper section-padding overflow-hidden">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
          <h2>Be a Smart Driver</h2>
        </div>

        <div
          className="section-content section-margin-mt-50 bg-warning-gb rounded-4"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="200"
        >
          <div className="smart-driver-row">
            <div className="smart-driver-text">
              <div className="common-section-layout-one-text">
                <h2>
                  0% Commission <br /> 100% Freedom
                </h2>
                <Btn
                  className="theme-primary-btn no-commission-download-button mt-4"
                  value="Download Smart Driver App"
                  url="https://play.google.com/store/search?q=garibook%20smart%20driver&c=apps"
                />
              </div>
            </div>
            <div className="smart-driver-image">
              <div className="no-commission-image" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="200">
                <img src={`${import.meta.env.BASE_URL}assets/images/no_commission_app_screen.png`} alt="Smart Driver app" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartDriver;
