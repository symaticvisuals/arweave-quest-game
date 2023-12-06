"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Input, Button, Dropdown, DropdownItem } from "@nextui-org/react";
import { useAppContext } from "@/contexts/AppContext";
import questions from "../constants/questions.json";
import { updateOwnership } from "@/utils/asset-ownership";
import { useApi } from "arweave-wallet-kit";

const Task = () => {
  const { question, rewards } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = React.useState({
    question: "",
    answer: "",
  });

  const [inputValue, setInputValue] = React.useState("");

  const [currentReward, setCurrentReward] = React.useState({
    reward: "",
    value: 0,
  });

  const onChangeQuestion = (e: any) => {
    setInputValue(e.target.value);
  };

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    setCurrentQuestion(randomQuestion);
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const [showReward, setShowReward] = React.useState(false);

  const api = useApi();
  const getWallet = async () => {
    const wallet = await api?.getActiveAddress();
    return wallet;
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen "
      style={{
        backgroundImage: "url(/assets/bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Image
        src="/Logo.svg"
        alt="Logo"
        width={150}
        height={75}
        className="mt-1"
      />
      {currentQuestion && (
        <h3 className="text-2xl text-zinc-100 text-center mb-4 font-semibold">
          {currentQuestion.question}
        </h3>
      )}
      <Dropdown>
        {rewards.map((reward) => (
          <DropdownItem key={reward.value}>{reward.label}</DropdownItem>
        ))}
      </Dropdown>
      <Input
        value={inputValue}
        onChange={onChangeQuestion}
        placeholder={question || "Enter your answer"}
        className="mb-4 w-full max-w-xs"
      />
      {showReward && (
        <Image
          width={300}
          height={300}
          src="https://arweave.net/Bv6M9vRhRcXi_KEwNXkUXHjdtLVD71AhVc7ccQC87VA"
          alt="nft"
        />
      )}

      {!showReward && (
        <Button
          className="w-full max-w-xs"
          onClick={async () => {
            if (inputValue === currentQuestion.answer) {
              const wallet = await getWallet();
              showReward ? setShowReward(false) : setShowReward(true);
              await updateOwnership(
                "Bv6M9vRhRcXi_KEwNXkUXHjdtLVD71AhVc7ccQC87VA",
                // create a record <string , number> for the reward
                { [currentReward.reward]: currentReward.value },
                wallet as string
              );

              setShowReward(true);
            } else {
              alert("Wrong answer");
            }
          }}
        >
          Check Answer
        </Button>
      )}
    </div>
  );
};

export default Task;
