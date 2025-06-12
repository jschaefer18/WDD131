export function participantTemplate(count) {
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

export function successTemplate(info) {
  return `
    <h2>Thank you, ${info.name}!</h2>
    <p>You have registered ${info.count} participant(s) and owe $${info.total.toFixed(2)} in fees.</p>
  `;
}
