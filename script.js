let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "เข้าสู่ระบบ" : "สมัครสมาชิก";
  document.querySelector("a").innerText = isLogin ? "👉 ยังไม่มีบัญชี? สมัครสมาชิก" : "👉 มีบัญชีแล้ว? เข้าสู่ระบบ";
  document.getElementById("message").innerText = "";
}

function submitForm() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let msg = document.getElementById("message");

  if (user === "" || pass === "") {
    msg.style.color = "red";
    msg.innerText = "❌ กรุณากรอกข้อมูลให้ครบ";
    return;
  }

  if (isLogin) {
    let storedPass = localStorage.getItem(user);
    if (storedPass && storedPass === pass) {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      document.getElementById("user-name").innerText = user;
    } else {
      msg.style.color = "red";
      msg.innerText = "❌ Username หรือ Password ไม่ถูกต้อง";
    }
  } else {
    if (localStorage.getItem(user)) {
      msg.style.color = "red";
      msg.innerText = "❌ Username นี้ถูกใช้แล้ว";
    } else {
      localStorage.setItem(user, pass);
      msg.style.color = "green";
      msg.innerText = "✅ สมัครสมาชิกสำเร็จ! โปรดเข้าสู่ระบบ";
      toggleForm();
    }
  }
}

function logout() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("message").innerText = "";
  isLogin = true;
  document.getElementById("form-title").innerText = "เข้าสู่ระบบ";
  document.querySelector("a").innerText = "👉 ยังไม่มีบัญชี? สมัครสมาชิก";
}
