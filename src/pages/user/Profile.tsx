import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, Divider, Paper } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import WebsiteIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ProfileBannerImage from "../../components/form/ProfileBannerImage";
import ProfileRecord from "../../components/shared/ProfileRecord";
import { formatCreditCardNumber, isValidPaymentInfo } from "../../utils/functions";

export default function ProfilePage() {
  const { user } = useSelector(({ userReducer }) => userReducer);

  return (user && user.firstName) ? (
    <main className="flex flex-col items-center w-full">
      <ProfileBannerImage />

      <div className="container flex justify-center mx-4 pb-16">
        <Paper className="flex flex-col max-w-[600px] p-8 -mt-20 z-10 fade-up-anim anim-500">
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 border-2 border-gray-600 bg-gray-500 text-7xl text-gray-200">{user.firstName[0]}</Avatar>
            <h1 className="m-4 text-3xl">{user.firstName} {user.lastName}</h1>
          </div>

          <div className="my-6">
            <ProfileRecord icon={EmailIcon} content={user.email} />
            <ProfileRecord icon={BusinessIcon} content={user.firmName} />
            <ProfileRecord icon={WebsiteIcon} content={user.firmDomain} />
            <ProfileRecord icon={LocationOnIcon} content={`${user.address1} ${user.address2} ${user.city}, ${user.state}, ${user.zip}`} />
          </div>

          <Divider flexItem />

          <div className="flex justify-center p-4 my-4">
            {
              isValidPaymentInfo(user) ? (
                <Paper className="flex justify-between w-full p-4 bg-slate-700">
                  <p>{formatCreditCardNumber(user.creditNumber)}</p>
                  <p>VISA</p>
                </Paper>
              ) : (
                <h1 className="p-4 text-gray-400">No payment card linked</h1>
              )
            }
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              className="w-80 h-12 my-4 bg-primary font-bold tracking-widest"
            >
              {"update profile"}
            </Button>
          </div>
        </Paper>
      </div>
    </main>
  ) : <></>;
}