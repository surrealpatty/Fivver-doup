"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const serviceController_1 = require("../controllers/serviceController");
const router = (0, express_1.Router)();
router.put('/services/:id', authMiddleware_1.authenticateJWT, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, serviceController_1.updateService)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
