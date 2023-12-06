'use client';
import React, { useState, useEffect } from 'react';
import Onboard from '@/app/player/game/onboard';
import Task from '@/app/player/game/task';
import { useRouter } from 'next/router';

const Player = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const router = useRouter();

  const handleWalletConnection = () => {
    setIsWalletConnected(true);
    router.push('/task');
  };

  return isWalletConnected ? <Task /> : <Onboard onWalletConnected={handleWalletConnection} />;
};

export default Player;
