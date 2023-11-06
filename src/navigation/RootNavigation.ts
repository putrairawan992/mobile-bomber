import {
  DrawerActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const currentRoute = () => {
  return navigationRef.getCurrentRoute();
};

export const replace = (name: any, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name, {
        params,
      }),
    );
  }
};

export const openDrawer = () => {
  navigationRef.dispatch(DrawerActions.openDrawer());
};

export const closeDrawer = () => {
  navigationRef.dispatch(DrawerActions.closeDrawer());
};
