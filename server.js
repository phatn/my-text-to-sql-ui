const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist', 'job-portal')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'job-portal', 'index.html'));
})

let port = process.env.PORT || 4200;
app.listen(port,() => {
  console.log(`App listening on port ${port}`);
})
