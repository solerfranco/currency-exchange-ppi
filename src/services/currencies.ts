const basePath = "https://api.vatcomply.com";

export const getRatesWithBase = (baseCurrency : string) => fetch(`${basePath}/rates?base=${baseCurrency}`).then((data) => data.json());

export const getCurrencies = () => fetch(`${basePath}/currencies`).then((data) => data.json());