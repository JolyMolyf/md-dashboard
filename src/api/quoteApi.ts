export interface Quote {
  id: string;
  symbol: string;
  instrumentId: string;
  optionType: 'Call' | 'Put';
  spotPrice: number;
  mktBid: number;
  mktAsk: number;
  delta: number;
  premium: number;
}

export const fetchQuotes = async (): Promise<Quote[]> => {
  const response = await fetch('http://localhost:3000/api/quotes');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const createQuote = async (quote: Partial<Quote>): Promise<Quote> => {
  const response = await fetch('http://localhost:3000/api/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quote),
  });
  if (!response.ok) {
    throw new Error('Failed to create quote');
  }
  return response.json();
};

export const deleteQuote = async (symbol: string): Promise<void> => {
  const response = await fetch(`/api/quotes/${symbol}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete quote');
  }
};
