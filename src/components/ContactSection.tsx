import React from 'react';
import './ContactSection.css';

const ContactSection: React.FC = () => {
  return (
      <div className="contact-light__container">
        
        {/* Header Section */}
        <div className="contact-light__header">
          <h1 className="contact-light__title">Get in touch</h1>
        </div>

        {/* Content Section */}
        <div className="contact-light__content">
          
          {/* Left: Minimalist Form */}
          <div className="contact-light__form-wrapper">
            <form className="contact-light__form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group-light">
                <input type="text" id="firstName" placeholder="First name" required />
              </div>
              <div className="form-group-light">
                <input type="text" id="lastName" placeholder="Last name" required />
              </div>
              <div className="form-group-light">
                <input type="email" id="email" placeholder="E-mail" required />
              </div>
              <div className="form-group-light">
                <textarea id="message" rows={1} placeholder="Message" required></textarea>
              </div>
              
              <button type="submit" className="contact-light__submit">
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Info Panels */}
          <div className="contact-light__info-panel">
            
            <div className="info-block-light">
              <h3 className="info-block-light__title">SOCIAL NETWORKS</h3>
              <ul className="info-block-light__list">
                <li><a href="https://www.linkedin.com/company/yegara-trading-share-company-ytsc/" target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a></li>
              </ul>
            </div>

            <div className="info-block-light">
              <h3 className="info-block-light__title">ADDRESSES</h3>
              <div className="info-block-light__text">
                <p>22 Mazorya, Getahun Beshah Bldg</p>
                <p>6th Floor, Woreda 04</p>
                <p>Bole Sub City, Addis Ababa</p>
              </div>
            </div>

            <div className="info-block-light">
              <h3 className="info-block-light__title">INFORMATIONS</h3>
              <div className="info-block-light__text">
                <a href="mailto:yegaratradingsc@yegarasc.com">yegaratradingsc@yegarasc.com</a>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
};

export default ContactSection;
