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
            createQuote({ instrumentId: selectedInstrument, optionType: 'Call'});
        }
    }

    return (
        <div className="w-[90%] mx-auto mb-10 mt-10 border-2 border-gray-300 rounded-xl px-2 py-5">
            <p className="text-2xl font-bold mb-4">Quote Form</p>
            <div className="">
                <div className="w-[150px] h-[30px]">   
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
            <div className="w-full h-1 bg-grey-300 my-4"></div>
            <div className="">
                <Button disabled={!selectedInstrument} onClick={handleCreateQuote}>Create Quote</Button>
            </div>
        </div>
    )
}

export default QuoteForm;