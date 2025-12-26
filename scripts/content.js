chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "fillForm") {
    fillForm();
  }
});

function getLabel(element) {
  const labels = document.getElementsByTagName("label");
  for (let label of labels) {
    if (label.htmlFor === element.id) {
      return label.textContent.toLowerCase();
    }
  }
  return "";
}

function checkField(field, keywords) {
  const fieldName = (field?.name || "").toLowerCase();
  const fieldValue = (field?.value || "").toLowerCase();
  const fieldPlaceholder = (field?.placeholder || "").toLowerCase();
  const fieldLabel = getLabel(field);

  const fieldDetails = fieldName + fieldValue + fieldPlaceholder + fieldLabel;
  return keywords.some(keyword => fieldDetails.includes(keyword));
}

function fillForm() {
  const fields = { 
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    skills: "Javascript, Chrome Manifest, Git"
  };

  document.querySelectorAll("input").forEach(input => {
    const nameKeywords = ["name", "first", "last", "full"];
    const emailKeywords = ["email", "e-mail", "gmail", "g-mail"];
    const phoneKeywords = ["mobile", "phone", "tel", "contact"];
    const skillsKeywords = ["skills", "topics", "experience"];

    if (checkField(input, nameKeywords)) {
      input.value = fields.name;
    }
    if (checkField(input, emailKeywords)) {
      input.value = fields.email;
    }
    if (checkField(input, phoneKeywords)) {
      input.value = fields.phone;
    }
    if (checkField(input, skillsKeywords)) {
      input.value = fields.skills;
    }

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
