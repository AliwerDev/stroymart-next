import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import FaqAccordion from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';
import Button from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import BenifitItem from './_components/BenifitItem';
import CommentItem from './_components/CommentItem';
import HowToWorkItem from './_components/HowToWorkItem';

export default async function SellerPage() {
  const t = await getTranslations();

  return (
    <main>
      <header className="container !py-5">
        <nav className="flex justify-between items-center">
          <div className="logo">
            <Link href="/">
              <Image
                src="/images/logo-admin.png"
                width={100}
                height={40}
                className="w-auto h-10"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="flex gap-2 items-center">
            <Button variant="secondary">{t('Сотувчи йўриқномаси')}</Button>
            <LanguageSwitcher />
            <Button variant="secondary">{t('Кириш')}</Button>
            <Button variant="primary">{t('Сотувчи бўлиш')}</Button>
          </div>
        </nav>
      </header>

      <section id="cover" className="bg-text1">
        <div className="container">
          <div className="flex justify-between items-center gap-10">
            <div className="flex flex-col gap-4 flex-1 max-w-2xl">
              <h2 className="justify-start text-white text-4xl leading-[48px] font-bold">
                {t('seller_cover_title')}
              </h2>
              <div className="justify-start text-white/80 text-lg leading-[28px] mb-4 font-normal">
                {t('seller_cover_description')}
              </div>
              <Button variant="primary" className="w-fit">
                {t('Ҳозир савдони бошланг')}
              </Button>
            </div>
            <div className="md:block hidden flex-1 relative">
              <Image
                src="/images/seller/seller-cover.png"
                width={600}
                height={600}
                className="object-cover w-full h-full max-w-2xl ml-auto"
                alt="Cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container xl:!py-28">
          <div className="flex justify-between gap-6">
            <div className="md:block hidden flex-1 relative">
              <Image
                src="/images/seller/seller-about.png"
                width={600}
                height={600}
                className="object-cover w-full h-full max-w-2xl"
                alt="About"
              />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="justify-start text-text1 text-3xl leading-[42px] font-bold">
                {t('seller_about_title')}
              </h2>
              <div className="justify-start text-text1/80 text-lg leading-[28px] mb-4 font-normal whitespace-pre-wrap">
                {t('seller_about_description')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-[#F5F8FB]">
        <div className="container xl:!py-24">
          <div className="max-w-2xl mb-6 lg:mb-14 text-2xl xl:text-4xl mx-auto text-center justify-center text-slate-900 font-bold xl:leading-[48px]">
            {t('seller_benefits_title')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
            <BenifitItem
              description={t('seller_benefits_1_description')}
              title={t('seller_benefits_1_title')}
            />
            <BenifitItem
              description={t('seller_benefits_2_description')}
              title={t('seller_benefits_2_title')}
            />
            <BenifitItem
              description={t('seller_benefits_3_description')}
              title={t('seller_benefits_3_title')}
            />
            <BenifitItem
              description={t('seller_benefits_4_description')}
              title={t('seller_benefits_4_title')}
            />
          </div>
        </div>
      </section>

      <section id="work" className="overflow-hidden relative">
        <div className="container xl:!py-24 flex items-center min-h-[750px]">
          <div className="flex flex-col gap-4 max-w-xl">
            <h2 className="justify-start text-text1 text-4xl leading-[48px] font-bold">
              {t('seller_work_title')}
            </h2>
            <div className="justify-start text-text1/80 text-lg leading-[28px] mb-4 font-normal">
              {t('seller_work_description')}
            </div>
            <Button variant="primary" className="w-fit">
              {t('Сотувчи бўлиш')}
            </Button>
          </div>

          <div className="absolute top-1/2 right-[650px] -translate-y-1/2">
            <Image src="/images/seller/seller-mobile.png" width={200} height={400} alt="Cover" />
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <div className="relative">
              <Image src="/images/seller/seller-desktop.png" width={700} height={600} alt="Cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="how-to-work" className="bg-[#F5F8FB]">
        <div className="container xl:!py-24">
          <div className="max-w-2xl mb-6 lg:mb-14 text-2xl xl:text-4xl mx-auto text-center justify-center text-slate-900 font-bold xl:leading-[48px]">
            {t('seller_how_to_work_title')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-7">
            <HowToWorkItem
              title={t('seller_how_to_work_1_title')}
              description={t('seller_how_to_work_1_description')}
              image="/images/seller/figure1.png"
            />
            <HowToWorkItem
              title={t('seller_how_to_work_2_title')}
              description={t('seller_how_to_work_2_description')}
              image="/images/seller/figure2.png"
            />
            <HowToWorkItem
              title={t('seller_how_to_work_3_title')}
              description={t('seller_how_to_work_3_description')}
              image="/images/seller/figure3.png"
            />
            <HowToWorkItem
              title={t('seller_how_to_work_4_title')}
              description={t('seller_how_to_work_4_description')}
              image="/images/seller/figure4.png"
            />
          </div>
        </div>
      </section>

      <section id="comments">
        <div className="container xl:!py-24">
          <div className="max-w-4xl mb-6 lg:mb-14 text-2xl xl:text-4xl mx-auto text-center justify-center text-slate-900 font-bold xl:leading-[48px]">
            {t('seller_comments_title')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-7">
            <CommentItem
              text=""
              fullName="Jordan Hughes"
              position="Creator of Untitled UI"
              image="/images/seller/user.png"
              grade={5}
            />
            <CommentItem
              text=""
              fullName="Jordan Hughes"
              position="Creator of Untitled UI"
              image="/images/seller/user.png"
              grade={5}
              style={{
                background: 'linear-gradient(180deg, #E6FAD9 0%, #FFF 100%)',
                boxShadow: '0 40px 64px -32px rgba(14, 14, 14, 0.04)',
              }}
            />
            <CommentItem
              text=""
              fullName="Jordan Hughes"
              position="Creator of Untitled UI"
              image="/images/seller/user.png"
              grade={5}
              style={{
                background: 'linear-gradient(180deg, #EDF8FF 0%, #FFF 100%)',
                boxShadow: '0 40px 64px -32px rgba(14, 14, 14, 0.04)',
              }}
            />
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#F5F8FB]">
        <div className="container xl:!py-24">
          <div className="max-w-4xl mb-6 lg:mb-14 text-2xl xl:text-4xl mx-auto text-center justify-center text-slate-900 font-bold xl:leading-[48px]">
            {t('seller_faq_title')}
          </div>

          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
