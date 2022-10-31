import React, { useEffect } from 'react'
import PageTitle from '../../components/UI/Layout/PageTitle'
import Loader from '../../components/UI/Layout/Loader'
import Alert from '../../components/UI/Layout/Alert'
import useTypedSelector from '../../hooks/useTypedSelector'
import CurrencyPositionTable from '../../components/tables/CurrencyPositionTable'
import useActions from '../../hooks/useActions'

const CurrencyPosition = () => {
	const { fetchCurrencyPosition } = useActions()
	const { currencyPosition, loading, error } = useTypedSelector(state => state.currencyPosition)
	const { reportDate } = useTypedSelector(state => state.operDays)
	useEffect(() => {
		fetchCurrencyPosition()
	}, [fetchCurrencyPosition, reportDate])
	return (
		<>
			<PageTitle title="Сведения об открытых валютных позициях банка" />
			{loading ? <Loader /> : error ? <Alert message={error} /> : <CurrencyPositionTable rows={currencyPosition} />}
		</>
	)
}

export default CurrencyPosition
