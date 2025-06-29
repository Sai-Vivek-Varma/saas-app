"use client";

import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  const debounceQuery = useDebounce(searchQuery, 500);

  const updateSearchParams = (newQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (newQuery.trim()) {
      params.set("topic", newQuery);
    } else {
      params.delete("topic");
    }

    router.replace(`/companions?${params.toString()}`);
  };

  useEffect(() => {
    if (pathname === "/companions" && debounceQuery !== query) {
      updateSearchParams(debounceQuery);
    }
  }, [debounceQuery, pathname, query]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <div className="relative border border-black rounded-lg gap-2 px-2 py-1 h-fit flex items-center">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        placeholder="search companions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="outline-none"
      />
    </div>
  );
};

export default SearchInput;
