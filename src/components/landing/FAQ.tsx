'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDownIcon } from '../icons';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'Buyurtmani qanday berishim mumkin?',
    answer:
      'Siz mahsulotni “Savatga qo‘shish” orqali tanlab, sayt orqali yoki telefon orqali buyurtma bera olasiz.',
  },
  {
    question: 'Yetkazib berish muddati qancha?',
    answer: 'Yetkazib berish muddati hududingizga qarab 1–3 ish kunini tashkil etadi.',
  },
  {
    question: 'To‘lov usullari qanday?',
    answer: 'Naqd, karta orqali yoki onlayn to‘lovlar mavjud.',
  },
  {
    question: 'Mahsulotlar kafolatlanadimi?',
    answer: 'Ha, barcha mahsulotlar rasmiy kafolat bilan ta’minlanadi.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border-b border-b-slate-200 last:border-b-0">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={twMerge(
                'flex w-full items-center justify-between cursor-pointer px-6 py-4 text-left text-base font-medium transition-colors',
                isOpen ? 'bg-primary text-white' : 'bg-white text-text1'
              )}
            >
              {item.question}

              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDownIcon className="h-5 w-5" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden bg-primary/40"
                >
                  <div className="px-6 py-4 text-sm leading-relaxed">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
