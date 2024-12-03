"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export app for testing
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _express = /*#__PURE__*/ _interop_require_default(require("express"));
var _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
var _database = require("./config/database");
var _user = /*#__PURE__*/ _interop_require_default(require("./routes/user"));
var _testEmailRoute = /*#__PURE__*/ _interop_require_default(require("./routes/testEmailRoute"));
var _user1 = require("./models/user");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
// Load environment variables from .env file
_dotenv.default.config();
// Initialize Express app
var app = (0, _express.default)();
var port = process.env.PORT || 3000; // Use environment variable for port or default to 3000
// Middleware to parse JSON bodies
app.use(_express.default.json());
// Register routes
app.use('/api/users', _user.default); // All user-related routes
app.use('/test', _testEmailRoute.default); // Test email route
// Root route
app.get('/', function(req, res) {
    res.send('Welcome to Fiverr Clone!');
});
// Verify database connection
_database.sequelize.authenticate().then(function() {
    console.log('Database connection established.');
}).catch(function(error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if database connection fails
});
// Sync models with the database
_database.sequelize.sync().then(function() {
    console.log('Database synced successfully.');
}).catch(function(err) {
    console.error('Error syncing database:', err);
    process.exit(1); // Exit the process if syncing fails
});
// Fetch users as a test (ensure it runs after the database sync)
_database.sequelize.sync().then(/*#__PURE__*/ _async_to_generator(function() {
    var users, error;
    return _ts_generator(this, function(_state) {
        switch(_state.label){
            case 0:
                _state.trys.push([
                    0,
                    2,
                    ,
                    3
                ]);
                return [
                    4,
                    _user1.User.findAll()
                ];
            case 1:
                users = _state.sent();
                console.log('Users:', users);
                return [
                    3,
                    3
                ];
            case 2:
                error = _state.sent();
                console.error('Error fetching users:', error.message);
                return [
                    3,
                    3
                ];
            case 3:
                return [
                    2
                ];
        }
    });
}));
// Start the server
app.listen(port, function() {
    console.log("Server is running on http://localhost:".concat(port));
});
var _default = app;
