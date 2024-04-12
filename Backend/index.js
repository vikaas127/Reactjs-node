const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors'); 
const app = express();
app.use(cors());
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Mount the route handlers
app.use('/api/', userRoutes);


// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
