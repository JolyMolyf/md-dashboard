import { useState } from "react";
import { useIntruments } from "../hooks/useIntruments";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem } from "./ui/select";
import { SelectTrigger } from "./ui/select";
import { SelectValue } from "./ui/select";
import type { Quote } from "@/api/quoteApi";
const QuoteForm = ({ createQuote }: { createQuote: (quote: Partial<Quote>) => void }) => {

    const { data: instruments } = useIntruments();

    const [selectedInstrument, setSelectedInstrument] = useState<string | undefined>(undefined);

    const handleSelectInstrument = (instrument: string) => {
        setSelectedInstrument(instrument);
    }

    const handleCreateQuote = () => {
        if (selectedInstrument) {
            createQuote({ instrumentId: selectedInstrument, optionType: 'Call' });
        }
    }

    return (
        <div className="w-[95%] mx-auto mb-10 mt-10 border-2 border-gray-300 rounded-xl px-5 py-5">
            <p className="text-xl font-bold mb-5 pl-1">Create Quote</p>
            <div className="">
                <div className="w-55.5 h-7.5 mb-3.5">
                    <Select value={selectedInstrument} onValueChange={handleSelectInstrument}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an instrument" />
                        </SelectTrigger>
                        <SelectContent>
                            {instruments?.map((instrument) => (
                                <SelectItem key={instrument.id} value={instrument.id}>
                                    {instrument.symbol}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="h-0.5 bg-gray-300 mt-5 mb-5 rounded-full" />
            <div className="">
                <Button className="w-37.5 h-6.25" size="sm" disabled={!selectedInstrument} onClick={handleCreateQuote}>Create Quote</Button>
            </div>
        </div>
    )
}

export default QuoteForm;