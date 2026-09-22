import Btn from "./Btn";

function DownloadApp() {
  return (
    <section className="download-app-wrapper section-padding">
      <div className="container">
        <div className="section-content download-app-content bg-primary-gb rounded-4">
          <div className="common-section-layout-three-text">
            <h2 className="text-white">
              Download <br /> Garibook Mobile App
            </h2>
            <p className="text-white">
              Download our Customer, Smart Driver and Enterprise App
            </p>
            <Btn
              className="theme-warning-btn no-commission-download-button mt-4"
              url="https://onelink.to/gbweb"
            />
          </div>
          <div className="download-app-image">
            <img src="/assets/images/app_phones.svg" alt="Garibook apps" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadApp;
