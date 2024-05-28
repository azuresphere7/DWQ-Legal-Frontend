import React from "react";
import { ProfileRecordProps } from "../../types/props";

const ProfileRecord = (props: ProfileRecordProps) => {
  return (
    <div className="flex items-center px-4 py-2 text-lg">
      <props.icon />
      <p className="mx-3">{props.content}</p>
    </div>
  );
};

export default ProfileRecord;
