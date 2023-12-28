const Filters = () => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">New York Homes for Sale</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 })?.map((item, index) => (
          <div key={index} className="flex items-center">
            Teste
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
