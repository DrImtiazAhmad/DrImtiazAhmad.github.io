
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  var BackToTopBtn = document.getElementById("backToTop");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    BackToTopBtn.style.opacity = 0.5;
  } else {
    BackToTopBtn.style.opacity = 0;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sendEmail() {
  var from_name = document.getElementById("sendMessageName").value;
  var from_email = document.getElementById("sendMessageEmail").value;
  var phoneNumber = document.getElementById("sendMessageNumber").value;
  var message = document.getElementById("sendMessageMsg").value;

  var templateParams = {
    from_name,
    phoneNumber,
    message,
    from_email
  };

  if (from_name.length > 0 && from_email.length > 0 && phoneNumber.length > 0 && message.length > 0) {
    if(from_name.length >= 3){
    if (ValidateEmail(from_email)) {
      emailjs.send('service_zxb5qm4', 'template_xi5mu6d', templateParams)
        .then(function (response) {
          showMessage("Message Sent!", false);
          console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
          showMessage("Message not Sent!\nTry again later", true);
          console.log('FAILED...', error);
        });
    }
    else{
      showMessage("Invalid Email!", true);
    }
  }
  else{
    showMessage("Name should be more than 3 letters!", true);
  }
  }
  else {
    showMessage("Please fill the inputs!", true);
  }
}
function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  return (false)
}
function showMessage(message, isError) {
  var error = document.getElementById("error");
  var success = document.getElementById("success")
  if (isError) {
    error.innerHTML = message;
    error.classList.remove("hide");
    success.classList.add("hide");
  }
  else {
    success.innerHTML = message;
    success.classList.remove("hide");
    error.classList.add("hide");
  }
  setInterval(() => {
    success.classList.add("hide");
    error.classList.add("hide");
  }, 2000);
}
