import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
export const services: any[] = [
    AuthService,
    JwtService
];

export * from './auth.service';
export * from './jwt.service';