chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "fillForm") {
    fillForm();
  }
});

function fillForm() {
  const fields = { 
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    skills: "Javascript, Chrome Manifest, Git"
  };

  document.querySelectorAll("input").forEach(input => {
    const name = (input.name || "").toLowerCase();

    if (input.type === "text" && name.includes("name")) {
      input.value = fields.name;
    }

    if (input.type === "email") {
      input.value = fields.email;
    }

    if (input.type === "tel") {
      input.value = fields.phone;
    }

    if (input.type === "text" && name.includes("skill")) {
      input.value = fields.skills;
    }

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
