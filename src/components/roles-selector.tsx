"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  useSwitch,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RolesSelector() {
  const [role, setRole] = useState<string | null>(null);
  const onRoleChange = (role: string) => {
    setRole(role);
  };

  const router = useRouter();
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4 h-full w-full">
        <Card
          className="py-4 h-[50vh] w-full cursor-pointer  active:outline active:outline-primary-500 focus:outline focus:outline-primary-500"
          onFocus={() => onRoleChange("o")}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-2xl">Organiser</h4>
            <small className="text-default-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et iure
              illum accusantium nostrum maxime alias ipsam nihil officiis libero
              aspernatur!
            </small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full h-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
            />
          </CardBody>
        </Card>
        <Card
          className="py-4 h-[50vh] w-full cursor-pointer  active:outline active:outline-primary-500 focus:outline focus:outline-primary-500"
          onFocus={() => onRoleChange("p")}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-2xl">Player</h4>
            <small className="text-default-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et iure
              illum accusantium nostrum maxime alias ipsam nihil officiis libero
              aspernatur!
            </small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full h-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
            />
          </CardBody>
        </Card>
      </div>
      <div className=" flex justify-center">
        {role === null ? null : (
          <Button
            size="lg"
            className="mt-4"
            color="primary"
            variant="shadow"
            onClick={() => {
              if (role === "o") {
                router.push("organizer");
              } else {
                router.push("player");
              }
            }}
          >
            {"Let's Go!"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default RolesSelector;
