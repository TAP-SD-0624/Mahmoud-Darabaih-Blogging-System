let userName: string = "new user name ";
let passWord: string = "20181332";

function getUserPass(user: string, pass: string): string {
  return user + pass + "this is from mahmoud";
}

console.log(getUserPass(userName, passWord));
