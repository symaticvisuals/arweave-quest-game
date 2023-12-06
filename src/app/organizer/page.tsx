"use client";

import ImageUploadComponent from "@/components/drop-area";
import CollectionContext from "@/contexts/collection-context";
import { Vina_Sans as FontSerif } from "next/font/google";
import React from "react";

import { cn } from "@nextui-org/react";

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400"],
});

function OrganizerPage() {
  const [collection, setCollection] = React.useState({
    asset: [],
    game: "",
    description: "",
    topics: [],
    owner: "",
  });
  return (
    <div className="container ">
      <h1
        className={cn(
          "text-6xl text-purple-500 font-medium ml-5",
          fontSerif.className
        )}
      >
        GM Masters!
      </h1>
      <p className="text-2xl mb-4 ml-5">
        Empower Communities, Host Games & Reward NFTs with Questify.
      </p>
      <CollectionContext.Provider
        value={{
          collection,
          setCollection: () => {},
        }}
      >
        <ImageUploadComponent />
      </CollectionContext.Provider>
    </div>
  );
}

export default OrganizerPage;
