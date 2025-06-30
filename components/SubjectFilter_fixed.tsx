"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "./ui/select";
import { subjects } from "@/constants";

const SubjectFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") || "all";

  const [selectedSubject, setSelectedSubject] = useState(subjectParam);

  const updateSearchParams = (newSubject: string) => {
    const params = new URLSearchParams(searchParams);
    if (newSubject && newSubject !== "all") {
      params.set("subject", newSubject);
    } else {
      params.delete("subject");
    }
    router.replace(`/companions?${params.toString()}`);
  };

  useEffect(() => {
    if (pathname === "/companions") {
      updateSearchParams(selectedSubject);
    }
  }, [selectedSubject, pathname]);

  useEffect(() => {
    setSelectedSubject(subjectParam);
  }, [subjectParam]);

  return (
    <Select onValueChange={setSelectedSubject} value={selectedSubject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject}>
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
