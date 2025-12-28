import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">
            404
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('Page not found')}</h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          {t(
            'Sorry, the page you are looking for does not exist. It may have been moved or deleted.'
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            {t('Go back')}
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-all duration-200 inline-block"
          >
            {t('Go home')}
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-brand-100 to-brand-50 rounded-full opacity-50 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}
