import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import { Modal, Form, Input, Select, InputNumber } from "antd";
import "antd/dist/reset.css";

import "./App.css";

function App() {
  return (
    <div>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Employee Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  );
}

export default App;



function Home() {
  return (
    <div className="home">
      <h1>Employee Management System</h1>
      <p>Welcome to the HR Employee Dashboard</p>
    </div>
  );
}



function Dashboard() {

  const API = "http://localhost:5000/api/employees";

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form] = Form.useForm();



  const loadEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
    setFilteredEmployees(res.data);
  };



  useEffect(() => {
    loadEmployees();
  }, []);



  const handleSubmit = async (values) => {

    if (editingId) {
      await axios.put(`${API}/${editingId}`, values);
      setEditingId(null);
    } else {
      await axios.post(API, values);
    }

    setOpen(false);
    form.resetFields();
    loadEmployees();
  };



  const handleEdit = (employee) => {
    form.setFieldsValue(employee);
    setEditingId(employee._id);
    setOpen(true);
  };



  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadEmployees();
  };



  const showAll = () => {
    setFilteredEmployees(employees);
  };



  const showActive = () => {
    setFilteredEmployees(
      employees.filter(emp => emp.status === "Active")
    );
  };



  const showInactive = () => {
    setFilteredEmployees(
      employees.filter(emp => emp.status === "Inactive")
    );
  };



  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Department", field: "department" },
    { headerName: "Role", field: "role" },
    { headerName: "Salary", field: "salary" },

    {
      headerName: "Status",
      field: "status",
      cellStyle: params => ({
        color: params.value === "Active" ? "green" : "red",
        fontWeight: "bold"
      })
    },

    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="action-buttons">

          <button
            className="edit-btn"
            onClick={() => handleEdit(params.data)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => handleDelete(params.data._id)}
          >
            Delete
          </button>

        </div>
      )
    }
  ];



  return (
    <div className="dashboard">

      <div className="header-section">

        <h1 className="title">Employee Management Dashboard</h1>

        <button
          className="add-btn"
          onClick={() => {
            form.resetFields();
            setEditingId(null);
            setOpen(true);
          }}
        >
          Add Employee
        </button>


        <div className="filter-container">

          <button className="filter-btn active-filter" onClick={showActive}>
            Show Active
          </button>

          <button className="filter-btn inactive-filter" onClick={showInactive}>
            Show Inactive
          </button>

          <button className="filter-btn all-filter" onClick={showAll}>
            Show All
          </button>

        </div>

      </div>



      <div className="ag-theme-alpine table">

        <AgGridReact
          rowData={filteredEmployees}
          columnDefs={columns}
          pagination
        />

      </div>



      <Modal
        title="Employee Form"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="department" label="Department">
            <Select>
              <Select.Option value="Engineering">Engineering</Select.Option>
              <Select.Option value="Marketing">Marketing</Select.Option>
              <Select.Option value="HR">HR</Select.Option>
              <Select.Option value="Finance">Finance</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Input />
          </Form.Item>

          <Form.Item name="salary" label="Salary">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

        </Form>

      </Modal>

    </div>
  );
}