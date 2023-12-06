"use client";
import React, { useState, useEffect } from "react";
import Onboard from "@/components/onboard";
import Task from "@/components/task";
import { useRouter } from "next/navigation";

const Player = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const router = useRouter();

  const handleWalletConnection = () => {
    setIsWalletConnected(true);
  };

  useEffect(() => {
    if (isWalletConnected) {
      setIsWalletConnected(true);
    }
  }, [isWalletConnected, router]);

  return isWalletConnected ? (
    <Task />
  ) : (
    <Onboard onWalletConnected={handleWalletConnection} />
  );
};

export default Player;
