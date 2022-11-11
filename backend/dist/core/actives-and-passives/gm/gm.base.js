"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmBase = void 0;
const base_1 = require("../../base");
class GmBase extends base_1.Base {
    constructor() {
        super(...arguments);
        this.codes = [
            { checkAccount: '20214', operationType: 'Депозиты до востребования', codeCurrency: '840' },
            { checkAccount: '20214', operationType: 'Депозиты до востребования', codeCurrency: '978' },
            { checkAccount: '20214', operationType: 'Депозиты до востребования', codeCurrency: '643' },
            { checkAccount: '20214', operationType: 'Депозиты до востребования', codeCurrency: '000' },
            {
                checkAccount: '20414',
                operationType: 'Сберегательный счет (залоговые сред.)',
                codeCurrency: '840'
            },
            {
                checkAccount: '20414',
                operationType: 'Сберегательный счет (залоговые сред.)',
                codeCurrency: '978'
            },
            { checkAccount: '20614', operationType: 'Срочные депозиты', codeCurrency: '840' },
            { checkAccount: '20614', operationType: 'Срочные депозиты', codeCurrency: '978' },
            { checkAccount: '20614', operationType: 'Срочные депозиты', codeCurrency: '643' },
            { checkAccount: '20614', operationType: 'Срочные депозиты', codeCurrency: '000' },
            {
                checkAccount: '22602',
                operationType: 'Депозиты клиентов по аккредитивам',
                codeCurrency: '978'
            },
            {
                checkAccount: '22602',
                operationType: 'Депозиты клиентов по аккредитивам',
                codeCurrency: '840'
            },
            {
                checkAccount: '22602',
                operationType: 'Депозиты клиентов по аккредитивам',
                codeCurrency: '643'
            },
            {
                checkAccount: '22614',
                operationType: 'Cконвертированные cредства клиентов',
                codeCurrency: '643'
            },
            {
                checkAccount: '22614',
                operationType: 'Cконвертированные cредства клиентов',
                codeCurrency: '978'
            },
            {
                checkAccount: '22614',
                operationType: 'Cконвертированные cредства клиентов',
                codeCurrency: '840'
            },
            { checkAccount: '22624', operationType: 'Счет подакцизных товаров', codeCurrency: '000' },
            {
                checkAccount: '22613',
                operationType: 'Зарезервированные средства для конвертации',
                codeCurrency: '000'
            }
        ];
        this.accredetivQuery = (codeCurrency) => {
            return () => {
                return `SELECT ROUND((NVL(SUM(saldo_out) / POWER(10, 2), 0)), 2) AS "saldoOut"
              FROM (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                   saldo_out
                            FROM ibs.saldo@iabs sl
                            WHERE sl.account_code = ac.code
                              AND sl.oper_day < DATE '${this.date}'
                              AND ROWNUM = 1) AS saldo_out
                    FROM ibs.accounts@iabs ac
                    WHERE code_coa IN ('90908', '90909', '90916')
                      AND code_currency = '${codeCurrency}'
                      AND client_code = '00532305')`;
            };
        };
        this.accredetivLiabilityQuery = () => {
            return `SELECT ROUND((NVL(SUM(saldo_out) / POWER(10, 2), 0)), 2) AS "saldoOut"
            FROM (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                 saldo_out
                          FROM ibs.saldo@iabs sl
                          WHERE sl.account_code = ac.code
                            AND sl.oper_day < DATE '${this.date}'
                            AND ROWNUM = 1) AS saldo_out
                  FROM ibs.accounts@iabs ac
                  WHERE code_coa = '11501'
                    AND code_currency = '840'
                    AND client_code = '00532305')`;
        };
        this.collateralSavingsQuery = () => {
            return `SELECT '20414'                                 AS "checkAccount",
                   'Сберегательный счет (залоговые сред.)' AS "operationType",
                   SALDO_OUT                               AS "parValue",
                   '000'                                   AS "codeCurrency"
            FROM (SELECT * FROM GM ORDER BY OPER_DAY DESC)
            WHERE ROLE = 'A_C'
              AND OPER_DAY < DATE '${this.date}'
              AND ROWNUM = 1`;
        };
        this.autoCreditQuery = () => {
            return `SELECT '20414'                            AS "checkAccount",
                   'Сберегательный счет (Автокредит)' AS "operationType",
                   SALDO_OUT                          AS "parValue",
                   '000'                              AS "codeCurrency"
            FROM (SELECT * FROM GM ORDER BY OPER_DAY DESC)
            WHERE ROLE = 'C'
              AND OPER_DAY < DATE '${this.date}'
              AND ROWNUM = 1`;
        };
        this.mioQuery = () => {
            return `SELECT SALDO_OUT AS "saldoOut"
            FROM (SELECT * FROM GM ORDER BY OPER_DAY DESC)
            WHERE ROLE = 'MIO'
              AND OPER_DAY <= DATE '${this.date}'
              AND ROWNUM = 1`;
        };
    }
    formatQuery(whereQuery) {
        return '';
    }
    gmQuery(codeCoa = '20214', codeCurrency = '000', operationType = 'Депозиты до востребования') {
        return `SELECT '${codeCoa}'       AS "checkAccount",
                   '${operationType}' AS "operationType",
                   PAR_VALUE          AS "parValue",
                   '${codeCurrency}'  AS "codeCurrency"
            FROM (SELECT PAR_VALUE
                  FROM (SELECT ROUND((NVL(SUM(saldo_out) / POWER(10, 2), 0)), 2) PAR_VALUE
                        FROM (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                             saldo_out
                                      FROM ibs.saldo@iabs sl
                                      WHERE sl.account_code = ac.code
                                        AND sl.oper_day < DATE '${this.date}'
                                        AND ROWNUM = 1) AS saldo_out
                              FROM ibs.accounts@iabs ac
                              WHERE code_coa = '${codeCoa}'
                                and code_currency = '${codeCurrency}'
                                and code_filial in ('00073', '00873', '01169')
                                and client_code = '00532305')))`;
    }
    securitySumQuery() {
        return `SELECT ''                                       AS "checkAccount",
                   'Сумма обеспечение обя. по акк. (20214)' AS "operationType",
                   PAR_VALUE                                AS "parValue",
                   '000'                                    AS "codeCurrency"
            FROM (SELECT PAR_VALUE
                  FROM (SELECT ROUND((NVL(SUM(saldo_out) / POWER(10, 2), 0)), 2) PAR_VALUE
                        FROM (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                             saldo_out
                                      FROM ibs.saldo@iabs sl
                                      WHERE sl.account_code = ac.code
                                        AND sl.oper_day < DATE '${this.date}'
                                        AND ROWNUM = 1) AS saldo_out
                              FROM ibs.accounts@iabs ac
                              WHERE code_coa = '20214'
                                and code_currency = '000'
                                and code_filial in ('00073', '00873', '01169')
                                and client_code = '00532305'
                                and substr(code, 8, 20) = '20214000900532305035')))`;
    }
    async getOneRow(codeCoa, codeCurrency, operationType) {
        return await this.getDataInDates(undefined, this.gmQuery.bind(this, codeCoa, codeCurrency, operationType));
    }
    async securitySum() {
        return await this.getDataInDates(undefined, this.securitySumQuery.bind(this));
    }
    async accredetiv() {
        const accredetives = (await Promise.all(['840', '978', '643'].map(c => this.getDataInDates(undefined, this.accredetivQuery(c))))).map(v => v['saldoOut']);
        const { saldoOut = 0 } = await this.getDataInDates('', this.accredetivLiabilityQuery.bind(this, this.date));
        const { saldoOut: mio = 0 } = await this.getDataInDates('', this.mioQuery);
        return {
            acs: accredetives,
            others: [
                {
                    indicatorName: 'Непокрытый текущий аккредитив (МИО)',
                    codeCurrency: 'USD',
                    parValue: mio
                },
                {
                    indicatorName: 'Обязательства по аккредитивам (11501)',
                    codeCurrency: 'USD',
                    parValue: saldoOut
                }
            ]
        };
    }
    async collateralSavings() {
        return await this.getDataInDates(undefined, this.collateralSavingsQuery);
    }
    async autoCredit() {
        return await this.getDataInDates(undefined, this.autoCreditQuery);
    }
    async getCurrencyRate(currencyCode = '840') {
        const query = `SELECT equival as "saldoOut"
                   FROM ibs.s_rate_cur@iabs
                   WHERE date_cross < date '${this.date}'
                     AND code = '${currencyCode}'
                     and ROWNUM = 1
                   ORDER BY DATE_CROSS DESC`;
        const { saldoOut } = await this.oracleService.executeQuery(query);
        return saldoOut;
    }
    async getRows() {
        await this.accredetiv();
        const rows = await Promise.all(this.codes.map(({ checkAccount, codeCurrency, operationType }) => this.getOneRow(checkAccount, codeCurrency, operationType)));
        const [currRates, securitySum, accredetiv, collateralSavings, autoCredit] = await Promise.all([
            Promise.all(['840', '978', '643'].map(c => this.getCurrencyRate(c))),
            this.securitySum(),
            this.accredetiv(),
            this.collateralSavings(),
            this.autoCredit()
        ]);
        const tableData = [...rows.slice(0, 4), securitySum, ...rows.slice(4)];
        const updatedTableData = [
            ...tableData.slice(0, 7),
            collateralSavings,
            autoCredit,
            ...tableData.slice(7)
        ];
        return [updatedTableData, accredetiv, currRates];
    }
}
exports.GmBase = GmBase;
//# sourceMappingURL=gm.base.js.map