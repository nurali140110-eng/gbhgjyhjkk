// --- Данные пользователей (вместо users.json, чтобы всё работало офлайн) ---
const usersData = [
  {
    "username": "admin",
    "password": "12345",
    "name": "Администратор",
    "email": "admin@example.com"
  },
  {
    "username": "user",
    "password": "qwerty",
    "name": "Нурали",
    "email": "nurali.alybaev@mail.ru"
  }
];
 
// --- Получаем элементы со страницы ---
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginContainer = document.getElementById("login-container");
const dashboard = document.getElementById("dashboard");
const errorMsg = document.getElementById("error-msg");
 
// --- Авторизация пользователя ---
loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
 
  // Ищем пользователя в массиве
  const user = usersData.find(u => u.username === username && u.password === password);
 
  if (user) {
    // Если данные верные — показываем личный кабинет
    loginContainer.classList.add("hidden");
    dashboard.classList.remove("hidden");
 
    document.getElementById("welcome").textContent = `Здравствуйте, ${user.name}!`;
    document.getElementById("user-email").textContent = user.email;
 
    // Сохраняем пользователя в localStorage (чтобы не выходил при обновлении)
    localStorage.setItem("loggedUser", JSON.stringify(user));
 
    errorMsg.textContent = "";
  } else {
    // Если данные неверные — показываем сообщение об ошибке
    errorMsg.textContent = "Неверный логин или пароль!";
  }
});
 
// --- Проверка, вошел ли пользователь ранее ---
window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("loggedUser");
  if (savedUser) {
    const user = JSON.parse(savedUser);
    loginContainer.classList.add("hidden");
    dashboard.classList.remove("hidden");
 
    document.getElementById("welcome").textContent = `Здравствуйте, ${user.name}!`;
    document.getElementById("user-email").textContent = user.email;
  }
});
 
// --- Кнопка выхода ---
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  dashboard.classList.add("hidden");
  loginContainer.classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  errorMsg.textContent = "";
});
