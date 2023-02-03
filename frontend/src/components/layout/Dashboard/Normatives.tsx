import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import { TableBody, TableContainer, TableRow } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import BoldWithColor from '../../helpers/BoldWithColor'
import { v4 as uuid } from 'uuid'

const Normatives = () => {
	return (
		<TableContainer component={Paper}>
			<Table size="small">
				<TableHead>
					<TableRow style={{ background: '#7794aa' }}>
						<TableCell align="center">
							<BoldWithColor>1</BoldWithColor>
						</TableCell>
						<TableCell colSpan={2} align="center">
							<BoldWithColor>Показатели достаточности капитала</BoldWithColor>
						</TableCell>
						<TableCell align="center">
							<BoldWithColor>Установленные нормативы</BoldWithColor>
						</TableCell>
						<TableCell align="center">
							<BoldWithColor>Показатели нормативов</BoldWithColor>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{[
						{
							count: '1.1',
							title: 'Коэф. достат. Капитала',
							min: 'мин 13%',
							min_percent: '17.41%'
						},
						{
							count: '1.2',
							title: 'Коэф. достат. капитала – 1',
							min: 'мин 10%',
							min_percent: '13.58%'
						},
						{
							count: '1.3',
							title: 'Коэффициент достат. основ. капитала – 1',
							min: 'мин 8%',
							min_percent: '13.57%'
						},
						{
							count: '1.4',
							title: 'Левераж',
							min: 'мин 6%',
							min_percent: '8.94%'
						}
					].map(row => (
						<TableRow hover key={uuid()}>
							<TableCell align="center">{row.count}</TableCell>
							<TableCell colSpan={2} align="center">
								{row.title}
							</TableCell>
							<TableCell align="center">{row.min}</TableCell>
							<TableCell align="center">{row.min_percent}</TableCell>
						</TableRow>
					))}
					<TableRow style={{ background: '#7794aa' }}>
						<TableCell align="center">
							<BoldWithColor>2</BoldWithColor>
						</TableCell>
						<TableCell colSpan={2} align="center">
							<BoldWithColor>Показатели ликвидности</BoldWithColor>
						</TableCell>
						<TableCell align="center" colSpan={2} />
					</TableRow>
					<TableRow hover>
						<TableCell align="center">2.1</TableCell>
						<TableCell colSpan={2} align="center">
							Доля высоколиквидных активов во всего активах <span style={{ color: 'red' }}>(ВЛА)</span>
						</TableCell>
						<TableCell align="center">мин 10%</TableCell>
						<TableCell align="center">15.43%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell rowSpan={4} align="center">
							2.2
						</TableCell>
						<TableCell rowSpan={4} align="center">
							Коэффициент покрытия ликвидности <span style={{ color: 'red' }}>(LCR)</span>
						</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell>Всего</TableCell>
						<TableCell align="center">мин 100%</TableCell>
						<TableCell align="center">180.19%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell>нац. Валюта</TableCell>
						<TableCell align="center">мин 100%</TableCell>
						<TableCell align="center">170.93%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell>ин. Валюта</TableCell>
						<TableCell align="center">мин 100%</TableCell>
						<TableCell align="center">176.13%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell rowSpan={4} align="center">
							2.3
						</TableCell>
						<TableCell rowSpan={4} align="center">
							Норма чистого стаб. финан. <span style={{ color: 'red' }}>(NSFR)</span>
						</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell>Всего</TableCell>
						<TableCell align="center">мин 100%</TableCell>
						<TableCell align="center">117.24%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell>нац. Валюта</TableCell>
						<TableCell align="center">мин 100%</TableCell>
						<TableCell align="center">130.87%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell>ин. Валюта</TableCell>
						<TableCell align="center">мин 100%</TableCell>
						<TableCell align="center">110.04%</TableCell>
					</TableRow>
					<TableRow style={{ background: '#7794aa' }}>
						<TableCell align="center">
							<BoldWithColor>3</BoldWithColor>
						</TableCell>
						<TableCell colSpan={2} align="center">
							<BoldWithColor>Нормативы по крупным рискам</BoldWithColor>
						</TableCell>
						<TableCell align="center" colSpan={2} />
					</TableRow>
					<TableRow hover>
						<TableCell align="center">3.1</TableCell>
						<TableCell colSpan={2} align="center">
							Макс. размер риска на одного или группу
						</TableCell>
						<TableCell align="center">макс 25%</TableCell>
						<TableCell align="center">21.4%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell align="center">3.2</TableCell>
						<TableCell colSpan={2} align="center">
							Макс. размер риска на один банк или группу
						</TableCell>
						<TableCell align="center">макс 25%</TableCell>
						<TableCell align="center">0.00%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell align="center">3.3</TableCell>
						<TableCell colSpan={2} align="center">
							Макс. размер необеспеч. кредита на одного или группу
						</TableCell>
						<TableCell align="center">макс 5%</TableCell>
						<TableCell align="center">0.00%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell align="center">3.4</TableCell>
						<TableCell colSpan={2} align="center">
							Совокупная сумма всех крупных рисков
						</TableCell>
						<TableCell align="center">макс 500%</TableCell>
						<TableCell align="center">164.18%</TableCell>
					</TableRow>
					<TableRow style={{ background: '#7794aa' }}>
						<TableCell align="center">
							<BoldWithColor>4</BoldWithColor>
						</TableCell>
						<TableCell colSpan={2} align="center">
							<BoldWithColor>Нормативы по ценным бумагам</BoldWithColor>
						</TableCell>
						<TableCell align="center" colSpan={2} />
					</TableRow>
					<TableRow hover>
						<TableCell align="center">4.1</TableCell>
						<TableCell colSpan={2} align="center">
							Макс. размер инвестиций одного юр. лица
						</TableCell>
						<TableCell align="center">макс 15%</TableCell>
						<TableCell align="center">0.00%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell align="center">4.2</TableCell>
						<TableCell colSpan={2} align="center">
							Макс. общий размер инвестиций в ценные бумаги
						</TableCell>
						<TableCell align="center">макс 25%</TableCell>
						<TableCell align="center">0.33%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell align="center">4.3</TableCell>
						<TableCell colSpan={2} align="center">
							Макс. общий размер инвестиций всех эмитентов
						</TableCell>
						<TableCell align="center">макс 50%</TableCell>
						<TableCell align="center">21.39%</TableCell>
					</TableRow>
					<TableRow style={{ background: '#7794aa' }}>
						<TableCell align="center">
							<BoldWithColor>5</BoldWithColor>
						</TableCell>
						<TableCell colSpan={2} align="center">
							<BoldWithColor>Нормативы риска на связанных с банком лиц</BoldWithColor>
						</TableCell>
						<TableCell align="center" colSpan={2} />
					</TableRow>
					<TableRow hover>
						<TableCell align="center">5.1</TableCell>
						<TableCell colSpan={2} align="center">
							Макс. размер риска на одного связанного с банком лица
						</TableCell>
						<TableCell align="center">макс 25%</TableCell>
						<TableCell align="center">11.97%</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell align="center">5.2</TableCell>
						<TableCell colSpan={2} align="center">
							Макс. размер риска по всем связанным с банком лицам
						</TableCell>
						<TableCell align="center">макс 50%</TableCell>
						<TableCell align="center">26.45%</TableCell>
					</TableRow>
					<TableRow style={{ background: '#7794aa' }}>
						<TableCell align="center">
							<BoldWithColor>6</BoldWithColor>
						</TableCell>
						<TableCell colSpan={2} align="center">
							<BoldWithColor>Норматив по инвестициям банка в недвижимость</BoldWithColor>
						</TableCell>
						<TableCell align="center" colSpan={2} />
					</TableRow>
					<TableRow hover>
						<TableCell align="center">6.1</TableCell>
						<TableCell colSpan={2} align="center">
							Норматив по инвестициям банка в недвижимость
						</TableCell>
						<TableCell align="center">макс 100%</TableCell>
						<TableCell align="center">0.0%</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default Normatives
