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
import React, { useEffect, useState } from "react";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  starWars,
} from "unique-names-generator";
import { IoIosRefresh, IoMdAdd, IoMdClose } from "react-icons/io";
import License from "./license";
import Arweave from "arweave";
import { Asset } from "@/types/post";
import { FileWithPreview } from "./drop-area";
import { JWKInterface } from "arweave/node/lib/wallet";
import ArweaveContract from "@/classes/arweave";
import contractData from "../contracts/contractData.json";

// read wallet key from file system
const walletKey = {
  kty: "RSA",
  e: "AQAB",
  n: "qM3DB1QFAjx7xCWvoT0J0C4HH1INz-YAfBDjfUmr3htSjMepF_4KvX5vPDVE16EODib4bupm2C63tbKqxI9r-KCk5bu8JQrYf0j_tXaNXgESzu9Wp_N404M9OA1N3VUA9tPMmJ5JpIq90nrCDe7n3kTQC8VU6APFTxOINWgvboPkR2X5SnGRGAwBfIcjRoj6MqbwUwdNhIJ4EU5yUbt9_9UKqfKD8JRbn_DOooaFckixagNY1PwPVfrY4m6pG8uVK_s02xdI7VpmTz2R_FvXq1sOQqyrCUCJI69kXVuzBM3IRvNYCWQYRyKsTtdZMsVYrY4MkVS9YtNdFcmITgzIYn_Q4bL76ZzOIAfb23ftZ4Whn93oGP9JWd4TM0mzPDKoYt6vNjpkSdvoWEqytHBNsY9GgOR9sXs4u487WXe1cXSee6HmiAzCI35m2uzOI9jPkvSqFaV6_MW4cYywuqZ1vzmIGTilausf3EDchnwRYSrHwR8GluUkevOKQKH4D25ysoLdH-0kfqx30R5q3lVFQwejk_xjkBpHWljA2f6qclLJxa8PENskFb_cUkwlEHPKZf-6td_rF_OzH0NXdjVKe1UTlp2e6wuMqWGIo5BubPQqVMrbLQOLK-gsrtbDcW86YBPftFKLPBsICQlD6HGhD-oTJzsXW1y0_redZDHzOJc",
  d: "kPqAGago0R3fcrynVkVVS05s4ZKYuEkje2sJ505B5XXz9WN6MFgJI20W3lAl-0ihCLihwKljgSLGt7BnCIDhy901IvaVhf8FqHSq4lCa4_TqEX7wHzl2ObtK9fw_NuxN8rA_1YiFWWOr2r2CM3NQA894G9P0s3yhluQApVYA_tsaUdQcQrq9Ujjlge2S936n3J8SY00vX7KqqrqEZvwwIGz6RrI6bYMOGpU488-zh081yQZs4ihGh6L1aax_Y5b7XJXZdJ5QDUMKAd6wply_I7YFzm_8Ser6ngKCocgjPen7rCxOHWqxi08VTHWab4edPRp2Ys-0BM_h79dyUQ6bfs96PN1oFNbtrcFoOqg8mT_MI1l73xTJ0K0aTwT8152DMeUMBMj2zvTTa4U5lBcUSbI9oGrNNQ5z0H4nseUquAusHzDK0G8jFRsau8XfTeRDY0kTmDYm9kJ0U6h60nYIgLOsjB7Kx0dTWb7sFEqSTeN5JoS25L6sZ0y_Ar-xb-WdHE-JqFh5mXS2gwQQyL8h0IEpnu4UobOgnISaO55cp4Rw21NIGA6nTPcDt74pemRMxMQW6Q19xwaRqnkEBj5qT8hiOUaeGsd6mtRdS57ZA_ke7shyHLfC_vKUN90AqZl0FRitvrqTdwK6jYrCI5VOfHpXuCcAaxIAHUiqVvbWfIE",
  p: "4MJJMfgVIbUj-rIeGD62bhyBUm2gGkpb8QahYPWVXvTJIMGGSnFkyC_6YpIVwtfXswieAgfCml9fToXAthMtdGIMBP6N0xHfDHU1cXJnNiU7Xlcv2OB0Q_grfZoHMoUhbNy4Btl6TQfIMg9Eg7l3PZ_tsQMUBr1CS3Xy2fh1-FdRcctnS2gGSBYQP95cMY0B_HhXyA5D43hsLHoTccKw1epnm73a_T7RdiqTCGQ4ZX4fqYGuKpwvfI-oscdU1tjbjytfExO3c3Qzx9MWAPHhe55P9vz4jw3ZKDPyjJoUQYMkUgMBH1dBSbX2S4hG5stusyEV6i_3KVQ8ymdXWe5tQQ",
  q: "wERk1HD9ASoqDPsvVXh_q5K7LeLeAVvNomj0kfVzJk0C5dtXRZP-f4XFn6lqr15st3korsJlkU2UJjhjAeC3AxGcjHlJ8MHRRIXIpSoQOQQPdgTh6D3lL8AXWu0neLYHWyI0a9lrk1NnWKaAkBoz6oygO2_PFo7j39enBEYY4G7Pai0WePeVHwTEsRGOK3CdHtNGLN3_OhYKH-3w0o3QEGcZG23d1_e-Mbj-ToNdURdFSpg-jVu7PepdqiAJRV9A3BjrdgHcNDLrPyx7WDlVYSW1l9VSWbPR9CDyrf2LbrNjRJNmkTm2Vx1XUPdS03Q5QSaRoiYdPAcTj9Je55y31w",
  dp: "l9BDtn_WbjU3Pz-Oelvpx4hzhaTMjtWJMs2CtcZMBZ6cOAbf2WqsY1ec7XW1Qy2d4a1BZSeut60R6C0KFTHw8vrDGaCDVX1txrFozt8yfe06I6gKhphdkAeSAL3IfMRV5n1TxDSjmmJWRBHx-nOM6lAbMgRdQ4wUunnJ9pcPwBXiylVUySdTjt9wTGO6rDGNlOYIjPWtv3j4wDYY6i9SWLuDDjx4LbR_sSxisjlXqp49brZMWTW0EZPLo4F7eb9y1kq6Zl1b_Z0Q2Llo1GyNHH27j54hmicFdlVYUMZGRlX5c3faCzxZuhsxaKV9Fql0dYQ0lEGf1gezJBgXdYRJwQ",
  dq: "g_kuYOhhsj_390sflYKN1_5y_y8_hh02zGlQnzOk48Bu4coqYHcSdQQkv9Bxi4i8BUBkHXkQcKmYrJd91lciKDgZhg7nIxxXAbr3G_AAjLJtzmvRiTGbNKidH2uz8Va5O-QBqZnnDoxsXtyDWOazhicbAVFhC7HvVsHXQca_4qYNN2tVhpkjQdRrEsPjG4xEPVl2TOvg-kUQlBQmftCa5fdus3Y5lbnXUpgR72CaWEQp6ucP4MX7g6dwvYsZ8gVNJwbv8OOb_DSLZ6Sn0cohAfr5aAwkZ7BXyEQpcCaeY9E8rWCkQcEkmS1ptwjdUInxlvfbdTrGTGLrGYikXkUjpw",
  qi: "z7IdEnVO6ypzcmCv2oovqQd5M1xft9qwZnoDO54xCyU29c9EyK0fH0Urnfdzw1cu2Tl-ayyZg1V9rFWDF66UvdEQIrpbuTV5xru_KeRZh8QYZlXwJdt7E2golMwpQOX6p5t2Ze3LilTjLCsoCzXaZyuiKAjTBmSWS6F2MyTAxqXmpyXYw6Rp8QUzNO8wPa8-ULsJ_SR9QjxTZfsxtiGUsLW4B8zNs1MWBUYztVF8RYUwxb_t5obQwM_G1gDEu7cxmPjxGCgUUsDPfVkq35zorivPn7obqXIkO-lAd80iCn-WGU3x9A9pM__2Gmo9ptu1nkWov1wstaJBxRAhs1QD3w",
};

