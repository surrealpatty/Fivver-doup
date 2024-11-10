export function authMiddleware(req: any, res: any, next: any): any;
export function authorizeRoles(...allowedRoles: any[]): (req: any, res: any, next: any) => any;
export function authorizeSubscription(requiredSubscription: any): (req: any, res: any, next: any) => any;
