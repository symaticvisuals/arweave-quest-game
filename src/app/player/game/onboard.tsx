import React from 'react';
import Image from 'next/image';
import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ConnectButton } from 'arweave-wallet-kit';

const Onboard = () => {
  const { isAboveSm } = useBreakpoint("sm");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-600 p-4">
      <div className="mb-20">
        <Image src="/Logo.svg" alt="Questify Logo" width={200} height={100} />
      </div>
      <ConnectButton
              showBalance={isAboveSm}
              showProfilePicture={isAboveSm}
            />
      <div className="absolute bottom-0 w-full text-center">
        <hr className="border-t-8 border-purple-700 mb-4" />
        <p className="text-white mb-4">© {new Date().getFullYear()} Questify. All rights reserved.</p>
        <Image src="https://github.com/vivekpal1/timeless/assets/88021457/3e6b519f-35b6-432b-a04e-14bff500e6dc)" alt="Perma-sticker" width={100} height={100} />
      </div>
    </div>
  );
};

export default Onboard;