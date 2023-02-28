export enum APIRoutes {
	dashboard = 'dashboard',
	creditData = 'creditData',
	fcrb = 'fcrb',
	mainIndicators = 'mainIndicators',
	calcFor = 'calcFor',
	calcForUpdateCbn = '/api/calcFor/updateCbn',
	capital = 'capital',
	profitAndLost = 'profitAndLost',
	liquidity = 'liquidity',
	liquidityCurrent = '/api/liquidity/currentState',
	correspondent = 'correspondent',
	correspondentCurrent = '/api/correspondent/currentState',
	currencyPosition = 'currencyPosition',
	vlaBuffer = 'vlaBuffer',
	placedAttracted = 'placedAttracted',
	interbankDeposits = 'interbankDeposits',
	topDeposits = 'topDeposits',
	timeDepoClients = 'timeDepoClients',
	timeDeposits = 'timeDeposits',
	depositsByDeadline = 'depositsByDeadline',
	reportLiabilities = 'reportLiabilities',
	reportLiabilities216 = '/api/reportLiabilities216',
	filialEffectiveness = 'filialEffectiveness',
	corrAccountsAnalyze = '/api/corrAccountsAnalyze',
	incomeAnalysis = 'incomeAnalysis',
	caaManual = '/api/caaManual',
	corrOperations = 'corrOperations',
	filialCp = 'filialCp',
	gm = 'gm',
	gap = '/api/gap',
	gapLastUpdate = '/api/gap/lastUpdate',
	gapSimulation = '/api/gapManual',
	competitiveAnalysis = 'competitiveAnalysis'
}

export type ApiRoutesType = keyof typeof APIRoutes
