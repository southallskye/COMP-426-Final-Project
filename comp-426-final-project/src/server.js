const express = require('express');

const app = express();
const port = 3000;

// Define your routes here
app.post('/api/signup', (req, res) => {
    // Handle signup logic here
    console.log(req.body);
    console.log("Sign up route hit!");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});