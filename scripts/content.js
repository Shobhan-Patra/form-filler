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
  const savedFields = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    skills: "Javascript, Chrome Manifest, Git"
  };

  const fieldKeywords = {
    name: ["name", "first", "last", "full"],
    email: ["email", "e-mail", "gmail", "g-mail"],
    phone: ["mobile", "phone", "tel", "contact"],
    skills: ["skills", "topics", "experience"]
  };

  document.querySelectorAll("input").forEach(input => {

    ["name", "email", "phone", "skills"].forEach(field => {
      if (checkField(input, fieldKeywords[field])) {
        input.value = savedFields[field];
      }
    })

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
