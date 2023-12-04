"use client";
import {
  Avatar,
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  starWars,
} from "unique-names-generator";
import { IoIosRefresh } from "react-icons/io";
import License from "./license";

const config: Config = {
  dictionaries: [adjectives, starWars],
};

type Tag = {
  name: string;
  id: number;
  avatar: string;
};

const tags: Tag[] = [
  {
    name: "Blockchain",
    id: 1,
    avatar: "",
  },
  {
    name: "Arweave",
    id: 2,
    avatar: "",
  },
  {
    name: "Atomic",
    id: 3,
    avatar: "",
  },
  {
    name: "Quest",
    id: 3,
    avatar: "",
  },
];

function CollectionAttributes() {
  const [collectionName, setCollectionName] = useState<string>(
    uniqueNamesGenerator(config)
  );
  return (
    <div className="mt-4 flex flex-col gap-3">
      <Input
        size="md"
        type="name"
        defaultValue={collectionName}
        value={collectionName}
        label="Collection Name"
        placeholder="Give your collection a Fantastic name!"
        endContent={
          <Button
            variant="bordered"
            onClick={() => {
              setCollectionName(uniqueNamesGenerator(config));
            }}
          >
            <IoIosRefresh />
          </Button>
        }
      />
      <Select
        items={tags}
        label="Select your Tags"
        isMultiline={true}
        selectionMode="multiple"
        placeholder="Choose wisely!"
        labelPlacement="inside"
        classNames={{
          base: "w-full",
          trigger: "min-h-unit-12 py-2",
        }}
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.data?.name}</Chip>
              ))}
            </div>
          );
        }}
      >
        {(tag) => (
          <SelectItem key={tag.id} textValue={tag.name}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={tag.name}
                className="flex-shrink-0"
                size="sm"
                src={tag.avatar}
              />
              <div className="flex flex-col">
                <span className="text-small">{tag.name}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <Textarea
        label="Description"
        placeholder="Make your collection stand out..."
        className="w-full"
      />
      <License />
      <Button color="primary">Create Game</Button>
    </div>
  );
}

export default CollectionAttributes;
