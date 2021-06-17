export default function auth(to, from, next) {
  if (!localStorage.getItem("token") && !localStorage.getItem("userData")) {
    return next({ name: "Login" });
  }
  return next();
}
