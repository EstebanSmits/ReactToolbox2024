import React, { useEffect, useState } from 'react';

const TermsOfService = ({apiUrl}) => {
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
        <h1>Terms of Service</h1>
        <p>Last updated: {lastModified}</p>

        <h2>Acceptance of Terms</h2>
        <p>By accessing and using  this site , you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Game's services, you shall be subject to any posted guidelines or rules applicable to such services.</p>

        <h2>Description of Service</h2>
        <p>[Your Game Name] provides users with access to a rich collection of resources, including but not limited to, online games, forums, and other interactive features (the "Service"). You understand and agree that the Service may include advertisements.</p>

        <h2>User Obligations</h2>
        <p>You agree to use the Game only for lawful purposes. You are prohibited from any use of the Game that would constitute a violation of any applicable law, regulation, or standard.</p>

        <h2>Modifications to Service</h2>
        <p>We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice at any time. You agree that we shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.</p>

        <h2>Contact Us</h2>
        <p>If you have questions or comments about this notice, you may contact us at our contact page.</p>
      </div>
  );
};
export default TermsOfService;
