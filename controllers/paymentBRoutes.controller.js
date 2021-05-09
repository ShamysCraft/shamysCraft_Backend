const braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'nhfdzpg67qxrk7vg',
    publicKey: '7s4j9pjzrf5m8hqx',
    privateKey: '8a1fa51fc623d342698e895f62ed1541'
});


// create token
// pass clientToken to your front-end

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.status(500).json(err)
        }else{
            res.send(response)
        }
      });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale(
        {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,

        options: {
            submitForSettlement: true
        }
    },
        function (err, result) {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        }
    );
}