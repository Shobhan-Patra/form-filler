chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "fillForm") {
    // Get storad user details from chrome.local
    chrome.storage.local.get(['userName', 'userEmail', 'userPhone', 'userSkills'], function(result) {
      const savedFields = {
        name: result.userName || "",
        email: result.userEmail || "",
        phone: result.userPhone || "",
        skills: result.userSkills || "",
      };
      fillForm(savedFields); // Fill form with saved details
    });
  }
});

// Finds labels for a given element
function getLabel(element) {
  const labels = document.getElementsByTagName("label");
  for (let label of labels) {
    if (label.htmlFor === element.id) {
      return label.textContent.toLowerCase();
    }
  }
  return "";
}

// Checks if field matches given keywords
function checkField(field, keywords) {
  const fieldName = (field?.name || "").toLowerCase();
  const fieldValue = (field?.value || "").toLowerCase();
  const fieldPlaceholder = (field?.placeholder || "").toLowerCase();
  const fieldLabel = getLabel(field);

  const fieldDetails = fieldName + fieldValue + fieldPlaceholder + fieldLabel;
  return keywords.some(keyword => fieldDetails.includes(keyword));
}

function fillForm(savedFields) {
  const fieldsToFill = ["name", "email", "phone", "skills"];

  const fieldKeywords = {
    name: ["name", "first", "last", "full"],
    email: ["email", "e-mail", "gmail", "g-mail"],
    phone: ["mobile", "phone", "tel", "contact"],
    skills: ["skills", "topics", "experience"]
  };

  // Detects desired fields from all input fields and fills them according to saved user details
  document.querySelectorAll("input").forEach(input => {
    fieldsToFill.forEach(field => {
      if (checkField(input, fieldKeywords[field])) {
        input.value = savedFields[field];
      }
    })

    // Send out input events for better compatibility with React/Vue frameworkd
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
