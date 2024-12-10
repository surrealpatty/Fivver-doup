// src/routes/auth.ts
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
const _express = require("express");
const _user = require("@models/user");
const router = (0, _express.Router)();
router.post('/register', async (req, res)=>{
    const { email, username, password, role = 'free', tier = 'free' } = req.body; // Default role and tier
    try {
        // Hash password before saving user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await _user.User.create({
            email,
            username,
            password: hashedPassword,
            role,
            tier
        });
        res.status(201).json({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating user'
        });
    }
});
const _default = router;

//# sourceMappingURL=auth.js.map