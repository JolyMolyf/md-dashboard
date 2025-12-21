export const WorkerInputMessages = {
    PING: 'PING',
    START_SIMULATOR: 'START_SIMULATOR',
    STOP_SIMULATOR: 'STOP_SIMULATOR',
    STATUS_SIMULATOR: 'STATUS_SIMULATOR',
    UPDATE_QUOTES: 'UPDATE_QUOTES',
} as const;

export type WorkerInputMessageType = typeof WorkerInputMessages[keyof typeof WorkerInputMessages];

export const WorkerOutputMessages = {
    PONG: 'PONG',
    SIMULATOR_STARTED: 'SIMULATOR_STARTED',
    SIMULATOR_STOPPED: 'SIMULATOR_STOPPED',
    SIMULATOR_STATUS: 'SIMULATOR_STATUS',
    MARKET_DATA_UPDATE: 'MARKET_DATA_UPDATE',
    ERROR: 'ERROR',
} as const;

export type WorkerOutputMessageType = typeof WorkerOutputMessages[keyof typeof WorkerOutputMessages];
