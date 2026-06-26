export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbw2COqwZB72mazDyKyulu3nH5uxpG0gRVFts_73ySlAS7zMto_cAk5K4Ycay35yaHd8/exec"; // your GAS endpoint

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
