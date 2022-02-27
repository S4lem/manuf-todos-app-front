import axios from "axios";

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
console.log(process.env)
export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  }
});
