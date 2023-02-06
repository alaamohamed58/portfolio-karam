import { TELEGRAM_TOKEN, CHAT_ID } from "./api.js";

console.log(TELEGRAM_TOKEN);
console.log(CHAT_ID);

//form
const contactForm = document.getElementById("contact-form");
//inputs
const nameInputVal = contactForm.querySelector("input");
const emailInputVal = contactForm.querySelectorAll("input")[1];
const msgValue = contactForm.querySelector("textarea");
let tg = {
  token: TELEGRAM_TOKEN, // Your bot's token that got from @BotFather
  chat_id: CHAT_ID, // The user's(that you want to send a message) telegram chat id
};
//PREVENT SUBMIT BEHAVIOR
let texts = "";
contactForm.onsubmit = (e) => {
  e.preventDefault();

  texts = `Name : ${nameInputVal.value} ____ Email : ${emailInputVal.value} ____ Message : ${msgValue.value} `;
  sendMessage(texts);
};

async function sendMessage(text) {
  if (text.trim() === "") return;
  contactForm.querySelector("button").style.display = "none";
  contactForm.querySelector(".loading").style.display = "block";
  const res = await fetch(
    `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${text}`
  );

  if (!res.ok) {
    return (document.querySelector(".error-message").textContent =
      res.statusText);
  }
  contactForm.querySelector("button").style.display = "unset";
  contactForm.querySelector(".sent-message").style.display = "block";
  contactForm.querySelector(".loading").style.display = "";
}
