import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const SOAP_URL = 'http://your-soap-service-url'; // Replace with your SOAP service URL

const callGetMonuments = async (city) => {
  const requestXml = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mon="monument.service">
       <soapenv:Header/>
       <soapenv:Body>
          <mon:get_monuments>
             <city>${city}</city>
          </mon:get_monuments>
       </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    const response = await axios.post(SOAP_URL, requestXml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const result = await parseStringPromise(response.data);
    const responseBody = result['soap:Envelope']['soap:Body'][0];
    const monumentsData = responseBody['ns2:get_monumentsResponse'][0].return[0];
    const monuments = JSON.parse(monumentsData);

    return monuments;
  } catch (error) {
    console.error('Error calling SOAP API:', error);
    throw error;
  }
};

export { callGetMonuments };