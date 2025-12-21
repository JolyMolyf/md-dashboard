/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react"
import type { ColDef, GetRowIdParams } from "ag-grid-community"
import { useEffect, useRef, useCallback } from "react";
import type { Quote } from "@/api/quoteApi";

const columnDefs: ColDef[] = [
    { headerName: 'Id', field: 'id' },
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Spot Price', field: 'spotPrice' },
    { headerName: 'Market Bid', field: 'mktBid' },
    { headerName: 'Market Ask', field: 'mktAsk' },
    { headerName: 'Delta', field: 'delta', valueFormatter: (params) => params.value ? `${(params.value * 100).toFixed(2)}%` : '' },
    { headerName: 'Premium', field: 'premium', valueFormatter: (params) => params.value ? `${(params.value * 100).toFixed(2)}%` : '' },
]

const Grid = ({ quotesData, marketUpdates }: { quotesData: Quote[], marketUpdates: any[] }) => {
    const gridRef = useRef<AgGridReact>(null);

    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data.id;
    }, []);

    useEffect(() => {
        if (gridRef.current && marketUpdates.length > 0) {
            const gridApi = gridRef.current.api;

        

            if (marketUpdates.length > 0) {
                gridApi.applyTransactionAsync({
                    update: marketUpdates
                });
            }
        }
    }, [marketUpdates, quotesData]);

    return (
        <div className="w-full h-full">
            <div className="h-2/3 mx-auto w-[95%]">
                <AgGridReact
                    ref={gridRef}
                    className="ag-theme-alpine w-full h-full"
                    rowData={quotesData}
                    columnDefs={columnDefs}
                    getRowId={getRowId}
                />
            </div>
        </div>
    )
}

export default Grid
