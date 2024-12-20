import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { GoogleCloundVisionAPIKey, GoogleMapAPIKey, MapId } from "@/APIKey";
import { useEffect, useState } from "react";

export default function MapComponent() {
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error fetching location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!currentPosition) return <div>Loading ...</div>;

  return (
    <div className="h-[400px]">
      <APIProvider apiKey={GoogleMapAPIKey}>
        <Map defaultCenter={currentPosition} defaultZoom={17} mapId={MapId}>
          <Directions origin={currentPosition} />
        </Map>
      </APIProvider>
    </div>
  );
}

function Directions({ origin }: { origin: { lat: number; lng: number } }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsRenderer || !directionsService || !origin) return;

    directionsService
      .route({
        origin, // User's current location
        destination: { lat: 25.4358, lng: 81.8463 }, // Allahabad Junction Railway Station
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        console.error("Directions request failed due to:", error);
      });
  }, [directionsService, directionsRenderer, origin]);

  if (!leg) return null;

  return (
    null
    // <div>
    //   <p>
    //     Distance: {leg.distance?.text} | Duration: {leg.duration?.text}
    //   </p>
    // </div>
  );
}
