import React from 'react';

export interface TableInterface {
  text: string;
  minOrder: number;
}

export interface ListItemInterface {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isShowBorder?: boolean;
}
