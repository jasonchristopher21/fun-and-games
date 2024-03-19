"use client"

import { useQuery } from "@tanstack/react-query";

export const useBurningBridgesQuery = (
    prompt: string,
    numCards: number
) => {
    return useQuery(
        {
            queryKey: ["burningBridges", prompt, numCards],
            queryFn: async () => {
                try {
                    const res = await fetch(`/api/generateBurningBridges?prompt=${prompt}&numCards=${numCards}`);
                    return res.json();
                } catch (error) {
                    console.error(error);
                }
            },
        }
    );
}