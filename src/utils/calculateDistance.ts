interface Coordinates {
  latitude: number;
  longitude: number;
}

interface CalculateDistanceInterface {
  origin: Coordinates;
  destination: Coordinates;
}

export function calculateDistance({
  origin,
  destination,
}: CalculateDistanceInterface) {
  if (
    origin.latitude === origin.longitude &&
    destination.latitude === destination.longitude
  ) {
    return 0;
  } else {
    //var R = 3958.8; // Radius of the Earth in miles
    const R = 6371;
    const rlat1 = origin.latitude * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = destination.latitude * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon =
      (destination.longitude - origin.longitude) * (Math.PI / 180); // Radian difference (longitudes)

    const d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2),
        ),
      );
    return d * 1000;
  }
}
