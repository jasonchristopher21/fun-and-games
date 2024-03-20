"use client";

import React, { useState, useEffect } from "react";
import { useBurningBridgesContext } from "@/contexts/BurningBridgesProvider";
import ReactCardFlip from "react-card-flip";

import Image from "next/image";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ProgressBar } from "primereact/progressbar";
import { useRouter } from "next/navigation";

import bb1 from "@/assets/bb1.jpg";
import bb2 from "@/assets/bb2.jpg";
import bb3 from "@/assets/bb3.jpg";
import bb4 from "@/assets/bb4.jpg";
import bb5 from "@/assets/bb5.webp";
import bb6 from "@/assets/bb6.jpg";

export default function Page() {
  const { burningBridgesConfig } = useBurningBridgesContext();

  const cards = burningBridgesConfig.questions;

  // const cards = [
  //   {
  //     question: "What is the most important thing you have learned in life?",
  //   },
  //   {
  //     question: "What is the most important thing you have learned in death?",
  //   },
  // ];

  const router = useRouter();

  const max_length = cards.length;
  const [currentCard, setCurrentCard] = useState(0);
  const [isWaiting, setIsWaiting] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  // function to choose a random number from 1 to 6
  const random = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const images = [bb1, bb2, bb3, bb4, bb5, bb6];
  const randomImage = images[random() - 1];

  const breadcrumbs = [
    <Link key="1" color="inherit" href="/" onClick={() => router.push("/")}>
      Fun
    </Link>,
    <Link
      key="2"
      color="inherit"
      href="/burning-bridges"
      onClick={() => router.push("/burning-bridges")}
    >
      Burning Bridges
    </Link>,
    <span key="3" color="inherit">
      Play
    </span>,
  ];

  useEffect(() => {
    if (burningBridgesConfig && cards.length === 0) {
      console.error("make cards first");
      router.push("/burning-bridges");
    }
  }, []);

  return (
    <div className="flex flex-col h-full justify-between text-center p-10 ">
      <div className="flex flex-col">
        {/* <ProgressBar value={((currentCard + 1) / max_length) * 100} color="#ff0000" /> */}
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
        <h1 className="font-bold text-[24px] mt-10">Burning Bridges</h1>
      </div>
      <div>
        {isWaiting && currentCard < max_length ? (
          <div className="w-2/3 mx-auto text-[22px]">
            Please pass the device to the{" "}
            <span className="font-bold">
              {currentCard === 0 ? "first" : "next"}
            </span>{" "}
            player
          </div>
        ) : currentCard < max_length ? (
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div
              className="h-[300px] w-[90%] mx-auto flex flex-col justify-center rounded-md border-2 bg-accent-2 bg-opacity-50 border-accent-2 text-[20px]"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              Press to reveal card
            </div>
            <div
              className="h-[300px] w-[90%] mx-auto flex flex-col justify-center rounded-md border-2 border-accent-2 px-5 text-[22px]"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {cards[currentCard].question}
            </div>
          </ReactCardFlip>
        ) : (
          <div className="flex flex-col gap-4">
            <span className="text-[20px]">Game Completed!</span>
            <Image src={randomImage} alt="random image" className="w-full" />
          </div>
        )}
      </div>
      <div>
        {isWaiting && currentCard < max_length ? (
          <button
            className="bg-accent-2 rounded-md w-full p-3 font-bold text-white"
            onClick={() => {
              setIsWaiting(!isWaiting);
              setIsFlipped(false);
            }}
          >
            I am the {currentCard === 0 ? "first" : "next"} player
          </button>
        ) : currentCard < max_length ? (
          <button
            className="bg-accent-2 rounded-md w-full p-3 font-bold text-white"
            onClick={() => {
              setIsWaiting(!isWaiting);
              setCurrentCard(currentCard + 1);
            }}
          >
            I am done
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              className="bg-accent-2 rounded-md w-full p-3 font-bold text-white"
              onClick={() => router.push("/burning-bridges")}
            >
              Create New Game
            </button>
            <button
              className="border border-accent-1 rounded-md w-full p-2 text-accent-1"
              onClick={() => setCurrentCard(0)}
            >
              Restart with same cards
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
