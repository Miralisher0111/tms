import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined'
import { Link } from 'react-router-dom'

const Forbidden = () => {
	return (
		<Grid container direction="column" alignItems="center" justifyContent="center">
			<div>
				<Typography variant="h2" align="center">
					<b>
						<PanToolOutlinedIcon fontSize="large" />
					</b>
					<br />
					<b>FORBIDDEN</b>
				</Typography>
				<Typography variant="h6" align="center">
					<b>Доступ запрещен</b>
				</Typography>
				<Typography variant="h6" align="center">
					Вы не имеете доступа к этой странице.
				</Typography>
				<br />
			</div>
			<Button
				component={Link}
				to="/"
				sx={{
					maxWidth: 220
				}}
				color="secondary"
				variant="contained"
				size="small"
			>
				Вернуться на главная
			</Button>
		</Grid>
	)
}

export default Forbidden
