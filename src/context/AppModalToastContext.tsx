/* eslint-disable react/jsx-no-constructed-context-values */
import React, {createContext, useState} from 'react';

type ModalToastType = 'success' | 'error' | 'warning';

interface ModalToastContextInterface {
  isShowToast: boolean;
  type: ModalToastType;
  setType: (value: ModalToastType) => void;
  setIsShowToast: (value: boolean) => void;
  toastMessage: string;
  setToastMessage: (value: string) => void;
}

export const ModalToastContext = createContext<ModalToastContextInterface>({
  isShowToast: false,
  type: 'success',
  setType: () => undefined,
  setIsShowToast: () => undefined,
  toastMessage: '',
  setToastMessage: () => undefined,
});

function AppModalToastContext({children}: {children: React.ReactNode}) {
  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState('halo');
  const [type, setType] = useState<ModalToastType>('success');
  return (
    <ModalToastContext.Provider
      value={{
        type,
        setType,
        isShowToast,
        setIsShowToast,
        toastMessage,
        setToastMessage,
      }}>
      {children}
    </ModalToastContext.Provider>
  );
}

export default AppModalToastContext;
