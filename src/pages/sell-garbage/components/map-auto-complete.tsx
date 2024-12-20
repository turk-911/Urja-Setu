import { cn } from "@/lib/utils";
import { GoogleMapAPIKey } from "@/APIKey";
import React, { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// Function to dynamically load the Google Maps API script
const loadGoogleMapsScript = () => {
  // Check if the script is already loaded
  if (
    document.querySelector(
      'script[src^="https://maps.googleapis.com/maps/api/js"]'
    )
  ) {
    return Promise.resolve(); // If it's already loaded, return a resolved promise
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapAPIKey}&libraries=places&v=weekly`;
    script.async = true; // Load asynchronously
    script.defer = true; // Defer execution
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
};

interface MapAutoCompleteProps {
  className?: string;
  setCoordinates: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
}

export default function LocationAutocomplete({
  className,
  setCoordinates,
}: MapAutoCompleteProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [apiKey] = useState(GoogleMapAPIKey); // Replace with your Google Maps API key

  // Load Google Maps API script when the component is mounted
  useEffect(() => {
    if (GoogleMapAPIKey) {
      loadGoogleMapsScript()
        .then(() => setIsScriptLoaded(true))
        .catch((error) => {
          console.error("Error loading Google Maps API:", error);
        });
    }
  }, [apiKey]);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false); // Update value without triggering suggestions
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setCoordinates({ lat, lng });
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  if (!isScriptLoaded) {
    return <div>Loading Google Maps API...</div>;
  }

  return (
    <div className={cn("", className)}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Enter a location"
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      {status === "OK" &&
        data.map(({ place_id, description }) => (
          <div
            key={place_id}
            onClick={() => handleSelect(description)}
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {description}
          </div>
        ))}
    </div>
  );
}
