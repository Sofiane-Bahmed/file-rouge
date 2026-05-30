const ServiceItem = (props) => {
  return (
    <div className="w-full px-2 group flex flex-col items-center">
      <div className="mb-4 p-4 bg-gradient-to-br from-[#57F2CC] to-[#007749] rounded-2xl shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <i className={`fa ${props.icon} text-2xl text-white`}></i>
      </div>
      
      <h5 className="text-lg font-bold text-white mb-2 group-hover:text-[#57F2CC] transition-colors duration-300">
        {props.service}
      </h5>
      
      <p className="text-gray-100 text-xs md:text-sm leading-snug opacity-80 group-hover:opacity-100 transition-opacity duration-300 max-w-[220px]">
        {props.text}
      </p>
    </div>
  );
};

export default ServiceItem;