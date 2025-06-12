let participantCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#addParticipant");

  addButton.addEventListener("click", () => {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    addButton.insertAdjacentHTML("beforebegin", newParticipantHTML);
  });
});

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <h3>Participant ${count}</h3>
      <label for="name${count}">Name</label>
      <input type="text" id="name${count}" name="name${count}" required>

      <label for="email${count}">Email</label>
      <input type="email" id="email${count}" name="email${count}" required>

      <label for="fee${count}">Fee</label>
      <input type="number" id="fee${count}" name="fee${count}" required>
    </section>
  `;
}

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

function successTemplate(info) {
  return `
    <h2>Thank you, ${info.name}!</h2>
    <p>You have registered ${info.count} participant(s) and owe $${info.total.toFixed(2)} in fees.</p>
  `;
}


