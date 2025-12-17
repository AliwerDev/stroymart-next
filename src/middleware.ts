import { authMiddleware } from './middlewares/authMiddleware';
import { chain } from './middlewares/chain';
import { localeMiddleware } from './middlewares/localeMiddleware';

export default chain([authMiddleware, localeMiddleware]);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
