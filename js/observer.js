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
    if (changes.new.length !== 0 && changes.old.length !== 0) {
      const priceChange = {
        new: +changes.new[0].nodeValue,
        old: +changes.old[0].nodeValue,
      };
      console.log(priceChange.new, priceChange.old);
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
