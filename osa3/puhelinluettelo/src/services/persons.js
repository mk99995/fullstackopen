import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  console.log("getting all");
  const request = axios.get(baseUrl);
  console.log("got all");
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  console.log("removing");
  const request = axios.delete(`${baseUrl}/${id}`);
  console.log("removed");
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, update };
