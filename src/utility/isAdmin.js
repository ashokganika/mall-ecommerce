const isAdmin = (url) => url.split("/")[1] === "admin";
export default isAdmin;
