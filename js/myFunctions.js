const checkbox = document.getElementById('myCheckbox');
const form = document.getElementById('myform');

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    form.classList.remove('hide');
  } else {
    form.classList.add('hide');
  }
});

function validateFullName(input) {
  var value = input.value;
  if (/\d/.test(value)) {
    input.setCustomValidity("يجب إدخال أحرف فقط بدون أرقام.");
  } else {
    input.setCustomValidity("");
  }
}

function validateIdNumber(input) {
  var value = input.value;

  // التحقق من أن القيمة تحتوي على 11 رقمًا
  if (value.length !== 11) {
    input.setCustomValidity("يرجى التأكد من عدد الارقام");
    return;
  }

  // التحقق من أن الرقم الأول ينتمي إلى الأرقام المسموح بها في البداية
  var allowedStartNumbers = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
  ];
  var startNumber = value.substr(0, 2);
  if (!allowedStartNumbers.includes(startNumber)) {
    input.setCustomValidity("الرقم المدخل خاطئ, يرجى التحقق من الرقم ");
    return;
  }

  // التحقق من أن القيمة تحتوي على أرقام فقط
  if (!/^\d+$/.test(value)) {
    input.setCustomValidity("يرجى التأكد من الرقم الوطني");
    return;
  }

  // إزالة رسالة التحذير إذا تم تحقيق جميع الشروط
  input.setCustomValidity("");
}

function validateAge(input) {
  var dob = new Date(input.value);
  var today = new Date();
  var age = today.getFullYear() - dob.getFullYear();

  if (age < 18) {
    input.setCustomValidity("يجب أن يكون عمرك 18 عامًا أو أكثر.");
  } else {
    input.setCustomValidity("");
  }
}

function validatePhoneNumber(input) {
  var phoneNumber = input.value;

  // التحقق من أن عدد الأرقام يكون 10
  if (phoneNumber.length !== 10) {
    input.setCustomValidity("يرجى التأكد من الرقم (Syriatel, MTN)");
    return;
  }

  // التحقق من أن القيمة تحتوي على أرقام فقط
  if (!/^\d+$/.test(phoneNumber)) {
    input.setCustomValidity(" لا يمكن ان يحتوى الرقم على احرف ");
    return;
  }

  // التحقق من أن الرقم يبدأ بأحد الأرقام المسموح بها
  var allowedStartNumbers = ['093', '094', '095', '096', '098', '099'];
  var startNumber = phoneNumber.substr(0, 3);
  if (!allowedStartNumbers.includes(startNumber)) {
    input.setCustomValidity("يجب ان يكون الرقم فقط ضمن  (Syriatel, MTN)");
    return;
  }

  // إزالة رسالة التحذير إذا تم تحقيق جميع الشروط
  input.setCustomValidity("");
}

function validateEmail(input) {
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailPattern.test(input.value)) {
    input.setCustomValidity("يرجى إدخال بريد إلكتروني صحيح.");
  } else {
    input.setCustomValidity("");
  }
}

// الحصول على الإيجار اليومي من العنصر الذي يحمل العنوان "c1p"
var dailyRentElement = document.getElementById("c1p");
var dailyRent = parseInt(dailyRentElement.getAttribute("data-value"));

// حساب سعر إعادة الإعمار والضريبة
var reconstructionFee = dailyRent * 0.01; // 1% من الإيجار اليومي
var tax = dailyRent * 0.05; // 5% من الإيجار اليومي

function cap() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var stringLength = 6;
  var randomString = "";

  for (var i = 0; i < stringLength; i++){
    var rnum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rnum, rnum + 1);
  }

  document.getElementById("capt").value = randomString;
}

function SignIn() {
  var fullName = document.getElementById("txtname");
  var idNumber = document.getElementById("txtid");
  var age = document.getElementById("txtage");
  var phoneNumber = document.getElementById("txtphone");
  var email = document.getElementById("txtemail");
  var captcha = document.getElementById("txtinput");

  if (fullName.checkValidity() && idNumber.checkValidity() && age.checkValidity() && phoneNumber.checkValidity() && email.checkValidity()) {
    if (captcha.value === document.getElementById("capt").value) {
      alert("تم التحقق بنجاح!");
    } else {
      alert("رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى.");
    }
  } else {
    alert("يرجى ملء جميع الحقول بشكل صحيح.");
  }
}

document.getElementById("rIcon").addEventListener("click", function() {
  cap();
});

function checkCaptcha() {
  var captcha = document.getElementById("txtinput");
  if (captcha.value === document.getElementById("capt").value) {
    SignIn();
  } else {
    alert("رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى.");
  }
}

// عرض القيم في الجدول
document.getElementById("tax").textContent = tax.toLocaleString();
document.getElementById("reconstructionFee").textContent = reconstructionFee.toLocaleString();
document.getElementById("dailyRent").textContent = dailyRent.toLocaleString();

function setImageValue() {
  var value = sessionStorage.getItem("imageValue");
  document.getElementById("c1p").setAttribute("data-value", value);
}

function getImageValue() {
  var value = document.getElementById("c1p").getAttribute("data-value");
  sessionStorage.setItem("imageValue", value);
}

function setInitialValues() {
  // الحصول على قيمة الإيجار اليومي
  var dailyRentElement = document.getElementById("dailyRent");
  var dailyRent = parseInt(dailyRentElement.getAttribute("data-value"));
  
  // افتراض عدد أيام معين كأمثلة
  var rentDuration = 7; 
  var durationType = "days";
  
  // حساب الإيجار النهائي والضرائب
  var totalRent;
  var tax;
  var reconstructionFee;
  if (durationType === "days") {
    totalRent = dailyRent * rentDuration;
    tax = totalRent * 0.05;  
    reconstructionFee = totalRent * 0.01; 
  }
  
  // عرض القيم في الجدول
  document.querySelector("#tax").textContent = tax.toLocaleString();
  document.querySelector("#reconstructionFee").textContent = reconstructionFee.toLocaleString();
  document.querySelector("#dailyRent").textContent = totalRent.toLocaleString();
}

document.body.onload = setInitialValues;