const arweaveContract = new ArweaveContract(walletKey);

const config: Config = {
  dictionaries: [adjectives, starWars],
};

const createData = (
  file: FileWithPreview,
  creatorId: string,
  tags: string[],
  shareData: {
    initialShares: Record<string, number>;
    totalShares: number;
    sharesRemaining: number;
    sharesSold: number;
  },
  description: string,
  license: string,
  title: string
) => {
  const data: Asset = {
    file: file,
    creatorId,
    tags: [
      {
        name: "Topics",
        value: JSON.stringify(tags),
      },
    ],
    shareData: {
      initialShares: {},
      totalShares: 0,
      sharesRemaining: 0,
      sharesSold: 0,
    },

    description: "",
    license: "",
    title: "",
  };
  return data;
};

function CollectionAttributes() {
  const [collectionName, setCollectionName] = useState<string>(
    uniqueNamesGenerator(config)
  );

  const [topics, setTopics] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(e.target.value);
  };

  const onChangeTopics = (e: any) => {
    if (topic === "") return;
    if (topic.split("").length > 1) {
      topic.split(" ").forEach((item: string) => {
        if (!topics.includes(item)) {
          setTopics((prev) => [...prev, item]);
        }
      });
      setTopic("");
      return;
    }
    setTopics((prev) => [...prev, topic]);
    setTopic("");
  };

  const onTopicChange = (e: any) => {
    setTopic(e.target.value);
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      <Input
        size="md"
        type="name"
        onChange={onChange}
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

      <Textarea
        label="Description"
        placeholder="Make your collection stand out..."
        className="w-full"
      />

      <div className="flex items-center gap-4">
        <Input
          size="sm"
          type="name"
          label="Topics"
          labelPlacement="inside"
          placeholder="Topics"
          className="w-full"
          value={topic}
          onChange={onTopicChange}
        />
        <Button
          className="w-auto "
          size="lg"
          color="primary"
          onClick={onChangeTopics}
        >
          Add Tag <IoMdAdd />
        </Button>
      </div>

      {
        <div className="flex flex-wrap gap-2">
          {topics.map((content, i) => (
            <Chip
              key={i}
              onClick={() => {
                setTopics((prev) => prev.filter((item) => item !== content));
              }}
              endContent={<IoMdClose />}
            >
              {content}
            </Chip>
          ))}
        </div>
      }
      <License />
      <Button color="primary">Create Game</Button>
    </div>
  );
}

export default CollectionAttributes;
