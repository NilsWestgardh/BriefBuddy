import React from "react";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>ProtectedRoutesLayout</h1>
      {children}
    </div>
  )
}