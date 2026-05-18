import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`flex gap-2 items-center justify-center`}>{children}</div>
    </>
  );
}
