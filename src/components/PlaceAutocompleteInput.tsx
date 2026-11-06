/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, X } from 'lucide-react';
import { loadPlacesLibrary } from '../maps';

export interface PlaceSelection {
  name: string;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
}

interface PlaceAutocompleteInputProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  onSelectPlace?: (place: PlaceSelection) => void;
  placeholder?: string;
  iconColor?: string;
  required?: boolean;
}

export const PlaceAutocompleteInput: React.FC<PlaceAutocompleteInputProps> = ({
  id,
  value,
  onChange,
  onSelectPlace,
  placeholder = "Enter location or landmark",
  iconColor = "text-emerald-600",
  required = false,
}) => {
  // Places loads only after the traveller focuses a location field, so the page itself stays light.
  const [placesLib, setPlacesLib] = useState<google.maps.PlacesLibrary | null>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load the Places library on first focus
  useEffect(() => {
    if (!isFocused || placesLib) return;
    let cancelled = false;
    loadPlacesLibrary()
      .then((lib) => { if (!cancelled) setPlacesLib(lib); })
      .catch((err: unknown) => console.warn('Place autocomplete unavailable:', err));
    return () => { cancelled = true; };
  }, [isFocused, placesLib]);

  // Fetch suggestions when value changes
  useEffect(() => {
    if (!placesLib || !isFocused || !value || value.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    setIsLoading(true);

    const request: google.maps.places.AutocompleteRequest = {
      input: value,
      sessionToken: sessionTokenRef.current,
      includedRegionCodes: ['in'], // Focus on India
    };

    let isMounted = true;

    AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
      .then((res: { suggestions: google.maps.places.AutocompleteSuggestion[] }) => {
        if (!isMounted) return;
        setSuggestions(res.suggestions || []);
        setIsLoading(false);
        if (res.suggestions && res.suggestions.length > 0) {
          setIsOpen(true);
        }
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        console.warn('Place autocomplete lookup notice:', err);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [placesLib, value, isFocused]);

  const handleSelectSuggestion = async (suggestion: google.maps.places.AutocompleteSuggestion) => {
    if (!placesLib || !suggestion.placePrediction) return;

    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({
        fields: ['displayName', 'formattedAddress', 'location'],
      });

      const selectedName = place.displayName || suggestion.placePrediction.text?.text || value;
      const formatted = place.formattedAddress || selectedName;
      const location = place.location
        ? { lat: place.location.lat(), lng: place.location.lng() }
        : undefined;

      onChange(selectedName);
      if (onSelectPlace) {
        onSelectPlace({
          name: selectedName,
          address: formatted,
          location,
        });
      }
    } catch (e) {
      // Fallback to text
      const fallbackName = suggestion.placePrediction.text?.text || value;
      onChange(fallbackName);
    } finally {
      // Invalidate session token per best practices
      sessionTokenRef.current = null;
      setIsFocused(false);
      inputRef.current?.blur();
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className={`w-4 h-4 ${iconColor}`} />
        </div>

        <input
          ref={inputRef}
          id={id}
          type="text"
          required={required}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (suggestions.length > 0) setIsOpen(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            setIsOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsOpen(false);
          }}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium text-slate-900 transition-colors"
          autoComplete="off"
        />

        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
          {isLoading && (
            <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
          )}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear location"
              className="min-h-11 min-w-11 flex items-center justify-center text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-200/60"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 text-xs text-slate-800 divide-y divide-slate-100">
          {suggestions.map((suggestion, index) => {
            const mainText = suggestion.placePrediction?.mainText?.text || suggestion.placePrediction?.text?.text || '';
            const secondaryText = suggestion.placePrediction?.secondaryText?.text || '';

            return (
              <li
                key={index}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="px-3.5 py-2.5 hover:bg-amber-50 hover:text-amber-950 cursor-pointer flex items-start gap-2.5 transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 truncate">
                    {mainText}
                  </div>
                  {secondaryText && (
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {secondaryText}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
