import { chain } from './middlewares/chain';
import { localeMiddleware } from './middlewares/localeMiddleware';
import { permissionMiddleware } from './middlewares/permissionMiddleware';

export default chain([permissionMiddleware, localeMiddleware]);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
