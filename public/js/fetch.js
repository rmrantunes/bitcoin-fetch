export default function () {
  const btcPrice = {
    span: document.querySelector(".price span"),
    symbol: document.querySelector(".price sup"),
    p: document.querySelector(".price"),
    updateIn: document.querySelector(".update-in"),
    currenciesForm: document.querySelector(".currency-form"),
    currencies: document.querySelector("#currencies"),
  };
  const URLPattern = /(?<=\/)[A-Z]{3}/g;
  const URLCurrency = location.href.match(URLPattern);
  let initCurrency = URLCurrency ? URLCurrency[0] : "USD";

  const updateInSecs = async () => {
    let i = 30;
    const interval = setInterval(() => {
      i--;
      if (i < 1) {
        i = 30;
        clearInterval(interval);
      }
      btcPrice.updateIn.innerHTML = `Next update in <span>${i}</span> ${
        i > 1 ? "secs" : "sec"
      }.`;
    }, 1000);
  };

  const createCurrencyOptions = (price) => {
    if (btcPrice.currencies.children.length === 0) {
      for (const currency in price) {
        const option = document.createElement("option");
        option.value = currency;
        option.innerText = currency;
        btcPrice.currencies.appendChild(option);
      }
    }
  };

  const bitFetch = async () => {
    try {
      btcPrice.updateIn.innerHTML = `Fetching Price...`;
      const response = await fetch("https://blockchain.info/ticker");
      const price = await response.json();

      createCurrencyOptions(price);
      updateInSecs();
      updatePrice(price, initCurrency);

      btcPrice.currencies.value = initCurrency;

      const selectCurrency = ({ target }, href, updateURL = true) => {
        const currency = target ? target.value : href;
        updatePrice(price, currency);
        updateURL && window.history.pushState(null, null, `${currency}`);
        initCurrency = currency;
      };

      const onURLStateChange = () => {
        const URLCurrency = location.href.match(URLPattern);
        const initCurrency = URLCurrency ? URLCurrency[0] : "USD";
        btcPrice.currencies.value = initCurrency;
        selectCurrency({}, initCurrency, false);
      };

      window.removeEventListener("popstate", onURLStateChange);
      window.addEventListener("popstate", onURLStateChange);
      btcPrice.currenciesForm.addEventListener("change", selectCurrency);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePrice = (price, currency) => {
    const { buy, symbol } = price[currency];
    btcPrice.span.innerText = buy.toFixed(2);
    btcPrice.symbol.innerText = symbol;
  };

  const initFetchInterval = () => {
    setInterval(() => {
      bitFetch();
    }, 1000 * 30);
  };

  bitFetch();
  initFetchInterval();
}
