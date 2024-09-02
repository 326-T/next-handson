"use client";

import { useParams } from "next/navigation";

export default function Name() {
  const params = useParams();

  return <h1>Hello, {params.name}!</h1>;
}
