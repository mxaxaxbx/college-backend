const express        = require('express');
const cors           = require('cors');
const {dbconnection} = require('./db/db');

const roleRoutes    = require('./routes/roles.router');
const subjectRoutes = require('./routes/subjects.router');
const userRoutes    = require('./routes/users.router');
const courseRoutes  = require('./routes/courses.router');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/roles', roleRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.listen( process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT )
);

dbconnection();
