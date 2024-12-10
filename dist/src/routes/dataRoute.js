// src/routes/dataRoute.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Define a route to fetch data from an external API
router.get('/fetch-data', async (req, res)=>{
    try {
        const response = await _axios.default.get('http://example.com/api/data');
        res.json(response.data); // Send back the fetched data
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching data'
        });
    }
});
const _default = router;

//# sourceMappingURL=dataRoute.js.map