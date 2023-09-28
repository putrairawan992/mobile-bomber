export interface ImageInterface {
  height: number;
  width: number;
  url?: string;
}

export interface OptionMenuInterface {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export interface PaymentListInterface {
  customer_id: string;
  card_number: string;
}

export interface MonthYearInterface {
  month: number;
  year: number;
}

export interface GalleryMappingInterface {
  id: string;
  url: string;
  caption?: string;
}

export interface AppImageObject {
  id?: string | number;
  thumbUrl?: string;
  url: string;
  caption?: string;
}

export interface CoordinateInterface {
  latitude: number;
  longitude: number;
}
