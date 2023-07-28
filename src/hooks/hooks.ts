/**
 * create pre-typed versions of the useDispatch and useSelector hooks for usage in your application.
 * This is important for a couple reasons:
 * see: https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
 */

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, ReduxState} from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;
