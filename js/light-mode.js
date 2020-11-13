export default function () {
  const toggle = document.getElementById("toggle"),
    label = document.querySelector(".header-content label");

  const lightMode = () => {
    const body = document.body;
    body.classList.toggle("light");
    label.innerText = body.classList.contains("light")
      ? "Dark Mode Off"
      : "Dark Mode On";
  };

  toggle.addEventListener("click", lightMode);
  lightMode();
}
