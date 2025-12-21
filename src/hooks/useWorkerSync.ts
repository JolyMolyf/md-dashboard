/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react';
import { WorkerContext } from '@/hooks/context/WorkerContext';
import { WorkerInputMessages, WorkerOutputMessages } from '@/worker/message_types';
import type { Quote } from '@/api/quoteApi';

interface UseWorkerSyncProps {
    isRunning: boolean;
    quotesData: Quote[] | undefined;
}

export const useWorkerSync = ({ isRunning, quotesData }: UseWorkerSyncProps) => {
    const worker = useContext(WorkerContext);
    const [marketUpdates, setMarketUpdates] = useState<any[]>([]);

    useEffect(() => {
        if (!worker) return;

        // Sync simulator status
        if (isRunning) {
            worker.postMessage({ type: WorkerInputMessages.START_SIMULATOR });
        } else {
            worker.postMessage({ type: WorkerInputMessages.STOP_SIMULATOR });
        }

        // Handle incoming messages
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === WorkerOutputMessages.MARKET_DATA_UPDATE) {
                setMarketUpdates(event.data.payload);
            }
        };

        worker.addEventListener('message', handleMessage);
        return () => worker.removeEventListener('message', handleMessage);
    }, [worker, isRunning]);

    // Sync quotes data separately as it changes independently
    useEffect(() => {
        if (worker && quotesData) {
            worker.postMessage({ 
                type: WorkerInputMessages.UPDATE_QUOTES, 
                payload: quotesData 
            });
        }
    }, [worker, quotesData]);

    return { marketUpdates };
};
