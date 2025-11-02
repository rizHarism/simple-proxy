export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  const scriptURL =
    "https://script.google.com/macros/s/AKfycby9n7kRtPM4Wye_PhU7ZvmtM2T21nu0BWd3TyZ8mwGkYPOci-6kaRh6Jttf1oOly6duag/exec"; // your GAS endpoint

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
