import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { RootState } from './store'

export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, any>>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
