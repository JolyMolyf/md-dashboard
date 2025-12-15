const mdSimulatorApi = {
    start: async () => {
        const response = await fetch('http://localhost:3000/api/md-simulator/start');
        if (!response.ok) throw new Error(`Start failed: ${response.status}`);
        const text = await response.text();
        return text ? JSON.parse(text) : { success: true };
    },
    stop: async () => {
        const response = await fetch('http://localhost:3000/api/md-simulator/stop');
        if (!response.ok) throw new Error(`Stop failed: ${response.status}`);
        const text = await response.text();
        return text ? JSON.parse(text) : { success: true };
    },
    status: async () => {
        const response = await fetch('http://localhost:3000/api/md-simulator/status');
        if (!response.ok) throw new Error(`Status failed: ${response.status}`);
        const text = await response.json();
        return text;
    }
}

export default mdSimulatorApi;