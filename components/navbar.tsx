"use client";

import Image from "next/image";
import { LogOut, User, Settings, Trophy, CreditCard } from "lucide-react";

import { Button } from "./ui/button";
import { useQuizStore } from "@/store/store";
import { LoginModal } from "./modals/login-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const NavBar = () => {
  const { user, clearUser } = useQuizStore();

  const handleLogout = () => {
    clearUser();
    // Optional: Add logout API call here if needed
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm border-b">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/sportpesa-logo.jpg"
          alt="SportPesa"
          height={50}
          width={50}
          className="rounded-lg"
        />
        <span className="text-xl font-bold text-gray-800 hidden sm:block">
          SportPesa Quiz
        </span>
      </div>

      {/* Right Side - Auth Section */}
      <div className="flex items-center gap-3">
        {user ? (
          // User is logged in - Show avatar dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.nickname?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.nickname}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-semibold">{user.nickname}</span>
                <span className="text-sm text-gray-500 font-normal">
                  {user.phoneNo}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Trophy className="w-4 h-4 mr-2" />
                My Scores
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <CreditCard className="w-4 h-4 mr-2" />
                My Wallet
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // User is not logged in - Show auth buttons
          <div className="flex items-center gap-2">
            <LoginModal />
            <Button
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
