const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
// const morgan = require("morgan");
const cors = require("cors");
const Route = require("./routes");

// if( window.location.origin ==="l")
// app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
// Static files
app.use(express.static('uploads'))

Route(app);

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})
