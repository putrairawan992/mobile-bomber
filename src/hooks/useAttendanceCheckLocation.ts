import {useCallback, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {LatLng} from 'react-native-maps';
import {usePermission} from './usePermission';

export const useAttendanceCheckLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const {isFineLocationGranted, fineLocationPermission} = usePermission();
  const [isMockedLocation, setIsMockedLocation] = useState<boolean>(false);

  const getCurrentLocation = useCallback(async () => {
    const onCheckFineLocationAccess =
      await fineLocationPermission().onCheckAccessFineLocation();

    if (onCheckFineLocationAccess) {
      Geolocation.getCurrentPosition(
        position => {
          setIsMockedLocation(position.mocked || false);
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => undefined,
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [fineLocationPermission, setCurrentLocation]);

  const getOneTimeLocation = useCallback(() => {
    if (isFineLocationGranted) {
      Geolocation.getCurrentPosition(
        position => {
          if (!position.mocked) {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          } else {
            setIsMockedLocation(true);
          }
        },
        () => undefined,
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 10000,
        },
      );
    } else {
      setCurrentLocation(null);
    }
  }, [isFineLocationGranted, setCurrentLocation]);

  useEffect(() => {
    if (currentLocation === null) {
      getCurrentLocation();
    }
  }, [currentLocation, getCurrentLocation]);

  return {
    getCurrentLocation,
    getOneTimeLocation,
    currentLocation,
    isMockedLocation,
  };
};
