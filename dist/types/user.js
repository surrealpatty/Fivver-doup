// Type guard to check if user exists in the request
export function isUser(req) {
    return req.user !== undefined; // Explicitly checks if user is set in the request
}
//# sourceMappingURL=user.js.map