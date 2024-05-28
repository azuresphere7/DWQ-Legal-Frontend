import React from "react";

const AuthBannerImage = () => {
  // Banner image used for login and signup page
  return (
    <div style={{
      width: "100%",
      height: "100%",
      backgroundImage: "url(/assets/images/banners/auth-banner.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      animation: "fade-in-anim 1s"
    }} className="hidden lg:block"></div>
  );
};

export default AuthBannerImage;
