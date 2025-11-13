const PhoneFrame = ({ children }) => {
    return (
      <div
        className="
          hidden md:flex     /* hide on mobile */
          justify-center 
          items-center
          bg-gray-200
          rounded-[40px]
          p-4
          shadow-xl
        "
        style={{
          width: "420px",
          height: "85vh",
          border: "14px solid #000",
          borderRadius: "45px",
          position: "relative",
        }}
      >
        {/* Inner content area representing phone screen */}
        <div
          className="
            bg-white 
            overflow-y-auto
          "
          style={{
            width: "100%",
            height: "90%",
            borderRadius: "30px",
          }}
        >
          {children}
        </div>
  
        {/* Top notch */}
        <div
          className="
            md:block hidden
          "
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "160px",
            height: "30px",
            backgroundColor: "#000",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            marginTop: "4px",
          }}
        />
      </div>
    );
  };
  
  export default PhoneFrame;
  