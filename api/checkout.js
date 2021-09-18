const stripeAPI = require("./stripe");

const createCheckoutSession = async (req, res) => {
  const domainUrl = process.env.WEB_APP_URL;
  const { line_items, customer_email } = req.body;

  if (!line_items || customer_email) {
    return res
      .status(400)
      .json({ error: "missing required session parameters" });
  }

  let session;

  try {
    session = await stripeAPI.checkout.session.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${domainUrl}/success_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ["NL", "GB", "US"] },
    });
    res.status(200).json({ sessionID: session.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "unable to create a session" });
  }
};

module.exports = createCheckoutSession;