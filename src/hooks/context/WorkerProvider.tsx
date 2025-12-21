import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { WorkerContext } from "./WorkerContext";

export const WorkerProvider = ({ children }: { children: ReactNode }) => {
    const [worker, setWorker] = useState<Worker | null>(null);

    useEffect(() => {

        const workerInstance = new Worker(new URL('../../worker/worker.ts', import.meta.url), {
            type: 'module',
        });

        // eslint-disable-next-line
        setWorker(workerInstance);

        return () => {
            workerInstance.terminate();
        };
    }, []);

    return (
        <WorkerContext.Provider value={worker}>
            {children}
        </WorkerContext.Provider>
    );
};
