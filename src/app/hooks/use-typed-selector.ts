import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { IState } from '../redux/reducers';

export const useTypedSelector: TypedUseSelectorHook<IState> = useSelector;
