const db = require("../database");


class SavesController {

    async savePins(req, res, next) {

        try {
            const {savedby, pin_id} = req?.body;

            const response = await db.query(
                `INSERT INTO saves(savedby, pin_id) `+
                `VALUES($1, $2) RETURNING *`,
                [savedby, pin_id]
            );

            if(response) {
                res.status(200).json({
                    status:"success",
                    data: response?.rows[0]
                })
            }
        } catch (error) {
            res.status(500).json({
                status:"error",
                message:error.message
            })
        }

        
    }
};

module.exports = new SavesController;
