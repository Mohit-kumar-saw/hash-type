'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // Import useSession and signOut

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get session data

  return (
    <div className="flex items-center justify-center mb-[40px]">
      <div className="flex items-center w-[100%] h-[50px] justify-between border-none rounded-md  ">
        <div className="flex items-center gap-2">
          <div
            className="font-bold text-[30px] text-white pl-3 cursor-pointer hover:scale-110 transition-all"
            onClick={() => router.push('/landingpage')}
          >
            Hash<span className="text-purple-400">Type</span>
          </div>
        </div>
        <div className="flex items-center px-[10px] gap-[25px]">
          <Image
            src="/images/home.svg"
            className="w-[25px] h-[25px] hover:scale-110 transition-all"
            width={30}
            height={30}
            onClick={() => router.push('/')}
          />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/images/Skull.svg"
                className="hover:scale-110 transition-all"
                width={20}
                height={30}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/leaderboard')}>
                Leaderboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/setting')}>Setting</DropdownMenuItem>
              {/* Conditionally render Logout if the user is logged in */}
              {session ? (
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
