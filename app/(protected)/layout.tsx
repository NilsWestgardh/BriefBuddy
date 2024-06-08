import React from "react";
// Custom Components
import Sidebar from "@/app/components/navigation/sidebar/Sidebar";
import CustomAppBar from "@/app/components/navigation/appbar/CustomAppBar";
// Components
import Box from "@mui/material/Box";

export default async function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Box
      id="protected-routes-layout"
      className="
        flex
        md:flex-row
        flex-col
        justify-start
        items-start
        w-full
        h-full
      "
    >
      <Sidebar />
      <CustomAppBar />
      {children}
    </Box>
  )
}