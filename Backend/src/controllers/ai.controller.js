const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {

    const code = req.body.code;

    if(!code) {
        return res.status(400).json({ error: 'Missing prompt parameter' });
    }

    const response = await aiService(code);
    res.send(response);
    // res.json({ result: 'Success' });

};