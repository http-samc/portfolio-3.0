const PK_TEST = 'pk_test_51KQ8BeL1Sbu4VnBadepvuKhlBEyPg6eHW8IHCTcQ8rCLXnXFefa6bUAS1zPJXkuQ5W2XnYzxbcf5OthLW4QRBnoB00xj47hBzW';
const SK_TEST = 'sk_test_51KQ8BeL1Sbu4VnBa0PbXo6wwJOuPKFcPqEQBc9Ls1T1MHhdTrCfOoVsFHGp8b2lNenKpEn68vdoPpmICVaR06DM800A1wgV3fA';
const WH_SEC = 'whsec_af49f9bc2829d1cf4d98caa99bcf5ff588395dd25e9ee23e627322a48fc1219d';

const RATE = .04;

const Stripe = require('stripe');
const stripe = Stripe(SK_TEST);
const express = require('express');
const fs = require('fs');

const getAvailability = (seller) => {
    let capacity = seller.capacity;
    let usage = 0;
    for (const contract of seller.contracts) {
        if (contract.end < Date.now()) continue;
        usage += contract.credits;
    }
    return capacity - usage;
}

const fulfillOrder = (buyer, amount) => {
    try {
        var credits = amount * rate;
        let buyerContract = {
            "start": Date.now(),
            "end": Date.now() + (1000 * 60 * 60 * 24 * 365),
            "credits": credits,
            "price": amount,
            "rate": RATE,
        }
        // since we know capacity can be met, we know the buyer alwats gets this contract
        rawdata[buyer].contracts.push(buyerContract);

        let rawdata = fs.readFileSync('api/assets/carbon-back.json');
        for (const [uid, user] of Object.entries(rawdata)) {
            if (credits == 0) break; // order fulfilled
            if (user.userType == 'buyer' || user.capacity == 0 || getAvailability(user) == 0) continue; // user can't help us
            let creditsAvailable = getAvailability(user);
            if (creditsAvailable >= credits) { // seller can fulfill remainder of the order
                rawdata[uid].contracts.push({
                    "start": Date.now(),
                    "end": Date.now() + (1000 * 60 * 60 * 24 * 365),
                    "credits": credits,
                    "price": credits / RATE, // adjust price to reflect what's left
                    "rate": RATE,
                });
                credits = 0;
            }
            else if (creditsAvailable < credits) { // seller can fullfil part of the order
                credits -= creditsAvailable;
                rawdata[uid].contracts.push({
                    "start": Date.now(),
                    "end": Date.now() + (1000 * 60 * 60 * 24 * 365),
                    "credits": creditsAvailable,
                    "price": creditsAvailable / RATE, // adjust price to reflect what's left
                    "rate": RATE,
                });
            }
        }
        // Writing data after order fulfillment
        fs.writeFileSync('api/assets/carbon-back.json', JSON.stringify(rawdata));
        console.log('Done fulfilling order');
    }
    catch (e) {
        console.log(e.message)
    }
}

