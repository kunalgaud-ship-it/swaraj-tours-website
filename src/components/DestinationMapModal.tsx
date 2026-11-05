/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Map, 
  AdvancedMarker, 
  Pin, 
  useMap,
  MapMouseEvent
} from '@vis.gl/react-google-maps';
import { 
  X, 
  MapPin, 
  Navigation, 
  Check, 
  Compass, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { PlaceAutocompleteInput, PlaceSelection } from './PlaceAutocompleteInput';

// Coordinates for key Maharashtra cities and popular tourist destinations
const POPULAR_DESTINATION_COORDINATES: Record<string, { lat: number; lng: number; title: string }> = {
  'pune': { lat: 18.5204, lng: 73.8567, title: 'Pune City' },
  'mumbai': { lat: 19.0760, lng: 72.8777, title: 'Mumbai Metro' },
  'nashik': { lat: 19.9975, lng: 73.7898, title: 'Nashik (HQ)' },
  'shirdi': { lat: 19.7667, lng: 74.4766, title: 'Shirdi Sai Baba' },
  'mahabaleshwar': { lat: 17.9237, lng: 73.6586, title: 'Mahabaleshwar' },
  'lonavala': { lat: 18.7546, lng: 73.4062, title: 'Lonavala & Khandala' },
  'trimbakeshwar': { lat: 19.9328, lng: 73.5307, title: 'Trimbakeshwar Jyotirlinga' },
  'goa': { lat: 15.2993, lng: 74.1240, title: 'Goa Coastal' },
  'alibaug': { lat: 18.6414, lng: 72.8722, title: 'Alibaug Beach' },
  'kolhapur': { lat: 16.7050, lng: 74.2433, title: 'Kolhapur Mahalaxmi' },
  'mumbai airport': { lat: 19.0896, lng: 72.8656, title: 'Mumbai Airport (T1/T2)' },
  'pune airport': { lat: 18.5822, lng: 73.9197, title: 'Pune Airport (Lohegaon)' },
};

function getCoordsForPlace(name: string): { lat: number; lng: number } {
  const clean = name.toLowerCase().trim();
  for (const [key, coords] of Object.entries(POPULAR_DESTINATION_COORDINATES)) {
    if (clean.includes(key)) {
      return { lat: coords.lat, lng: coords.lng };
    }
  }
  // Default to central Maharashtra
  return { lat: 18.95, lng: 73.80 };
}

interface DestinationMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPickup?: string;
  initialDrop?: string;
  onApplyLocations: (pickup: string, drop: string) => void;
}

