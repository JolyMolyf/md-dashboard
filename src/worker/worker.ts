import { socket } from "@/socket/socket";
import { WorkerInputMessages, WorkerOutputMessages } from "./message_types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let quotesData: any[] = [];

self.onmessage = (event: MessageEvent) => {
    const { type, payload } = event.data;

    // Filter out frequent log spam for updates
    if (type !== WorkerInputMessages.UPDATE_QUOTES) {
        console.log(`Worker received command: ${type}`, payload);
    }

    switch (type) {
        case WorkerInputMessages.PING:
            self.postMessage({ type: WorkerOutputMessages.PONG, payload: 'PONG' });
            break;
        case WorkerInputMessages.START_SIMULATOR:
            handleStartSimulator();
            self.postMessage({ type: WorkerOutputMessages.SIMULATOR_STARTED, payload: 'SIMULATOR_STARTED' });
            break;
        case WorkerInputMessages.STOP_SIMULATOR:
            handleStopSimulator();
            self.postMessage({ type: WorkerOutputMessages.SIMULATOR_STOPPED, payload: 'SIMULATOR_STOPPED' });
            break;
        case WorkerInputMessages.STATUS_SIMULATOR:
            handleStatusSimulator();
            self.postMessage({ type: WorkerOutputMessages.SIMULATOR_STATUS, payload: 'SIMULATOR_STATUS' });
            break;
        case WorkerInputMessages.UPDATE_QUOTES:
            quotesData = payload;
            console.log(`Worker updated quotes cache with ${quotesData.length} items`);
            break;
        default:
            console.error(`Unknown command: ${type}`);
            self.postMessage({ type: WorkerOutputMessages.ERROR, payload: `Unknown command: ${type}` });
            break;
    }

};

const handleStartSimulator = () => {
    console.log('Starting simulator');
    socket.off('market-updates');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on('market-updates', (updates: any[]) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rowsToUpdate: any[] = [];

        updates.forEach((update) => {
            const matchingQuotes = quotesData.filter(q => q.instrumentId === update.instrumentId);

            matchingQuotes.forEach(quote => {
                rowsToUpdate.push({
                    ...quote,
                    symbol: update.symbol,
                    spotPrice: update.spotPrice,
                    mktBid: update.mktBid,
                    mktAsk: update.mktAsk,
                    delta: update.delta,
                    premium: update.premium,
                });
            });
        });

        if (rowsToUpdate.length > 0) {
             self.postMessage({ 
                 type: WorkerOutputMessages.MARKET_DATA_UPDATE, 
                 payload: rowsToUpdate 
             });
        }
    });
}

const handleStopSimulator = () => {
    console.log('Stopping simulator');
    socket.off('market-updates');
}

const handleStatusSimulator = () => {
    console.log('Status simulator');
}

export {};
