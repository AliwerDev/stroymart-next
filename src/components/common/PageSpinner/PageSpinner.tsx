const PageSpinner = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-ping delay-100 duration-1000 rounded-full h-12 w-12 border-2 border-brand-500"></div>
      </div>
    </div>
  );
};

export default PageSpinner;
