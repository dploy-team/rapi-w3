/**
 *
 * REF: https://github.com/serhiisol/ngx-auth
 */
export {W3AuthService} from './auth.service';
export {W3MeService} from './me.service';
export {W3AuthAbstractService} from './auth-abstract.service';
export {W3PublicGuard} from './guards/public.guard';
export {W3ProtectedGuard} from './guards/protected.guard';
export {
    W3_AUTH_SERVICE,
    W3_PUBLIC_FALLBACK_PAGE_URI,
    W3_PROTECTED_FALLBACK_PAGE_URI
} from './tokens';
export {W3AuthModule} from './auth.module';
export {UserModel} from './auth.model';
