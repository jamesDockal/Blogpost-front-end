import Cookies from "js-cookie";

export default function isLogged() {
  const user = Cookies.get("user");

  // console.log(user);

  if (user) {
    return user;
  } else {
    return false;
  }
}
