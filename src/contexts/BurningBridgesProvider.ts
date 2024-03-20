'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

type QuestionObject = Readonly<{
    question: string;
}>;

type BurningBridgesConfig = Readonly<{
    questions: Array<QuestionObject>
}>;

const defaultBurningBridgesConfig: BurningBridgesConfig = Object.freeze({
    questions: []
});

type BurningBridgesContextType = Readonly<{
    burningBridgesConfig: BurningBridgesConfig;
    setBurningBridgesConfig: (newConfig: BurningBridgesConfig) => void;
}>;

const BurningBridgesContext = createContext<BurningBridgesContextType>({
    burningBridgesConfig: defaultBurningBridgesConfig,
    setBurningBridgesConfig: () => {},
});

export function useBurningBridgesContext() {
    return useContext(BurningBridgesContext);
}

type Props = PropsWithChildren;

export default function BurningBridgesProvider({ children }: Props) {
    const [burningBridgesConfig, setBurningBridgesConfig] = useState<BurningBridgesConfig>(defaultBurningBridgesConfig);

    return (
        <BurningBridgesContext.Provider value={{ burningBridgesConfig, setBurningBridgesConfig }}>
            {children}
        </BurningBridgesContext.Provider>
    )
}