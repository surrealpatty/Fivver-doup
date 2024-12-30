// Define a type guard to check if an object is a valid UserPayload
export function isUser(user) {
    return (user &&
        typeof user.id === 'string' &&
        typeof user.email === 'string' &&
        (user.username === undefined || typeof user.username === 'string') &&
        (user.role === undefined || typeof user.role === 'string') &&
        (user.tier === undefined || typeof user.tier === 'string'));
}
