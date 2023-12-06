"use client";
import { Asset } from "@/types/post";

import { createContext } from "react";

type CollectionContextType = {
  collection: {
    asset: Asset[];
    game: string;
    description: string;
    topics: string[];
    owner: string;
  };
  setCollection: any;
};

const CollectionContext = createContext<CollectionContextType>({
  collection: {
    asset: [],
    game: "",
    description: "",
    topics: [],
    owner: "",
  },
  setCollection: () => {},
});

export default CollectionContext;
