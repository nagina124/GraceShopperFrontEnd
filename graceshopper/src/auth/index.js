export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function login(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getUsername() {
  return fetch("https://peaceful-spire-60083.herokuapp.com/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getUser() {
  const user = localStorage.getItem("user");
  console.log(user)
  return user;
}

export function user(result) {
  localStorage.setItem("user", result);
  console.log(result)
}

export function removeUser() {
  localStorage.removeItem("user");
}