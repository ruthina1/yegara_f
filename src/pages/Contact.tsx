import React from 'react';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-page-light">
      <div style={{ paddingTop: '15vh' }}>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
