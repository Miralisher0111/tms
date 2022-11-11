"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalCash = void 0;
const correspondent_base_1 = require("./correspondent.base");
class TotalCash extends correspondent_base_1.CorrespondentBase {
    constructor() {
        super(...arguments);
        this.otherBanks = [
            { name: 'Ипак Йули банк, Uzbekistan', code: '00000444' },
            { name: 'НБ ВЭД РУз, Uzbekistan', code: '00000450' },
            { name: 'Asia  Invest bank, Russia', code: '00090007' },
            { name: 'Landesbank Berlin, Germany', code: '00090017' },
            { name: 'Citi Bank, New York, USA', code: '00090020' },
            { name: 'Commerzbank FFT, Germany', code: '00090021' },
            { name: 'Gazprombank, Russia', code: '00090027' },
            { name: 'JP Morgan Chase New York, USA', code: '00090036' },
            { name: 'JP Morgan Chase London, Great Britain', code: '00090037' },
            { name: 'Landes Bank Baden-Wuerttemberg, Germany', code: '00090047' },
            { name: 'Reiffeisen Bank Viena, Austria', code: '00090057' },
            { name: 'Transkapitalbank, Moscow', code: '00090067' },
            { name: 'United Bank Swiss, Switzerland', code: '00090071' },
            { name: 'VTB, Russia', code: '00090077' },
            { name: 'Keb Hana Bank, Seoul, Korea, ', code: '00090121' },
            { name: 'Esxata Bank, Tadjikistan', code: '0' },
            { name: 'Hypo Vereinsbank, Germany', code: '99991222' },
            { name: 'Sumitomo Mitsui Bank Tokyo, Japan', code: '00090063' },
            { name: 'Unicredit Bank Ag', code: '0' },
            { name: 'RosEximbnak, Russia', code: '0' }
        ];
        this.nostroQuery = () => {
            return `SELECT     ROUND((SELECT SUM(saldo_equival_out)
              FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                    saldo_equival_out
                             FROM   ibs.saldo@iabs sl
                             WHERE  sl.account_code = ac.code
                               AND sl.oper_day < DATE '${this.date}'
                               AND ROWNUM = 1) AS saldo_equival_out
                     FROM   ibs.accounts@iabs AC
                     WHERE  code_coa = '10301'
                       AND code_currency = '000')) / POWER(10, 8), 2)       AS "uzs",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10301'
                                           AND code_currency = '156')), 0) / POWER(10, 8), 2) AS "cny",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10301'
                                           AND code_currency = '392')), 0) / POWER(10, 8), 2) AS "jpy",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10301'
                                           AND code_currency = '398')), 0) / POWER(10, 8), 2) AS "kzt",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10301'
                                           AND code_currency = '643')), 0) / POWER(10, 8), 2) AS "rub",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10301'
                                           AND code_currency = '756')), 0) / POWER(10, 8), 2) AS "chf",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10301'
                                           AND code_currency = '826')), 0) / POWER(10, 8), 2) AS "gbp",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10301'
                                           AND code_currency = '840')), 0) / POWER(10, 8), 2) AS "usd",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10301'
                                           AND code_currency = '978')), 0) / POWER(10, 8), 2) AS "eur"
                FROM   dual`;
        };
        this.forQuery = () => {
            return `SELECT ROUND(NVL((SELECT SUM(saldo_equival_out)
                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                        saldo_equival_out
                                 FROM   ibs.saldo@iabs sl
                                 WHERE  sl.account_code = ac.code
                                   AND sl.oper_day < DATE '${this.date}'
                                   AND ROWNUM = 1) AS saldo_equival_out
                         FROM   ibs.accounts@iabs AC
                         WHERE  code_coa = '10309'
                           AND code_currency = '000')), 0) / POWER(10, 8), 2) AS "uzs",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10309'
                                           AND code_currency = '156')), 0) / POWER(10, 8), 2) AS "cny",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10309'
                                           AND code_currency = '392')), 0) / POWER(10, 8), 2) AS "jpy",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10309'
                                           AND code_currency = '398')), 0) / POWER(10, 8), 2) AS "kzt",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10309'
                                           AND code_currency = '643')), 0) / POWER(10, 8), 2) AS "rub",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10309'
                                           AND code_currency = '756')), 0) / POWER(10, 8), 2) AS "chf",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10309'
                                           AND code_currency = '826')), 0) / POWER(10, 8), 2) AS "gbp",
                       ROUND(NVL((SELECT SUM(saldo_out)
                                  FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                        saldo_out
                                                 FROM   ibs.saldo@iabs sl
                                                 WHERE  sl.account_code = ac.code
                                                   AND sl.oper_day < DATE '${this.date}'
                                                   AND ROWNUM = 1) AS saldo_out
                                         FROM   ibs.accounts@iabs AC
                                         WHERE  code_coa = '10309'
                                           AND code_currency = '840')), 0) / POWER(10, 8), 2) AS "usd",
                       ROUND(NVL((SELECT SUM(saldo_out)
                              FROM  (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                                    saldo_out
                                             FROM   ibs.saldo@iabs sl
                                             WHERE  sl.account_code = ac.code
                                               AND sl.oper_day < DATE'${this.date}'
                                               AND ROWNUM = 1) AS saldo_out
                                     FROM   ibs.accounts@iabs AC
                                     WHERE  code_coa = '10309'
                                       AND code_currency = '978')), 0) / POWER(10, 8), 2) AS "eur"
                       FROM DUAL`;
        };
    }
    formatQuery(whereQuery) {
        return `SELECT     (SELECT ROUND(SUM(saldo_out) / POWER(10, 8), 2)
        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                               saldo_out
                        FROM   ibs.saldo@iabs sl
                        WHERE  sl.account_code = ac.code
                          AND sl.oper_day < DATE '${this.date}'
                          AND ROWNUM = 1) AS saldo_out
                FROM   ibs.accounts@iabs AC
                WHERE  code_coa = '10501'
                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                  AND code_currency = '000')) AS "uzs",
                       (SELECT ROUND(SUM(saldo_out) / POWER(10, 6), 2)
                        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                               saldo_out
                                        FROM   ibs.saldo@iabs sl
                                        WHERE  sl.account_code = ac.code
                                          AND sl.oper_day < DATE '${this.date}'
                                          AND ROWNUM = 1) AS saldo_out
                                FROM   ibs.accounts@iabs AC
                                WHERE  code_coa = '10501'
                                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                                  AND code_currency = '156')) AS "cny",
                       (SELECT ROUND(SUM(saldo_out) / POWER(10, 6), 2)
                        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                               saldo_out
                                        FROM   ibs.saldo@iabs sl
                                        WHERE  sl.account_code = ac.code
                                          AND sl.oper_day < DATE '${this.date}'
                                          AND ROWNUM = 1) AS saldo_out
                                FROM   ibs.accounts@iabs AC
                                WHERE  code_coa = '10501'
                                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                                  AND code_currency = '392')) AS "jpy",
                       (SELECT ROUND(SUM(saldo_out) / POWER(10, 8), 2)
                        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                               saldo_out
                                        FROM   ibs.saldo@iabs sl
                                        WHERE  sl.account_code = ac.code
                                          AND sl.oper_day < DATE '${this.date}'
                                          AND ROWNUM = 1) AS saldo_out
                                FROM   ibs.accounts@iabs AC
                                WHERE  code_coa = '10501'
                                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                                  AND code_currency = '398')) AS "kzt",
                       (SELECT ROUND(SUM(saldo_out) / POWER(10, 8), 2)
                        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                               saldo_out
                                        FROM   ibs.saldo@iabs sl
                                        WHERE  sl.account_code = ac.code
                                          AND sl.oper_day < DATE '${this.date}'
                                          AND ROWNUM = 1) AS saldo_out
                                FROM   ibs.accounts@iabs AC
                                WHERE  code_coa = '10501'
                                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                                  AND code_currency = '643')) AS "rub",
                       (SELECT ROUND(SUM(saldo_out) / POWER(10, 8), 2)
                        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                               saldo_out
                                        FROM   ibs.saldo@iabs sl
                                        WHERE  sl.account_code = ac.code
                                          AND sl.oper_day < DATE '${this.date}'
                                          AND ROWNUM = 1) AS saldo_out
                                FROM   ibs.accounts@iabs AC
                                WHERE  code_coa = '10501'
                                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                                  AND code_currency = '756')) AS "chf",
                       (SELECT ROUND(SUM(saldo_out) / POWER(10, 8), 2)
                        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                               saldo_out
                                        FROM   ibs.saldo@iabs sl
                                        WHERE  sl.account_code = ac.code
                                          AND sl.oper_day < DATE '${this.date}'
                                          AND ROWNUM = 1) AS saldo_out
                                FROM   ibs.accounts@iabs AC
                                WHERE  code_coa = '10501'
                                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                                  AND code_currency = '826')) AS "gbp",
                       (SELECT ROUND(SUM(saldo_out) / POWER(10, 8), 2)
                        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                               saldo_out
                                        FROM   ibs.saldo@iabs sl
                                        WHERE  sl.account_code = ac.code
                                          AND sl.oper_day < DATE '${this.date}'
                                          AND ROWNUM = 1) AS saldo_out
                                FROM   ibs.accounts@iabs AC
                                WHERE  code_coa = '10501'
                                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                                  AND code_currency = '840')) AS "usd",
                       (SELECT ROUND(SUM(saldo_out) / POWER(10, 8), 2)
                        FROM   (SELECT (SELECT --+index_desc (sl UK_SALDO_ACCOUNT_DAY)
                                               saldo_out
                                        FROM   ibs.saldo@iabs sl
                                        WHERE  sl.account_code = ac.code
                                          AND sl.oper_day < DATE '${this.date}'
                                          AND ROWNUM = 1) AS saldo_out
                                FROM   ibs.accounts@iabs AC
                                WHERE  code_coa = '10501'
                                  AND SUBSTR(code, 17, 8) = '${whereQuery}'
                                  AND code_currency = '978')) AS "eur"
                FROM   dual`;
    }
    async total_cash_on_hand() {
        return await this.getOneRow('1', 'Всего денежная наличность в кассе', undefined, super.formatQuery.bind(this, '10100'), true);
    }
    cash_at_checkout(total, on_hand) {
        const [uzs, cny, jpy, kzt, rub, chf, gbp, usd, eur] = this.currencyNames.map((c) => total[c] - on_hand[c]);
        return {
            count: '1.1',
            indicatorName: 'Наличные деньги в кассе',
            uzs,
            cny,
            jpy,
            kzt,
            rub,
            chf,
            gbp,
            usd,
            eur
        };
    }
    async cash_on_road() {
        return await this.getOneRow('1.2', 'Денежная наличность в обменных пунктах, банкоматах и деньги в пути', undefined, super.formatQuery.bind(this, '10103'));
    }
    total_correspondent_accounts(nostro, ob_nostro) {
        const [uzs, cny, jpy, kzt, rub, chf, gbp, usd, eur] = this.currencyNames.map((c) => nostro[c] + ob_nostro[c]);
        return {
            count: '2',
            indicatorName: 'Всего корреспондентские счета',
            uzs,
            cny,
            jpy,
            kzt,
            rub,
            chf,
            gbp,
            usd,
            eur,
            isTableHead: true
        };
    }
    corres_accounts_inCB() {
        return {
            count: '2.1',
            indicatorName: 'Корреспондентские счета в ЦБРУ',
            uzs: 0,
            cny: 0,
            jpy: 0,
            kzt: 0,
            rub: 0,
            chf: 0,
            gbp: 0,
            usd: 0,
            eur: 0,
            isTableHead: true
        };
    }
    async nostro() {
        return await this.getOneRow('-', 'Ностро', undefined, this.nostroQuery);
    }
    async f_o_r() {
        return await this.getOneRow('-', 'ФОР', undefined, this.forQuery);
    }
    corres_accounts_inOB() {
        return {
            count: '2.2',
            indicatorName: 'Корреспондентские счета в других банках',
            uzs: 0,
            cny: 0,
            jpy: 0,
            kzt: 0,
            rub: 0,
            chf: 0,
            gbp: 0,
            usd: 0,
            eur: 0,
            isTableHead: true
        };
    }
    ob_nostro(...args) {
        const [uzs, cny, jpy, kzt, rub, chf, gbp, usd, eur] = this.currencyNames.map((c) => this.getTotal(c, ...args));
        return {
            count: '-',
            indicatorName: 'Ностро',
            uzs,
            cny,
            jpy,
            kzt,
            rub,
            chf,
            gbp,
            usd,
            eur,
            isTableHead: true
        };
    }
    async getRows() {
        const otherBankPromises = this.otherBanks.map(({ name, code }) => this.getOneRow('-', name, code, null));
        const [totalCashOnHand, cashOnRoad, nostro, F_O_R, otherBanks] = await Promise.all([
            this.total_cash_on_hand(),
            this.cash_on_road(),
            this.nostro(),
            this.f_o_r(),
            Promise.all(otherBankPromises)
        ]);
        const cashAtCheckout = this.cash_at_checkout(totalCashOnHand, cashOnRoad);
        const obNostro = this.ob_nostro(...otherBanks);
        const totalCorrespondentAccounts = this.total_correspondent_accounts(nostro, obNostro);
        const corresAccountsInCB = this.corres_accounts_inCB();
        const corresAccountsInOB = this.corres_accounts_inOB();
        return [
            [totalCashOnHand, totalCorrespondentAccounts],
            [
                totalCashOnHand,
                cashAtCheckout,
                cashOnRoad,
                totalCorrespondentAccounts,
                corresAccountsInCB,
                nostro,
                F_O_R,
                corresAccountsInOB,
                obNostro,
                ...otherBanks
            ]
        ];
    }
}
exports.TotalCash = TotalCash;
//# sourceMappingURL=total-cash.js.map