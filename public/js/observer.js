export default function () {
  const btcPrice = {
    span: document.querySelector(".price span"),
    p: document.querySelector(".price"),
  };

  const changeColor = ([mutation]) => {
    const changes = {
      new: mutation.addedNodes,
      old: mutation.removedNodes,
    };
    if (changes.new.length && changes.old.length) {
      const priceChange = {
        new: +changes.new[0].nodeValue,
        old: +changes.old[0].nodeValue,
      };
      const cssClass =
        priceChange.new < priceChange.old ? "price-down" : "price-up";
      btcPrice.p.classList.add(cssClass);
      setTimeout(() => {
        btcPrice.p.classList.remove(cssClass);
      }, 1500);
    }
  };

  const observer = new MutationObserver(changeColor);
  observer.observe(btcPrice.span, {
    childList: true,
  });
}
