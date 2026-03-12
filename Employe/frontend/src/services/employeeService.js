import axios from "axios";

const API = "http://localhost:5000/api/employees";

export const getEmployees = () => axios.get(API);

export const addEmployee = (employeePayload) =>
  axios.post(API, employeePayload);

export const updateEmployee = (employeeId, employeePayload) =>
  axios.put(`${API}/${employeeId}`, employeePayload);

export const deleteEmployee = (employeeId) =>
  axios.delete(`${API}/${employeeId}`);