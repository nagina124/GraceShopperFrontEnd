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

//user information 
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

//userId
export function userId(result) {
  localStorage.setItem("userId", result);
  console.log(result)
}

export function getUserId() {
  const userId = localStorage.getItem("userId");
  console.log(userId)
  return userId;
}

export function removeUserId() {
  localStorage.removeItem("userId");
}


//products for checkout for guests



//products for checkout for guests 

export function addProduct(result) {
  localStorage.setItem("product", result);
  console.log(result)
}

export function getProductForGuests() {
  const products = localStorage.getItem("product");
  return products;
}

export function removeProduct() {
  localStorage.removeItem("product");
}
