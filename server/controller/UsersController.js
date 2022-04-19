const db = require("../database");


class UsersController {

        async createUser (req, res, next) {
            const {id, name, image} = req?.body;
            try {
                const response = await db.query(
                    `INSERT INTO users(id,name, image) `+
                    `VALUES($1, $2, $3) RETURNING *`,
                    [id,name, image]
                );
                if(response) {
                    
                    res.status(201).json({
                        status:"success",
                        data:response?.rows[0]
                    })
                }
            } catch (error) {
                res.status(500).json({
                    status:"error",
                    message:error.message
                })
            }
        }

        async getUser (req, res, next) {
            const id = req?.params?.id;
            const query = id?"id=$1":"$1";
            console.log("query",`SELECT * FROM users `+
            `WHERE ${query}
            ${[(id||"true")]}`)
            try {
                const response = await db.query(
                    `SELECT * FROM users `+
                    `WHERE ${query}`,
                    [(id||"true")]
                )
               
                if(response) {
                    res.status(200).json({
                        status:"success",
                        data: response?.rows[0],
                        total: response?.rows?.length
                    })
                }
            } catch (error) {
                res.status(501).json({
                    status:"error",
                    message:error.message
                })
            }
        }
}

module.exports = new UsersController;
