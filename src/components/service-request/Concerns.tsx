"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ConcernsProps {
  concerns: { value: string; label: string }[];
  onSelect: (value: string) => void;
  value?: string;
}

export default function Concerns({ concerns, onSelect, value: externalValue }: ConcernsProps) {
  const [open, setOpen] = useState(false);
  
  const [internalValue, setInternalValue] = useState("");
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setInternalValue(newValue);
    setOpen(false);
    onSelect(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? concerns.find((concern) => concern.value === value)?.label
            : "Select concern..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search Concern..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {concerns.map((concern) => (
                <CommandItem
                  key={concern.value}
                  value={concern.value}
                  onSelect={handleSelect}
                >
                  {concern.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === concern.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}