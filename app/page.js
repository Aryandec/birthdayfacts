"use client";

import { useState, useEffect } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

export default function Home() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("userData"));
    if (savedData) {
      setName(savedData.name);
      setBirthday(savedData.birthday);
    }

    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("userData");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.removeItem("userData");
      });
    };
  }, []);

  const handleSubmit = () => {
    const userData = { name, birthday };
    if (!name) {
      setIsDialogOpen(true);
      return;
    }
    sessionStorage.setItem("userData", JSON.stringify(userData));
    router.push(
      `/facts?page=birthdayStory&userName=${encodeURIComponent(
        name
      )}&birthday=${encodeURIComponent(birthday)}`
    );
  };

  return (
    <div className="bg-black text-white font-sans min-h-screen flex items-center justify-center px-4">
      <main className="flex flex-col gap-8 items-center w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-center leading-snug">
          Know interesting facts about your birthday
        </h1>

        <Card className="bg-gray-800/60 border border-gray-700 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
            <FaBirthdayCake className="text-pink-400 text-3xl" /> Birthday Facts
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-6"
          >
            <Input
              id="nameInput"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="placeholder:text-gray-400 text-white bg-[rgba(255,255,255,0.08)] rounded-xl px-4 py-4 w-full outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            />
            <Input
              type="date"
              placeholder="Your Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="placeholder:text-gray-400 text-white bg-[rgba(255,255,255,0.08)] rounded-xl px-4 py-4 w-full outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:scale-105 transition-transform duration-200 rounded-full px-6 py-3 font-semibold text-white"
            >
              Continue
            </Button>
          </form>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className=" backdrop-blur-md bg-gray-800/60 border border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Input Required</DialogTitle>
              <DialogDescription>
                Please enter your name before continuing.
              </DialogDescription>
            </DialogHeader>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-transform duration-200 transform hover:scale-105"
            >
              Close
            </button>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
