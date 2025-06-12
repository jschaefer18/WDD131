import { participantTemplate, successTemplate } from "./templates.js";

let participantCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#addParticipant");

  addButton.addEventListener("click", () => {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    addButton.insertAdjacentHTML("beforebegin", newParticipantHTML);
  });
});


document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const adultName = document.querySelector("#adult_name").value;
  const participantCount = document.querySelectorAll("[class^=participant]").length;
  const total = totalFees();

  document.querySelector("form").style.display = "none";

  document.querySelector("#summary").innerHTML = successTemplate({
    name: adultName,
    count: participantCount,
    total: total
  });
}

function totalFees() {
  let feeElements = [...document.querySelectorAll("[id^=fee]")];
  return feeElements.reduce((sum, input) => {
    let val = parseFloat(input.value);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
}




