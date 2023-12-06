"use client";

import ImageUploadComponent from "@/components/drop-area";
import CollectionContext from "@/contexts/collection-context";
import React from "react";

function OrganizerPage() {
  const [collection, setCollection] = React.useState({
    asset: [],
    game: "",
    description: "",
    topics: [],
    owner: "",
  });
  return (
    <div className="container">
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
