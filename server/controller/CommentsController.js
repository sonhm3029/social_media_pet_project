const db = require("../database");


class CommentsController {

    async getAll(req,res, next) {
        try {
            let pinId = req?.query?.pinId;
            
            let query = (pinId&&pinId!=="undefined")?`id=${Number(pinId)}`:"true";

            const response = await db.query(
                `
                SELECT * FROM
                (
                    SELECT * FROM comments AS CO
                    INNER JOIN (
                        SELECT
                        json_build_object(
                            'id', id,
                            'name', name,
                            'image', image
                        ) AS postedby
                        FROM users
                    ) AS US
                    ON CO.postedby = US.postedby ->> 'id'
                ) AS c
                INNER JOIN (
                        SELECT id AS pin_id FROM pins
                        WHERE ${query}
                    ) AS p
                ON c.pin_id = p.pin_id;
                `
            );

            if(response) {
                console.log(response);
                res.status(200).json({
                    status:"success",
                    data: response?.rows
                })
            }
            

        } catch (error) {
            res.status(500).json({
                status:"error",
                message: error.message
            })
        }
    }

    async createCmt(req, res, next) {
        try {
            let {pin_id, content, postedby} = req?.body;
            if(pin_id&&content&&postedby) {
                const response = await db.query(
                    `
                    INSERT INTO comments(pin_id, content, postedby)
                    VALUES($1, $2, $3) RETURNING *
                    `,
                    [pin_id, content, postedby]
                );
                if(response) {
                    res.status(200).json({
                        status:"success",
                        data: response?.rows[0]
                    })
                }
            }
            else {
                throw new Error({
                    message:"Missing field!"
                })
            }

        } catch (error) {
            res.status(500).json({
                status:"error",
                message:error.message
            })
        }
    }

}

module.exports = new CommentsController;
