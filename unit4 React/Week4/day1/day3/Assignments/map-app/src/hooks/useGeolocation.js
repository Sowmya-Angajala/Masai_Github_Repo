import { useEffect, useRef, useState } from "react";

export function useGeolocation(options) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);

  const request = () => {
    if (!("geolocation" in navigator)) {
      setError(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition(pos),
      (err) => setError(err),
      options || { enableHighAccuracy: false, timeout: 10000, maximumAge: 10000 }
    );
    if (watchIdRef.current == null) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => setPosition(pos),
        (err) => setError(err),
        options || { enableHighAccuracy: false, timeout: 10000, maximumAge: 10000 }
      );
    }
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current != null && "geolocation" in navigator) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { position, error, request };
}
