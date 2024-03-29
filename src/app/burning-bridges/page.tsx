"use client";

import React from "react";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";

import loading from "@/assets/loading.gif";
import { useBurningBridgesQuery } from "@/queries/burningBridgesQuery";
import { useBurningBridgesContext } from "@/contexts/BurningBridgesProvider";

export default function Home() {
  const [cards, setCards] = useState(10);
  const [prompt, setPrompt] = useState("");

  const [finalPrompt, setFinalPrompt] = useState("");
  const [finalCards, setFinalCards] = useState(0);

  const { burningBridgesConfig, setBurningBridgesConfig } =
    useBurningBridgesContext();

  const [generatedCards, setGeneratedCards] = useState<{ question: string }[]>(
    []
  );

  const { data, isLoading, refetch } = useBurningBridgesQuery(
    finalPrompt,
    finalCards
  );

  const router = useRouter();

  function deleteQuestion(question: string) {
    console.log(question);
    const filtered = generatedCards.filter(
      (item) => item.question !== question
    );
    setGeneratedCards(filtered);
  }

  function handleStartGame() {
    // Fisher-Yates shuffle algorithm
    const shuffle = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    const shuffledCards = shuffle(generatedCards);
    setBurningBridgesConfig({
      ...burningBridgesConfig,
      questions: shuffledCards,
    });
    router.push("/burning-bridges/play");
  }

  useEffect(() => {
    if (data && data.contents) {
      setGeneratedCards(data.contents);
    }
  }, [isLoading]);

  const breadcrumbs = [
    <Link key="1" color="inherit" href="/" onClick={() => router.push("/")}>
      Fun
    </Link>,
    <span key="2" color="inherit">
      Burning Bridges
    </span>,
  ];

  return (
    <div className="text-center p-10 ">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <h1 className="font-bold text-[24px] mt-10">Burning Bridges</h1>
      <h3 className="mb-10">
        Ain't no way you're getting out your friendship alive with this one
      </h3>
      <TextField
        label="Enter your prompt"
        multiline
        className="w-full"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex justify-center gap-4 mt-4">
        <span className="my-auto">I'd like to generate</span>
        <TextField
          type="number"
          className="ml-2 w-10 px-auto"
          variant="standard"
          value={cards}
          onChange={(e) => setCards(parseInt(e.target.value))}
        />
        <span className="my-auto">cards</span>
      </div>
      <button
        className="bg-accent-2 text-white font-bold w-full p-3 rounded-lg mt-10"
        onClick={() => {
          setFinalPrompt(prompt);
          setFinalCards(cards);
        }}
      >
        Generate Cards!
      </button>
      {isLoading && (
        <div className="flex flex-col text-center w-full">
          <Image src={loading} alt="loading" className="mt-5 mx-auto" />
          <span className="mt-2">Still loading lah ...</span>
        </div>
      )}
      <div className="flex flex-col gap-2 my-5">
        {generatedCards.map((item: any) => (
          <Card question={item.question} deleteQuestion={deleteQuestion} />
        ))}
      </div>
      {generatedCards.length > 0 && (
        <>
          <button className="bg-accent-2 text-white font-bold w-full p-3 rounded-lg" onClick={handleStartGame}>
            Let's BURN 👿
          </button>
          <button
            className="border border-accent-1 text-accent-1 w-full p-2 rounded-lg mt-2 opacity-70"
            onClick={() => setGeneratedCards([])}
          >
            Clear all cards
          </button>
        </>
      )}
    </div>
  );
}

function Card({
  question,
  deleteQuestion,
}: {
  question: string;
  deleteQuestion: (question: string) => void;
}) {
  return (
    <div className="grid grid-cols-7 transition p-4 border border-accent-2 rounded-lg cursor-pointer hover:opacity-80 gap-2">
      <div className="col-span-6">
        <h2 className="text-[14px] text-[#595959]">{question}</h2>
      </div>
      <div className="col-span-1">
        <button
          className="flex flex-col h-full w-full justify-center mx-auto"
          onClick={() => deleteQuestion(question)}
        >
          <DeleteOutlineIcon className="text-accent-1 mr-0 ml-auto" />
        </button>
      </div>
    </div>
  );
}
