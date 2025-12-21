/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import Grid from '../gird/Grid'
import QuoteForm from '../components/QuoteForm'
import { useQuotes } from '../hooks/useQuotes'
import { useAuth } from '@/hooks/useAuthHook'

import { Switch } from '@/components/ui/switch'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import useMdSimulator from '@/hooks/useMdSimulatorHook'
import { WorkerContext } from '@/hooks/context/WorkerContext'
import { WorkerInputMessages, WorkerOutputMessages } from '@/worker/message_types'

export default function Dashboard() {

    const worker = useContext(WorkerContext);
    const { data: quotesData, createQuote } = useQuotes();
    const { startSimulator, stopSimulator, statusSimulator } = useMdSimulator();
    const [marketUpdates, setMarketUpdates] = useState<any[]>([])
    const { name, email, id } = useAuth();

    const isRunning = statusSimulator.data ?? false;
    const isMutating = startSimulator.isPending || stopSimulator.isPending;

    useEffect(() => {
        if (!worker) return;

        if (isRunning) {
            worker.postMessage({ type: WorkerInputMessages.START_SIMULATOR });
        } else {
            worker.postMessage({ type: WorkerInputMessages.STOP_SIMULATOR });
        }
    }, [worker, isRunning]);

    useEffect(() => {
        if (worker && quotesData) {
            worker.postMessage({ 
                type: WorkerInputMessages.UPDATE_QUOTES, 
                payload: quotesData 
            });
        }
    }, [worker, quotesData]);
    
    useEffect(() => {
        if (!worker) return;
        
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === WorkerOutputMessages.MARKET_DATA_UPDATE) {
                 setMarketUpdates(event.data.payload); 
            }
        };
        worker.addEventListener('message', handleMessage);
        return () => worker.removeEventListener('message', handleMessage);
    }, [worker]);


    const handleSwitchChange = (checked: boolean) => {
        if (checked) {
            startSimulator.mutate();
        } else {
            stopSimulator.mutate();
        }
    }

    return (
        <div className='w-[95%] mx-auto h-screen' >
            <Card className='w-[95%] mx-auto mt-5'>
                <CardContent className='py-5'>
                    <p className="text-2xl font-bold mb-4">Welcome {id} {name} {email}</p>
                    <div className='flex items-center gap-2'>
                        <p className="text-lg font-bold" style={{ lineHeight: "20px" }}>Simulator</p>
                        <Switch className="h-5" checked={isRunning} onCheckedChange={handleSwitchChange} disabled={isMutating} />
                    </div>

                </CardContent>
            </Card>

            <QuoteForm createQuote={createQuote} />
            <Grid marketUpdates={marketUpdates} quotesData={quotesData ?? []} />
        </div>
    )
}
