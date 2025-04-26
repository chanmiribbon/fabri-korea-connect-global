
import React, { useState } from "react";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Image, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample suggestions data - in a real app, this would come from your backend
const suggestions = [
  { id: 1, text: "귀걸이 파츠", category: "accessories" },
  { id: 2, text: "귀걸이 침", category: "materials" },
  { id: 3, text: "진주 귀걸이", category: "accessories" },
  { id: 4, text: "귀걸이 도구", category: "materials" },
  { id: 5, text: "귀걸이 부자재", category: "materials" },
];

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would implement the image search logic
      console.log("Image uploaded:", file);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder="상품 검색..." 
              className="h-9"
              onFocus={() => setOpen(true)}
            />
            {open && (
              <CommandList className="absolute w-full bg-white rounded-b-lg border-t">
                <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
                <CommandGroup heading="추천 검색어">
                  {suggestions.map((item) => (
                    <CommandItem 
                      key={item.id}
                      onSelect={() => {
                        console.log("Selected:", item);
                        setOpen(false);
                      }}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {item.text}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={() => setShowImageUpload(!showImageUpload)}
        >
          <Image className="h-4 w-4" />
        </Button>
      </div>

      {showImageUpload && (
        <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg border shadow-lg">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
