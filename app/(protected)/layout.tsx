import React from "react";
// Custom Components
import Sidebar from "@/app/components/Sidebar";
// Components
import Box from "@mui/material/Box";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      id="protected-routes-layout"
      className="
        flex
        flex-row
        justify-between
        items-start
        w-full
        h-full
      "
    >
      <Sidebar />
      {children}
    </Box>
  )
}