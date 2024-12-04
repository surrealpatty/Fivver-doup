// src/controllers/serviceController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createService", {
    enumerable: true,
    get: function() {
        return createService;
    }
});
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createService = async (req, res)=>{
    try {
        const { title, description, price, userId } = req.body;
        const newService = await _services.default.create({
            title,
            description,
            price,
            userId
        });
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating service',
            error
        });
    }
};

//# sourceMappingURL=serviceController.js.map