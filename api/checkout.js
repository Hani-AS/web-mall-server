const stripeAPI = require("../stripe");

const createCheckoutSession = async (req, res) => {
  const domainUrl = process.env.WEB_APP_URL;
  const { line_items } = req.body;

  if (!line_items) {
    return res
      .status(400)
      .json({ error: "missing required session parameters" });
  }

  let session;

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ["NL", "GB", "US"] },
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "unable to create a session" });
  }
};

module.exports = createCheckoutSession;
