const {OAuth2Client} = require('google-auth-library');
require("dotenv").config();
const client = new OAuth2Client(process.env.GOAUTH_CLIENT_ID);

module.exports = async function GoogleAuthVerify(req, res, next){

    let id_token = req.header("Authorization");
    if(!id_token) {
        return res.status(403).json({
            message:"Auth denied!"
        })
    }
    

    // Verify token
    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOAUTH_CLIENT_ID, 
        });
        if(ticket&&ticket.getPayload()) {
            next();
        }
        
    } catch (error) {
        
        return res.status(401).json({ msg: "Token is not valid" });
    }
}