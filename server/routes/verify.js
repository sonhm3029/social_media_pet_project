const router = require("express").Router();
const GoogleAuthVerify = require("../middleware/authMiddleware");
const db = require("../database");

router.post("/", GoogleAuthVerify, (req, res, next)=> {
    try {
        res.json(true);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/exist-user/:id", async (req, res, next)=> {
  const id = req?.params?.id;
  if(id) {
    try {
      const response = await db.query(
        `
        SELECT id FROM users
        WHERE id=$1
        RETURNING id
        `,
        [id]
      );
      if(response?.rows[0]) {
        res.status(200).json(true);
      }
      else {
        res.status(201).json(false);
      }
    } catch (error) {
      res.status(404).json(false)
    }
  }
})

module.exports = router;
