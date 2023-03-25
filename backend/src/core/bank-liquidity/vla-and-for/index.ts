import { OracleService } from '../../../oracle/oracle.service'
import { VlaAndForBase } from './vla-and-for.base'
import { LiquidityAssets } from '../liquidity/liquidity-assets'
import { ILiquidityRow } from '../liquidity/liquidity.interface'

export const getVlaAndForData = async (date: Date, oracleService: OracleService) => {
  let liquidityAssets = await new LiquidityAssets(date, oracleService).getRows()
  liquidityAssets = liquidityAssets.filter(
    ({ indicatorName }) => !['Репо сделки', 'в том числе:'].includes(indicatorName)
  )
  const [interbankDeposits, activesCurrent] = await new VlaAndForBase(date, oracleService).getRows()
  liquidityAssets = [
    ...liquidityAssets.slice(0, 5),
    interbankDeposits,
    ...liquidityAssets.slice(5)
  ].map((v: ILiquidityRow) => {
    v.count = undefined
    return v
  }) as ILiquidityRow[]
  return { liquidityAssets, activesCurrent }
}
