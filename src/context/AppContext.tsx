import React from 'react';

import AppModalToastContext from './AppModalToastContext';

export const AppContext = ({children}: {children: React.ReactNode}) => (
  <AppModalToastContext>{children}</AppModalToastContext>
);
