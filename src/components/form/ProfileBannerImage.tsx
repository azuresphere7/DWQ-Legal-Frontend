import React from "react";

const ProfileBannerImage = () => {
  // Banner image used for user profile page
  return (
    <div style={{
      width: "100%",
      height: "320px",
      backgroundImage: "url(/assets/images/banners/book.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      animation: "fade-in-anim 1s"
    }}></div>
  );
};

export default ProfileBannerImage;
