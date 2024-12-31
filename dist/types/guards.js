// Type guard to ensure req.user is of type UserPayload
export function isUser(user) {
    return typeof user === 'object' && user !== null && typeof user.id === 'string' && typeof user.email === 'string';
}
//# sourceMappingURL=guards.js.map