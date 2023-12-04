import RolesSelector from '@/components/roles-selector'
import { Button } from '@nextui-org/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container min-h-screen">
      <div className="mt-[15vh]">
      <h1 className='text-xl text-center mb-4 font-semibold'>Choose your role wisely!</h1>
        <div className="flex items-center ">
          <RolesSelector />
        </div>
      </div>
    </main>
  );
}
