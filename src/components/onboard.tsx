"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConnectButton } from "arweave-wallet-kit";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface OnboardProps {
  onWalletConnected: () => void;
}

const Onboard: React.FC<OnboardProps> = ({ onWalletConnected }) => {
  const { isAboveSm } = useBreakpoint("sm");
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Logic to connect the wallet
    setIsConnected(true);
  };

  useEffect(() => {
    if (isConnected) {
      onWalletConnected();
    }
  }, [isConnected, onWalletConnected]);

  const permaStickerUrl = "/arweave-sticker.svg";

  return (
    <div
      className="flex flex-col items-center justify-center h-screen "
      style={{
        backgroundImage: "url(/assets/bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="mt-2">
        <Image src="/Logo.svg" alt="Questify Logo" width={200} height={100} />
      </div>
      <ConnectButton
        showBalance={isAboveSm}
        showProfilePicture={isAboveSm}
        onClick={handleConnect}
      />
      <div className="absolute bottom-0 w-full text-center">
        <hr className="border-t-8 border-purple-700 mb-4" />
        <p className="text-white mb-4">
          © {new Date().getFullYear()} Questify. All rights reserved.
        </p>
        <Image
          src={permaStickerUrl}
          alt="Perma-sticker"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default Onboard;
