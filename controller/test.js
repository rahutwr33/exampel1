const { transformpayload } = require("../utility");

module.exports.demo = async function(req,res){
    const {payload, referenceData} = req.body;
    const results = await transformpayload(payload,referenceData);
    res.json(results)
}