const AboutItems = (props) => {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#57F2CC]/20 flex items-center justify-center">
          <i className="fa fa-check text-[#57F2CC] text-xs"></i>
        </div>
        <p className="text-gray-700 font-medium leading-relaxed">
          {props.content}
        </p>
      </div>
    );
  };
  
  export default AboutItems;