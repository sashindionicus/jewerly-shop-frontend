const defaultCurrency = '$'
const currencyCookieName = 'currency';

const currenciesSelectorOptions = {
    '$': '$ USD',
    '€': '€ EUR',
    '₴': '₴ UAH',
}

const currenciesURLParams = {
    '$': 'usd',
    '€': 'eur',
    '₴': 'uah',
}

const initCurrencySelector = (values) => {
    $.each(values, function(key, value) {
        $('#currencySelector')
            .append($("<option></option>").attr("value", key).text(value));
    });

    // set current currency option selected
    currentCurrency = getCurrencyCurrency()
    $("#currencySelector").val(currentCurrency).change();
};

const initCurrencySelectorHandler = () => {
    $('#currencySelector').change(function () {
        let currency = $("#currencySelector option:checked").val();
        setCurrencyCookie(currency);
        location.reload();
    });
};

const getCurrencyCurrency = () => {
    if (getCookie(currencyCookieName) === null) {
        setCurrencyCookie(defaultCurrency)
        return defaultCurrency
    }

    return getCookie(currencyCookieName)
}

const setCurrencyCookie = (currency) => {
    setCookie(currencyCookieName, currency)
}

const getCurrencyQueryParameter = () => {
    return currenciesURLParams[getCurrencyCurrency()]
}

if (window.location.pathname !== '/admin.html' && window.location.pathname !== '/admin-panel.html') {
    initCurrencySelector(currenciesSelectorOptions);
    initCurrencySelectorHandler();
}