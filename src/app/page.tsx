"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 text-center p-10">
      <h1 className="font-bold text-[24px]">Jason's Fun Stuff</h1>
      <Card
        title="Burning Bridges"
        description="A game about burning bridges"
        route="/burning-bridges"
      />
    </div>
  );
}

function Card({
  title,
  description,
  route,
}: {
  title: string;
  description: string;
  route: string;
}) {
  return (
    <Link href={route}>
      <div className="transition p-4 border border-accent-2 rounded-lg cursor-pointer hover:opacity-80">
        <h2 className="font-bold text-accent-2 ">{title}</h2>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </Link>
  );
}
