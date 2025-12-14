/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { socket } from '../socket/socket'
import Grid from '../gird/Grid'
import QuoteForm from '../components/QuoteForm'
import { useQuotes } from '../hooks/useQuotes'

export default function Dashboard() {
  const {data: quotesData, createQuote} = useQuotes();
  const [marketUpdates, setMarketUpdates] = useState<any[]>([])

  useEffect(() => {
    socket.on('market-updates', (updates) => {
      setMarketUpdates(updates)
    })
    
    return () => {
      socket.off('market-updates');
    };
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <QuoteForm createQuote={createQuote} />
      <Grid marketUpdates={marketUpdates} quotesData={quotesData ?? []} />
    </div>
  )
}
