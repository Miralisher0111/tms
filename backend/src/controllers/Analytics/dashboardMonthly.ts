import { Request, Response } from 'express'
import asyncMiddleware from '../../utils/async'
import getDashboardMonthlyData from '../../utils/dashboardMonthly'

// @desc Get Dashboard Monthly
// @route /api/dashboardmonthly
// access Private
const getDashboardMonthly = asyncMiddleware(
	async (
		req: Request<
			{},
			{},
			{},
			{
				firstDate: string
				secondDate: string
				dateOption: string
			}
		>,
		res: Response
	) => {
		const { firstDate, secondDate, dateOption } = req.query
		const dashboardMonthlyData = await getDashboardMonthlyData(firstDate, secondDate, dateOption)
		res.status(200).json({ success: true, rows: dashboardMonthlyData })
	}
)

export default getDashboardMonthly
