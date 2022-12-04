import axios from "axios";

const server = axios.create({ baseURL: "http://ec2-3-238-186-29.compute-1.amazonaws.com:5000/" });
//const server = axios.create({ baseURL: "http://localhost:5000/" });

export { server };
