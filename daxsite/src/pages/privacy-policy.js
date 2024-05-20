import React, { useEffect, useState } from 'react';

const PrivacyPolicy = ({apiUrl}) => {
  const [lastModified, setLastModified] = useState('');

  useEffect(() => {
    fetch('${apiUrl}/last-modified?file=src/pages/TermsOfService.js')
      .then((response) => response.json())
      .then((data) => {
        setLastModified(new Date(data.lastModified).toLocaleDateString());
      })
      .catch((error) => console.error('Error fetching last modified date:', error));
  }, []);

  return (
      <div className="container">
        <h1>Privacy Policy</h1>
        <p>Last updated:  {lastModified}</p>

        <h2>Introduction</h2>
        <p>Welcome to this react site. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information,
           please contact us via the contact page.</p>

        <h2>Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide to us when you register on the Game, express an interest in obtaining information about us or our products and services, when you participate in activities on the Game, or otherwise when you contact us.</p>

        <h2>How We Use Your Information</h2>
        <p>We use personal information collected via our Game for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>

        <h2>Sharing Your Information</h2>
        <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

        <h2>Security of Your Information</h2>
        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>

        <h2>Contact Us</h2>
        <p>If you have questions or comments about this notice, you may contact us  via our contact page.</p>
      </div>
  );
};

export default PrivacyPolicy;
