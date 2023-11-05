import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const usePermission = () => {
  const [isFineLocationGranted, setIsFineLocationGranted] = useState(false);
  const [isCameraGranted, setIsCameraGranted] = useState(false);

  const onRequestCamera = useCallback(async () => {
    const result =
      Platform.OS === 'android'
        ? await request(PERMISSIONS.ANDROID.CAMERA)
        : await request(PERMISSIONS.IOS.CAMERA);
    if (result === RESULTS.GRANTED) {
      setIsCameraGranted(true);
    }

    return result === RESULTS.GRANTED;
  }, []);

  const onCheckCamera = useCallback(async () => {
    const result =
      Platform.OS === 'android'
        ? await check(PERMISSIONS.ANDROID.CAMERA)
        : await request(PERMISSIONS.IOS.CAMERA);

    if (result === RESULTS.GRANTED) {
      setIsCameraGranted(true);
      return true;
    } else {
      onRequestCamera();
    }
  }, [onRequestCamera]);

  const cameraPermission = () => {
    return {
      onRequestCamera,
      onCheckCamera,
    };
  };

  const onRequestLocation = useCallback(async () => {
    const granted =
      Platform.OS === 'android'
        ? await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        : await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (granted) {
      setIsCameraGranted(true);
    }
  }, []);

  const onCheckAccessFineLocation = useCallback(async () => {
    const result =
      Platform.OS === 'android'
        ? await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        : await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return result === RESULTS.GRANTED;
  }, []);

  const onCheckLocation = useCallback(async () => {
    const result =
      Platform.OS === 'android'
        ? await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        : await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (result === RESULTS.GRANTED) {
      setIsFineLocationGranted(true);
    } else {
      onRequestLocation();
    }
  }, [onRequestLocation]);

  useEffect(() => {
    onCheckLocation();
  }, [onCheckLocation]);

  const fineLocationPermission = () => {
    return {
      onRequestLocation,
      onCheckLocation,
      onCheckAccessFineLocation,
    };
  };

  return {
    isFineLocationGranted,
    fineLocationPermission,
    isCameraGranted,
    cameraPermission,
    onCheckAccessFineLocation,
    onRequestCamera,
  };
};
