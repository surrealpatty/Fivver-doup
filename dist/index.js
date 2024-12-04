"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "app", {
    enumerable: true,
    get: function() {
        return app;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _database = require("./config/database");
const _user = require("./models/user");
const _user1 = /*#__PURE__*/ _interop_require_default(require("./routes/user"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Create Express app instance
const app = (0, _express.default)();
// Set up the server port
const port = process.env.PORT || 5000; // Port is now 5000 as per your original setup
// Middleware to parse JSON bodies
app.use(_express.default.json());
// Enable CORS (if you need it, for handling cross-origin requests)
app.use((0, _cors.default)());
// Example route
app.get('/', (req, res)=>{
    res.send('Welcome to Fiverr Clone!');
});
// Database connection check
_database.sequelize.authenticate().then(()=>{
    console.log('Database connection established.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
});
// Fetch users as a test on startup
const fetchUsers = async ()=>{
    try {
        const users = await _user.User.findAll(); // Fetch all users
        console.log('Users:', users.map((user)=>user.toJSON())); // Log user data
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
// Call the function to fetch users
fetchUsers();
// Use the userRouter for routes starting with /api/users
app.use('/api/users', _user1.default); // Register the user routes under /api/users
// Start the server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
 // Optional: Exporting app in case it's needed for tests or elsewhere

//# sourceMappingURL=index.js.map