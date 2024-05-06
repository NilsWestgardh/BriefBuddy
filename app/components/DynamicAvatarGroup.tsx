import React from "react";
// Custom Components
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function DynamicAvatarGroup() {
  // TODO: Replace with dynamic data and logic
  return (
    <AvatarGroup
      max={4}
      total={10}
      spacing={6}
      sx={{
        '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 14 },
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 20, height: 20 }}
        className="
          bg-red-500
          border-neutral-700
        "
      />
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 20, height: 20 }}
      />
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 20, height: 20 }}
      />
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 20, height: 20 }}
      />
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 20, height: 20 }}
      />
    </AvatarGroup>
  )
}