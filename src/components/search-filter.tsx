"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Props<T> {
  items: T[];
  placeholder: string;
  filterFn: (item: T, query: string) => boolean;
  children: (filtered: T[]) => React.ReactNode;
}

export function SearchFilter<T>({ items, placeholder, filterFn, children }: Props<T>) {
  const [query, setQuery] = useState("");
  const filtered = query.trim() ? items.filter((item) => filterFn(item, query.toLowerCase())) : items;

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>
      {children(filtered)}
    </div>
  );
}
