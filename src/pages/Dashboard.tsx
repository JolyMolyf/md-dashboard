/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { socket } from '../socket/socket'
import Grid from '../gird/Grid'
import QuoteForm from '../components/QuoteForm'
import { useQuotes } from '../hooks/useQuotes'
import { useAuth } from '@/hooks/useAuthHook'

import { Switch } from '@/components/ui/switch'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import useMdSimulator from '@/hooks/useMdSimulatorHook'

export default function Dashboard() {
    const { data: quotesData, createQuote } = useQuotes();
    const { startSimulator, stopSimulator, statusSimulator } = useMdSimulator();
    const [marketUpdates, setMarketUpdates] = useState<any[]>([])
    const { name, email, id } = useAuth();

    const isRunning = statusSimulator.data ?? false;
    const isMutating = startSimulator.isPending || stopSimulator.isPending;

    useEffect(() => {
        socket.on('market-updates', (updates) => {
            setMarketUpdates(updates)
        })

        return () => {
            socket.off('market-updates');
        };
    }, []);

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
