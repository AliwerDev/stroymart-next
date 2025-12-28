import StarButtonSvg from '@/components/icons/StarButtonSvg.';

const BenifitItem = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="p-5 bg-gray-50 rounded-xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] outline-gray-200 inline-flex justify-start items-start gap-3">
      <StarButtonSvg className="w-10 h-10 min-w-8 min-h-8" />
      <div className="inline-flex flex-col justify-start items-start gap-2">
        <p className="w-full justify-start text-slate-900 text-xl font-semibold leading-6">
          {title}
        </p>
        <p className="w-full justify-start text-slate-900/80 text-base font-medium leading-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BenifitItem;
