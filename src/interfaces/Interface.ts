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
