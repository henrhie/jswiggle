import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { reducer } from '../redux';

type RootState = ReturnType<typeof reducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
