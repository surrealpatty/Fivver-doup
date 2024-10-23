const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const { sequelize } = require('./config/database');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', authRoutes);
app.use('/', profileRoutes);

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
