const PK_TEST = 'pk_test_51KQ8BeL1Sbu4VnBadepvuKhlBEyPg6eHW8IHCTcQ8rCLXnXFefa6bUAS1zPJXkuQ5W2XnYzxbcf5OthLW4QRBnoB00xj47hBzW';
const SK_TEST = 'sk_test_51KQ8BeL1Sbu4VnBa0PbXo6wwJOuPKFcPqEQBc9Ls1T1MHhdTrCfOoVsFHGp8b2lNenKpEn68vdoPpmICVaR06DM800A1wgV3fA';
const WH_SEC = 'whsec_af49f9bc2829d1cf4d98caa99bcf5ff588395dd25e9ee23e627322a48fc1219d';

const Stripe = require('stripe');
const stripe = Stripe(SK_TEST);
const express = require('express');

module.exports = function (app) {
    app.post("/api/carbon-back/order", async (req, res) => {
        try {
            // Getting data from client
            let { amount, uid } = req.body;

            // Simple validation
            if (!amount || !uid)
                return res.status(400).json({ message: "All fields are required" });
            amount = parseInt(amount);

            // Initiate payment
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: "USD",
                payment_method_types: ["card"],
                metadata: { uid },
            });

            // Extracting the client secret
            const clientSecret = paymentIntent.client_secret;

            // Sending the client secret as response
            res.json({ message: "Payment initiated", clientSecret });
        } catch (err) {
            // Catch any error and send error 500 to client
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    app.use("/api/carbon-back/stripe", express.raw({ type: "*/*" }));
    app.post("/api/carbon-back/stripe", async (req, res) => {
        // Get the signature from the headers
        const sig = req.headers["stripe-signature"];
        let event;
        try {
            // Check if the event is sent from Stripe or a third party
            // And parse the event
            event = await stripe.webhooks.constructEvent(
                req.body,
                sig,
                WH_SEC
            );
        } catch (err) {
            // Handle what happens if the event is not from Stripe
            return res.status(400).json({ message: err.message });
        }
        // Event when a payment is initiated
        if (event.type === "payment_intent.created") {
            console.log(`${event.data.object.metadata.uid} initated payment!`);
        }
        // Event when a payment is succeeded
        if (event.type === "payment_intent.succeeded") {
            console.log(`${event.data.object.metadata.uid} succeeded payment!`);
            // fulfilment
        }
        res.json({ ok: true });
    });

}