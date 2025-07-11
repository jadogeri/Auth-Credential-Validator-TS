const emailRegex : RegExp = /^(?!.*\.\.)(?!^\.)[a-zA-Z0-9._%+-/+][a-zA-Z0-9/+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/// /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const usernameRegex : RegExp = /^[a-zA-Z0-9]{4,16}$/;
const passwordRegex : RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,20}$/


export {emailRegex, usernameRegex, passwordRegex}