module.exports = function (app) {
    // Stripe set up
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
            fulfillOrder(event.data.object.metadata.uid, event.data.object.amount / 100);
        }
        res.json({ ok: true });
    });

    /*
    *   Endpoints
    *  TODO: Handle creating contracts for both parties post stripe hook creation
    *  TODO: Handle changing capacity for a seller
    *  TODO: Clientside, don't factor in expired contracts
    */

    // Sign up
    app.post('/api/carbon-back/signup', async (req, res) => {
        try {
            let { email, password, userType } = req.body;
            if (!email || !password || !userType || !(userType === 'buyer' || userType === 'seller')) {
                res
                    .status(400)
                    .json({ wasSuccessful: false, message: "All fields are required." })
                return;
            }

            let user = {
                password: password,
                userType: userType,
                contracts: [],
                capacity: 0, // only used for sellers
            }

            let rawdata = JSON.parse(fs.readFileSync('api/assets/carbon-back.json'));

            if (email in rawdata) {
                res
                    .status(400)
                    .json({ wasSuccessful: false, message: "An account already exists with this email." });
                return;
            }

            rawdata[email] = user;

            fs.writeFileSync('api/assets/carbon-back.json', JSON.stringify(rawdata));

            res
                .status(200)
                .json({ wasSuccessful: true, message: `Account (${userType}) created successfully!` });

        }
        catch (e) {
            res
                .status(500)
                .json({ wasSuccessful: false, message: e.message });
        }
    });

    // Sign in
    app.post('/api/carbon-back/auth', async (req, res) => {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                res
                    .status(400)
                    .json({ wasSuccessful: false, message: "All fields are required." });
                return;
            }

            let rawdata = JSON.parse(fs.readFileSync('api/assets/carbon-back.json'));

            if (!(email in rawdata)) {
                res
                    .status(404)
                    .json({ wasSuccessful: false, message: "That email doesn't have an account!" });
                return;
            }

            else if (rawdata[email].password !== password) {
                res.status(401)
                res.json({ wasSuccessful: false, message: "Wrong password." });
                return;
            }

            res
                .status(200)
                .json({ wasSuccessful: true, message: "Logged In!" });
        }
        catch (e) {
            res
                .status(500)
                .json({ wasSuccessful: false, message: e.message });
        }
    });

    // Get all contracts
    app.get('/api/carbon-back/contracts', async (req, res) => {
        try {
            let { email, password } = req.query;
            if (!email || !password) {
                res
                    .status(400)
                    .json({ wasSuccessful: false, message: "All fields are required." });
                return;
            }

            let rawdata = JSON.parse(fs.readFileSync('api/assets/carbon-back.json'));

            if (!(email in rawdata) || rawdata[email].password !== password) {
                res
                    .status(401)
                    .json({ wasSuccessful: false, message: "Incorrect Authentication." });
                return;
            }

            res.status(200).json({ wasSuccessful: true, contracts: rawdata[email].contracts });
        }
        catch (e) {
            res.json({ wasSuccessful: false, message: e.message }).status(500);
        }
    });

    // Get capacity & current usage (sellers only)
    app.get('/api/carbon-back/capacity', async (req, res) => {
        try {
            let { email, password } = req.query;
            if (!email || !password)
                res.json({ wasSuccessful: false, message: "All fields are required." }).status(400);

            let rawdata = JSON.parse(fs.readFileSync('api/assets/carbon-back.json'));

            if (!(email in rawdata) || rawdata[email].password !== password)
                res.json({ wasSuccessful: false, message: "Incorrect Authentication." }).status(401);

            else if (rawdata[email].userType !== 'seller')
                res.json({ wasSuccessful: false, message: "You are not a seller." }).status(401);

            contracts = rawdata[email].contracts;

            var creditsUsed = 0;
            for (var i = 0; i < contracts.length; i++) {
                if (contracts[i].end > Date.now())
                    creditsUsed += contracts[i].credits;
            }

            res.json({ wasSuccessful: true, usage: creditsUsed, capacity: rawdata[email].capacity }).status(200);
        }
        catch (e) {
            res.json({ wasSuccessful: false, message: e.message }).status(500);
        }
    });

    // Lifetime stats
    app.get('/api/carbon-back/overall', async (req, res) => {
        try {
            let { email, password } = req.query;
            if (!email || !password) {
                res
                    .status(400)
                    .json({ wasSuccessful: false, message: "All fields are required." });
                return;
            }

            let rawdata = JSON.parse(fs.readFileSync('api/assets/carbon-back.json'));

            if (!(email in rawdata) || rawdata[email].password !== password) {
                res
                    .status(401)
                    .json({ wasSuccessful: false, message: "Incorrect Authentication." });
                return;
            }

            contracts = rawdata[email].contracts;

            var credits = 0;
            var usd = 0;
            var rateSum = 0;

            for (var i = 0; i < contracts.length; i++) {
                credits += contracts[i].credits;
                usd += contracts[i].price;
                rateSum += contracts[i].rate;
            }

            res.status(200).json({ wasSuccessful: true, usd: usd, credits: credits, avg_rate: Math.round(rateSum / contracts.length) });
        }
        catch (e) {
            res.status(500).json({ wasSuccessful: false, message: e.message });
        }
    });

    // Current value of $1 in credits
    app.get('/api/carbon-back/rate', async (req, res) => {
        res.json({ wasSuccessful: true, rate: RATE }).status(200);
    });

    // Get network-wide credit availability
    app.get('/api/carbon-back/availability', async (req, res) => {
        try {
            rawdata = JSON.parse(fs.readFileSync('api/assets/carbon-back.json'));
            credits = 0;
            for (const [uid, user] of Object.entries(rawdata)) {
                if (user.userType === 'seller') {
                    credits += getAvailability(user)
                }
            }

            res
                .status(200)
                .json({ wasSuccessful: true, credits: credits });
        }
        catch (e) {
            res
                .status(500)
                .json({ wasSuccessful: false, message: e.message });
        }
    });
}