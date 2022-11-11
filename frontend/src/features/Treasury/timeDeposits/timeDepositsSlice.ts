import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { checkCacheOrFetch } from '../../../utils/axios-utils'
import { APIRoutes } from '../../../interfaces/api-routes.interface'

const initialState = {
	loading: false,
	timeDeposits: {
		tableData: [],
		currentBalance: [],
		balanceInMonthBegin: []
	},
	error: null
}

export const fetchTimeDeposits = checkCacheOrFetch(APIRoutes.timeDeposits)

const timeDepositsSlice = createSlice({
	name: APIRoutes.timeDeposits,
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchTimeDeposits.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchTimeDeposits.fulfilled, (state, action: PayloadAction<any>) => {
			state.loading = false
			state.timeDeposits = action.payload
		})
		builder.addCase(fetchTimeDeposits.rejected, (state, action: PayloadAction<any>) => {
			state.loading = false
			state.error = action.payload
		})
	}
})

export const timeDepositsActions = timeDepositsSlice.actions
export const timeDepositsReducer = timeDepositsSlice.reducer
