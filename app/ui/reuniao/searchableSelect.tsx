'use client';

import { mylog } from '@/app/lib/mylogger';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface SearchResult {
    id: string;
    name: string;
    ds_AreaInteressado?: string;
    ds_NivelInteressado?: string;
    [key: string]: any;
}

interface SearchableSelectProps {
    onSelect: (item: SearchResult) => void;
    searchFunction: (query2: string) => Promise<SearchResult[]>;
    placeholder?: string;
    className?: string;
    value?: string;
    disabled?: boolean;
    renderItem?: (item: SearchResult) => React.ReactNode;
}

export default function SearchableSelect({ 
    onSelect, 
    searchFunction, 
    placeholder = "Search...", 
    className = "", 
    value = "", 
    disabled = false, 
    renderItem 
}: SearchableSelectProps) {
    const [query2, setQuery] = useState(value);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    console.log("SearchableSelect render", { selectedItem });

    const minchars = 3;
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    // const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const performSearch = useCallback(async (searchTerm: string) => {
        if (searchTerm.length < minchars) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const res = await searchFunction(searchTerm);
            setResults(res);
            setShowDropdown(true);
        } catch (err) {
            mylog("ERROR", "SearchableSelect", "performSearch", "Error fetching search results", err);
            setError("Failed to fetch results");
        } finally {
            setIsLoading(false);
        }
    }, [searchFunction, minchars]);

    const debouncedSearch = useDebouncedCallback(performSearch, 300);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        setSelectedItem(null);
        setShowDropdown(true);
        if (val.length >= minchars) {
            debouncedSearch(val);
        } else {
            setResults([]);
        }
    };

    const handleSelect = (item: SearchResult) => {
        setSelectedItem(item);
        setQuery(item.name);
        setShowDropdown(false);
        onSelect(item);
    };

    const handleClear = () => {
        setSelectedItem(null);
        setQuery("");
        setResults([]);
        setShowDropdown(false);
        onSelect({ id: "", name: "" });
        inputRef.current?.focus();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => 
            document.removeEventListener("mousedown", handleClickOutside);
        },[]);

    const defaultRenderItem = (item: SearchResult) => (
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(item)}>
            {item.name}
        </div>
    );
    console.log("SearchableSelect render", { query2, results, isLoading, error });
    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            <div className="flex items-center">
                <input 
                    ref={inputRef}
                    type="text" 
                    value={query2} 
                    onChange={handleInputChange} 
                    onFocus={() => setShowDropdown(true)}
                    placeholder={placeholder} 
                    disabled={disabled}
                    className={`w-full rounded-md border-gray-300 py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />

                {query2 && !disabled && (
                    <button onClick={handleClear} className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                        &#10005;
                    </button>
                )}

                {isLoading && <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 animate-spin" />}
            </div>

            {showDropdown && results.length > 0 && (
                <div ref={dropdownRef} className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto">
                    {error ? (
                        <div className="p-4 text-red-500 text-center">{error}</div>
                    ) : isLoading ? (
                        <div className="p-4 text-gray-500 text-center">Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((result) => (
                        <div
                            key={result.id}
                            onClick={() => handleSelect(result)}
                            className="cursor-pointer hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                        >
                            {renderItem ? renderItem(result) : defaultRenderItem(result)}
                        </div>
                    ))
                    ) : query2.length >= minchars ? (
                        <div className="p-4 text-gray-500 text-center">
 {/*}                           Sem resultados para "{query2}" */}
                        </div>
                    ) : (
                        <div className="p-4 text-gray-500 text-center">
                            Digitte no menos {minchars} chars para procurar
                        </div>
                    )}
                </div>
            )}
            </div>
    );

}
