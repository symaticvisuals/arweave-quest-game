import React from 'react';
import Image from 'next/image';
import { Input, Button, Dropdown, DropdownItem } from '@nextui-org/react';
import { useAppContext } from '@/contexts/AppContext';

const Task = () => {
  const { question, rewards } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-600 px-4 py-8">
      <Image src="/Logo.svg" alt="Logo" width={150} height={75} className="mt-1" />
      <Dropdown>
        {rewards.map((reward) => (
          <DropdownItem key={reward.value}>{reward.label}</DropdownItem>
        ))}
      </Dropdown>
      <Input placeholder={question || 'Submit your answer'} className="mb-4 w-full max-w-xs" />
      <Button className="w-full max-w-xs">Save answer</Button>
    </div>
  );
};

export default Task;
