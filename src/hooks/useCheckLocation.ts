import {useCallback, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {LocationInterface} from '../interfaces/UserInterface';
import {usePermission} from './usePermission';
import {useFocusEffect} from '@react-navigation/native';

export const useCheckLocation = () => {
  const [currentLocation, setCurrentLocation] =
    useState<LocationInterface | null>(null);
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

  useFocusEffect(
    useCallback(() => {
      if (currentLocation === null) {
        getCurrentLocation();
      }
    }, [currentLocation, getCurrentLocation]),
  );

  return {
    getCurrentLocation,
    getOneTimeLocation,
    currentLocation,
    isMockedLocation,
    setCurrentLocation,
  };
};
