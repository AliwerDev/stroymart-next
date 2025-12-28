import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { PhoneIcon } from '../icons';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-text3">
      <div className="container">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-semibold leading-relaxed text-white">
              Sementdan tortib, elektr asboblargacha — tez va ishonchli yetkazib beramiz.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Kontaktlar
            </h4>

            <div className="space-y-3">
              <a
                href="tel:+998712020500"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700/60">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span className="text-sm">+998 (71) 202-05-00 (122)</span>
              </a>

              <a
                href="tel:+998712020501"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700/60">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span className="text-sm">+998 (71) 202-05-01 (122)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="my-12 border-t border-dashed border-slate-600/50" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-slate-400">Barcha huquqlar himoyalangan va litsenziyalangan</p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700/60 text-white hover:bg-slate-600 transition"
            >
              <FaTelegramPlane size={16} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700/60 text-white hover:bg-slate-600 transition"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700/60 text-white hover:bg-slate-600 transition"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700/60 text-white hover:bg-slate-600 transition"
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
