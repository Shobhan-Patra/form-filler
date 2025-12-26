// When the popup is loaded, fetch the saved values and set them as placeholders
document.addEventListener('DOMContentLoaded', function () {
  // Retrieve saved data from chrome storage
  chrome.storage.local.get(['userName', 'userEmail', 'userPhone', 'userSkills'], function (data) {
    // Set the placeholders if saved values are available
    if (data.userName) {
      document.getElementById('userName').value = data.userName;
    }
    if (data.userEmail) {
      document.getElementById('userEmail').value = data.userEmail;
    }
    if (data.userPhone) {
      document.getElementById('userPhone').value = data.userPhone;
    }
    if (data.userSkills) {
      document.getElementById('userSkills').value = data.userSkills;
    }
  });
});

document.getElementById("fill").addEventListener("click", () => {
  // Get user entered details from extension popup
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const userPhone = document.getElementById('userPhone').value;
  const userSkills = document.getElementById('userSkills').value;

  let message = 'Your details have been saved and the form is filled!';
  // Check if any of the values are empty
  if (userName === "" || userEmail === "" || userPhone === "" || userSkills === "") {
    message = "Please enter valid field values";
  } else {
    // Save user data to chrome.storage only if all fields are valid
    chrome.storage.local.set({
      'userName': userName,
      'userEmail': userEmail,
      'userPhone': userPhone,
      'userSkills': userSkills
    }, function () {
      console.log('User data saved');
    });

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "fillForm"
      });
    });
  }

  // Display success or error message
  const messageElement = document.getElementById('message');
  messageElement.textContent = message

  if (message === "Please enter valid field values") {
    messageElement.style.color = "red";
  }
  else {
    messageElement.style.color = "green";
  }
});
