const fetchInstruments = async () => {
    const response = await fetch('http://localhost:3000/api/md-instrument');
    if (!response.ok) {
        throw new Error('Failed to fetch instruments');
    }
    return response.json();
}

export { fetchInstruments };