export const DestinationMapModal: React.FC<DestinationMapModalProps> = ({
  isOpen,
  onClose,
  initialPickup = 'Nashik',
  initialDrop = 'Mumbai',
  onApplyLocations,
}) => {
  const [pickupCity, setPickupCity] = useState(initialPickup);
  const [dropCity, setDropCity] = useState(initialDrop);

  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number }>(() => 
    getCoordsForPlace(initialPickup)
  );
  const [dropCoords, setDropCoords] = useState<{ lat: number; lng: number }>(() => 
    getCoordsForPlace(initialDrop)
  );

  const [activeMode, setActiveMode] = useState<'pickup' | 'drop'>('pickup');
  const map = useMap();

  useEffect(() => {
    if (initialPickup) {
      setPickupCity(initialPickup);
      setPickupCoords(getCoordsForPlace(initialPickup));
    }
    if (initialDrop) {
      setDropCity(initialDrop);
      setDropCoords(getCoordsForPlace(initialDrop));
    }
  }, [initialPickup, initialDrop]);

  // Adjust camera bounds to fit both points when they change
  useEffect(() => {
    const googleMaps = (window as unknown as { google?: typeof google }).google?.maps;
    if (!map || !googleMaps) return;

    try {
      const bounds = new googleMaps.LatLngBounds();
      bounds.extend(pickupCoords);
      bounds.extend(dropCoords);
      map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
    } catch {
      // Map may still be initializing
    }
  }, [map, pickupCoords, dropCoords]);

  // Approximate crow-flies and road distance calculation
  const distanceInfo = useMemo(() => {
    const R = 6371; // Earth's radius in km
    const dLat = ((dropCoords.lat - pickupCoords.lat) * Math.PI) / 180;
    const dLon = ((dropCoords.lng - pickupCoords.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pickupCoords.lat * Math.PI) / 180) *
        Math.cos((dropCoords.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const straightKm = Math.round(R * c);
    const estimatedHighwayKm = Math.round(straightKm * 1.25);
    const estHours = Math.round((estimatedHighwayKm / 45) * 10) / 10;

    return {
      roadKm: Math.max(20, estimatedHighwayKm),
      duration: `${Math.floor(estHours)}h ${Math.round((estHours % 1) * 60)}m`,
    };
  }, [pickupCoords, dropCoords]);

  // Handle map click to position active marker
  const handleMapClick = useCallback((e: MapMouseEvent) => {
    if (!e.detail.latLng) return;
    const clickedLat = e.detail.latLng.lat;
    const clickedLng = e.detail.latLng.lng;

    if (activeMode === 'pickup') {
      setPickupCoords({ lat: clickedLat, lng: clickedLng });
      setPickupCity(`Map Point (${clickedLat.toFixed(3)}, ${clickedLng.toFixed(3)})`);
      setActiveMode('drop');
    } else {
      setDropCoords({ lat: clickedLat, lng: clickedLng });
      setDropCity(`Map Point (${clickedLat.toFixed(3)}, ${clickedLng.toFixed(3)})`);
    }
  }, [activeMode]);

  const handleApply = () => {
    onApplyLocations(pickupCity, dropCity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[92vh] max-h-[850px] flex flex-col overflow-hidden shadow-2xl border border-slate-200 relative">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                Google Map Route & Destination Selector
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                  Interactive
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Search locations or click anywhere on the Google Map to set exact pickup and drop points
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Bar */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 shrink-0 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Pickup Input */}
          <div className="md:col-span-5">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Pickup Location
              </label>
              <button
                type="button"
                onClick={() => setActiveMode('pickup')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeMode === 'pickup'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-500 bg-slate-200 hover:bg-slate-300'
                }`}
              >
                Click Map to Place
              </button>
            </div>
            <PlaceAutocompleteInput
              value={pickupCity}
              onChange={(val) => setPickupCity(val)}
              onSelectPlace={(p: PlaceSelection) => {
                setPickupCity(p.name);
                if (p.location) setPickupCoords(p.location);
              }}
              placeholder="Search pickup address or landmark..."
              iconColor="text-emerald-600"
            />
          </div>

          {/* Swap or Center arrow */}
          <div className="hidden md:flex md:col-span-1 justify-center pt-5">
            <div className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Drop Input */}
          <div className="md:col-span-5">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-red-600 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                Drop Destination
              </label>
              <button
                type="button"
                onClick={() => setActiveMode('drop')}
                className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeMode === 'drop'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-500 bg-slate-200 hover:bg-slate-300'
                }`}
              >
                Click Map to Place
              </button>
            </div>
            <PlaceAutocompleteInput
              value={dropCity}
              onChange={(val) => setDropCity(val)}
              onSelectPlace={(p: PlaceSelection) => {
                setDropCity(p.name);
                if (p.location) setDropCoords(p.location);
              }}
              placeholder="Search drop destination or temple..."
              iconColor="text-red-500"
            />
          </div>

          {/* Apply button */}
          <div className="md:col-span-1 flex md:justify-end pt-2 md:pt-5">
            <button
              onClick={handleApply}
              className="w-full md:w-auto p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-md flex items-center justify-center gap-1 cursor-pointer"
              title="Apply to booking form"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Landmarks Strip */}
        <div className="bg-white px-4 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Quick Map Jump:</span>
          {Object.entries(POPULAR_DESTINATION_COORDINATES).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (activeMode === 'pickup') {
                  setPickupCity(item.title);
                  setPickupCoords({ lat: item.lat, lng: item.lng });
                  setActiveMode('drop');
                } else {
                  setDropCity(item.title);
                  setDropCoords({ lat: item.lat, lng: item.lng });
                }
              }}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-[11px] font-semibold shrink-0 border border-slate-200 transition-colors cursor-pointer"
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Interactive Google Map Container */}
        <div className="flex-1 w-full relative min-h-[350px]">
          <Map
            mapId="DEMO_MAP_ID"
            defaultCenter={pickupCoords}
            defaultZoom={8}
            gestureHandling="greedy"
            disableDefaultUI={false}
            onClick={handleMapClick}
            style={{ width: '100%', height: '100%' }}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          >
            {/* Pickup Marker */}
            <AdvancedMarker position={pickupCoords} title={`Pickup: ${pickupCity}`}>
              <Pin
                background="#10b981"
                borderColor="#065f46"
                glyphColor="#ffffff"
                scale={1.2}
              />
            </AdvancedMarker>

            {/* Drop Marker */}
            <AdvancedMarker position={dropCoords} title={`Drop: ${dropCity}`}>
              <Pin
                background="#ef4444"
                borderColor="#991b1b"
                glyphColor="#ffffff"
                scale={1.2}
              />
            </AdvancedMarker>
          </Map>

          {/* Floating Distance & Route Metric Card */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/90 max-w-xs z-10">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Google Maps Route Estimate
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-slate-900">
                ~{distanceInfo.roadKm} KM
              </span>
              <span className="text-xs font-semibold text-slate-500">
                ({distanceInfo.duration} driving)
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-900 truncate">From:</span>
                <span className="truncate">{pickupCity}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span className="font-semibold text-slate-900 truncate">To:</span>
                <span className="truncate">{dropCity}</span>
              </div>
            </div>
          </div>

          {/* Hint Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-slate-900/90 text-white text-[11px] px-3.5 py-2 rounded-xl backdrop-blur-sm border border-slate-700 shadow-lg flex items-center justify-between gap-3 z-10">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                Currently picking: <strong className="text-amber-400 uppercase">{activeMode}</strong>. Click map to reposition.
              </span>
            </span>
            <button
              onClick={handleApply}
              className="py-1 px-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Use Selected Route
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 p-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>High-precision Google Maps Platform location tracking enabled</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none py-2 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 sm:flex-none py-2 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold shadow-md transition-all cursor-pointer"
            >
              Confirm & Set in Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
