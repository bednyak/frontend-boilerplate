"use client";

import { useState } from "react";
import { Input } from "../../../../uikit/components/Input";
import { Dictionary } from "@/infrastructure/localization";
import { Button } from "../../../../uikit/components/Button";
import { ArrowRightIcon, MicrophoneIcon, SearchIcon } from "@/uikit/icons";

interface IProps {
  translations: Dictionary;
}

export function Search({ translations }: IProps) {
  const [searchText, setSearchText] = useState("");

  function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function onMicrophoneClick() {
    console.log("Microphone clicked");
  }

  function onSearch() {
    console.log("Search clicked");
  }

  return (
    <div className="input-group w-full flex flex-row items-center">
      <Input
        placeholder={translations.header.searchPlaceholder}
        value={searchText}
        onChange={onSearchChange}
        className="border-none bg-white"
        flexDirection="row"
        leftIcon={<SearchIcon />}
        rightIcon={
          <button onClick={onMicrophoneClick}>
            <MicrophoneIcon />
          </button>
        }
        containerClassName="w-full"
      />
      <Button
        onClick={onSearch}
        text={translations.header.searchButton}
        className="uppercase"
        rightIcon={<ArrowRightIcon />}
      />
    </div>
  );
}
