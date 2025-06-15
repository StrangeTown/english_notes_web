import React from "react";
import headerImagePeppaPig from "../../../assets/images/header.png";

const Header: React.FC = () => (
  <div className="relative w-full mb-4">
    <img
      src={headerImagePeppaPig}
      alt="Peppa Pig Sky"
      className="w-full max-h-56 object-cover rounded-tl-2xl rounded-tr-2xl"
    />
    <div
      className="pointer-events-none absolute left-0 right-0 bottom-0 h-[50%]"
      style={{
        background:
          'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
      }}
    />
  </div>
);

export default Header;
