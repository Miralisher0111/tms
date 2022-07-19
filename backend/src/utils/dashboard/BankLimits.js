const MainClass = require('../mainClass')

class BankLimits extends MainClass {
  constructor (date) {
    super(date)
  }

  formatQuery (date, where_query) {
    return `SELECT NAME,
                   SALDO_EQUIVAL_OUT,
                   NVL(FOREIGN_CURRENCY_22, 0)                                       AS FOREIGN_CURRENCY_22,
                   ROUND(NVL(FOREIGN_CURRENCY_22, 0) - NVL(SALDO_EQUIVAL_OUT, 0), 2) AS DIFFER,
                   CASE
                     WHEN FOREIGN_CURRENCY_22 = 0 AND SALDO_EQUIVAL_OUT = 0 THEN 'no_limit'
                     WHEN FOREIGN_CURRENCY_22 = 0 AND SALDO_EQUIVAL_OUT != 0 THEN 'exceeded'
                     ELSE TO_CHAR(ROUND(SALDO_EQUIVAL_OUT * 100 / FOREIGN_CURRENCY_22, 2))
                     END                                                             AS FOR_PERCENT,
                   NVL(FOREIGN_CURRENCY_24, 0)                                       AS FOREIGN_CURRENCY_24
            FROM LIMIT_OF_FOREIGN_BANKS_VIEW`
  }

  localBanksQuery() {
    return `SELECT NAME,
                   NAT_CURR,
                   FOR_CURR,
                   NATIONAL_CURRENCY_22,
                   FOREIGN_CURRENCY_22,
                   ROUND(NATIONAL_CURRENCY_22 - NAT_CURR, 2) AS DIFFER_NAT,
                   ROUND(FOREIGN_CURRENCY_22 - FOR_CURR, 2)  AS DIFFER_FOR,
                   CASE
                     WHEN NATIONAL_CURRENCY_22 = 0 AND NAT_CURR = 0 THEN 'no_limit'
                     WHEN NATIONAL_CURRENCY_22 = 0 AND NAT_CURR != 0 THEN 'exceeded'
                     ELSE TO_CHAR(ROUND(NAT_CURR * 100 / NATIONAL_CURRENCY_22))
                     END                                       AS NAT_CURR_PERCENT,
                   CASE
                     WHEN FOREIGN_CURRENCY_22 = 0 AND FOR_CURR = 0 THEN 'no_limit'
                     WHEN FOREIGN_CURRENCY_22 = 0 AND FOR_CURR != 0 THEN 'exceeded'
                     ELSE TO_CHAR(ROUND(FOR_CURR * 100 / FOREIGN_CURRENCY_22))
                     END                                       AS FOR_CURR_PERCENT,
                   NATIONAL_CURRENCY_24,
                   FOREIGN_CURRENCY_24
            FROM LIMIT_OF_LOCAL_BANKS_VIEW`
  }

  async getLimits (localBanks = false) {
    if(localBanks) {
      return await this.getDataInDates(
          '',
          false,
          this.localBanksQuery,
          true
      )
    }
    return await this.getDataInDates(
      '',
      true,
      false,
      true
    )
  }

  async getRows () {
    const foreignBanks = await this.getLimits()
    const localBanks = await this.getLimits(true)
    return {foreignBanks, localBanks}
  }
}

module.exports = BankLimits