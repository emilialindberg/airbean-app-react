import { useContext } from 'react';
import StoreContext from '../store/Store';

export const useStore = () => useContext(StoreContext);