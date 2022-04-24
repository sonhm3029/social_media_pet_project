const db = require("../database");

class PinsController{
    async getPins(req, res, next) {
        try {
            
            const category = req?.query?.category;
            let query = (category&&category!=="undefined")?`category='${category}'`:"true";
            
            if(req?.params?.id) {
                query += ` AND p.id = ${req?.params?.id}`
            }

            const response = await db.query(
                `
                DROP TABLE IF EXISTS  temptable ;

                SELECT id, array_agg(g.savedby) as savers INTO temptable FROM
                (
                    SELECT * FROM pins AS p
                    LEFT JOIN saves AS s
                    ON p.id = s.pin_id
                )AS g
                GROUP BY g.id;

                SELECT * FROM (
                    SELECT * FROM pins
                    INNER JOIN (
                        SELECT  json_build_object(
                            'id',id,
                            'name',name,
                            'image',image
                        ) AS postedby,
                        id AS userId
                        FROM users) AS u
                    ON pins.postedby = u.userId
                ) AS p
                LEFT JOIN temptable AS t
                ON p.id=t.id WHERE ${query} ;

                DROP TABLE temptable;
                `
            )
            if(response) {
                res.status(200).json({
                    status:"success",
                    data: response[2].rows
                })
            }
        } catch (error) {
            res.status(500).json({
                status:"error",
                message: error.message
            })
        }
    }


    async createPin(req, res, next) {
        try {
            const {title, about, destination, category, image, postedby} = req?.body;
            const response = await db.query(
                `INSERT INTO pins(title, about, destination, category, image, postedBy) `+
                `VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
                [title, about, destination, category, image, postedby]
            )
            if(response) {
                res.status(200).json({
                    status:"success",
                    data: response?.rows[0]
                })
            }
            
        } catch (error) {
            res.status(500).json({
                status:"error",
                message: error.message
            })
        }
    }

    async deletePin(req, res, next) {
        try {
            const pinId = req?.params?.id;
            if(pinId) {
                const response = await db.query(
                    `DELETE FROM pins `+
                    `WHERE id = $1 RETURNING *`,
                    [pinId]
                );
                if(response) {
                    res.status(200).json({
                        status:"success",
                        data: response.rows[0]
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                status:"error",
                message:error.message   
            })
        }
    }

}

module.exports = new PinsController;
