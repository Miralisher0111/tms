import React, { Fragment } from 'react'
import { Paper, Table, TableBody, TableContainer, TableRow } from '@mui/material'
import { v4 as uuid } from 'uuid'
import TableCell from '@mui/material/TableCell'
import { GapTableHead, TotalOrBoldRow, VerticalColumn } from '../../../components/layout/GapHelpers'
import { formatNumber, mergeStyles } from '../../../utils'
import globalStyles from '../../../styles/globalStyles'
import GapChartsPart from '../../../components/layout/GapHelpers/GapChartsPart'

const colNames = [
	{ propName: 'total', eqv: 'Итого(UZS екв.)' },
	{ propName: 'nationalCurrency', eqv: 'Нац.вал.(UZS)', canEdit: true },
	{ propName: 'foreignCurrency', eqv: 'Ин.вал.(USD екв.)' },
	{ propName: 'usd', eqv: 'usd', canEdit: true },
	{ propName: 'eur', eqv: 'eur', canEdit: true }
]

interface EditableCellProps {
	canEdit: boolean | undefined
	row: any
	propName: string
	handleEditClick: (
		event: React.MouseEvent<HTMLTableHeaderCellElement> | React.MouseEvent<HTMLTableDataCellElement>
	) => void
	monthIndex: number
	month: string
	eqv: string
	type: string
}

const EditableCell: React.FC<EditableCellProps> = function ({
	canEdit = false,
	row = {},
	propName = 'prop',
	handleEditClick = () => {},
	monthIndex = 0,
	month = 'month',
	eqv = 'eqv',
	type = 'приток'
}) {
	const cellData = formatNumber((row[monthIndex] || {})[propName], true)
	const dataCellInfo = JSON.stringify({
		source: (row[0] || {})['source'],
		type,
		month: month,
		monthIndex: monthIndex + 1,
		role: (row[0] || {})['role'],
		name: (row[0] || {})['indicatorName'],
		cellName: eqv,
		colName: propName,
		numValue: (row[monthIndex] || {})[propName],
		current: formatNumber((row[monthIndex] || {})[propName])
	})
	if (!canEdit) {
		return (
			<TableCell align="center" sx={globalStyles.noWrap}>
				{cellData}
			</TableCell>
		)
	}
	return (
		<TableCell
			sx={{
				borderRight: propName === 'eur' ? '3px solid #7794aa' : 'default',
				...mergeStyles(globalStyles.noWrap, globalStyles.dottedBorder)
			}}
			data-cellinfo={dataCellInfo}
			onClick={handleEditClick}
			title={'Нажмите, чтобы изменить'}
			align="center"
		>
			{cellData}
		</TableCell>
	)
}

interface SimulationTableRowProps {
	months: string[]
	row: any
	handleEditClick: (
		event: React.MouseEvent<HTMLTableHeaderCellElement> | React.MouseEvent<HTMLTableDataCellElement>
	) => void
	type?: string
}

const SimulationTableOneRow: React.FC<SimulationTableRowProps> = function ({
	months = [],
	row = {},
	handleEditClick = () => {},
	type = 'приток'
}) {
	return (
		<TableRow hover key={uuid()}>
			<TableCell align="left" sx={{ borderRight: '3px solid #7794aa', ...globalStyles.noWrap }}>
				{(row[0] || {})['indicatorName']}
			</TableCell>
			{months.map((month, monthIndex) => (
				<Fragment key={uuid()}>
					{colNames.map(({ propName, eqv, canEdit }) => (
						<EditableCell
							key={uuid()}
							row={row}
							propName={propName}
							type={type}
							monthIndex={monthIndex}
							month={month}
							handleEditClick={handleEditClick}
							eqv={eqv}
							canEdit={canEdit}
						/>
					))}
				</Fragment>
			))}
		</TableRow>
	)
}

interface GapSimulationTableProps {
	months: string[]
	sourceOfLiquidity: any
	sourceOfLiquidityTotal: any
	needsOfLiquidity: any
	needsOfLiquidityTotal: any
	vlaLcrData: any
	lcrData: any
	nsfrData: any
	handleEditClick: (
		event: React.MouseEvent<HTMLTableHeaderCellElement> | React.MouseEvent<HTMLTableDataCellElement>
	) => void
}

const GapSimulationTable: React.FC<GapSimulationTableProps> = ({
	months = [],
	sourceOfLiquidity = [],
	sourceOfLiquidityTotal = [],
	needsOfLiquidity = [],
	needsOfLiquidityTotal = [],
	vlaLcrData = [],
	handleEditClick = () => {},
	nsfrData,
	lcrData
}) => {
	return (
		<>
			<TableContainer component={Paper}>
				<Table size="small" aria-label="a dense table">
					<GapTableHead months={months} />
					<TableBody>
						<VerticalColumn data={sourceOfLiquidity} text="приток" />
						{sourceOfLiquidity.map((row: any) => (
							<SimulationTableOneRow handleEditClick={handleEditClick} row={row} months={months} key={uuid()} />
						))}
						<TotalOrBoldRow months={months} blueBackground total={sourceOfLiquidityTotal} />
						<VerticalColumn data={needsOfLiquidity} text="отток" />
						{needsOfLiquidity.map((row: any) => (
							<SimulationTableOneRow
								key={uuid()}
								type="отток"
								months={months}
								row={row}
								handleEditClick={handleEditClick}
							/>
						))}
						<TotalOrBoldRow months={months} blueBackground total={needsOfLiquidityTotal} />
						{vlaLcrData.map((row: any, index: number) => (
							<TotalOrBoldRow
								withPercent={index === 3}
								blueBackground={index === 3}
								key={uuid()}
								align="left"
								months={months}
								total={row}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<GapChartsPart months={months} lcrData={lcrData} vlaLcrData={vlaLcrData} nsfrData={nsfrData} />
		</>
	)
}

export default GapSimulationTable
