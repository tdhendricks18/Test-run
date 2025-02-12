const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Server running on port ${port}`));
git config --global user.name "Tanner"
git config --global user.email "tdhendricks18@gmail.com"
git config --list
