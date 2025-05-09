export default async function handler(req, res) {
  const { trackingNumber } = req.query;

  if (!trackingNumber) {
    return res.status(400).json({ error: 'Tracking number is missing' });
  }

  try {
    const response = await fetch(`https://api2.postnord.com/rest/shipment/v5/trackandtrace/findByIdentifier.json?id=${trackingNumber}&idType=TRACKING_NUMBER&locale=sv&apikey=${process.env.POSTNORD_KEY}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
}
