"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Double() {
  const query = useSearchParams().get("number");
  const input = useMemo(() => (query ? parseInt(query) : 0), [query]);

  return (
    <h1>
      {input} * 2 = {input * 2}
    </h1>
  );
}
