import { chain } from './middlewares/chain';
import { localeMiddleware } from './middlewares/localeMiddleware';

export default chain([localeMiddleware]);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
