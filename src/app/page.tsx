// src/app/page.tsx
import React, { useContext } from "react";
import { MyContext } from "@/app/layout";

interface HomeProps {
  [key: string]: unknown;
}

export default function Home({}: HomeProps) {
  const { message } = useContext(MyContext);

  return (
    <>
      <div>
        <h1>{message}</h1>
      </div>
    </>
  );
}
