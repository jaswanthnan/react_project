import { Modal, Form, Input, Select, InputNumber } from "antd";

const EmployeeForm = ({ open, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Employee Form"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="department" label="Department">
          <Select>
            <Select.Option value="Engineering">Engineering</Select.Option>
            <Select.Option value="Marketing">Marketing</Select.Option>
            <Select.Option value="HR">HR</Select.Option>
            <Select.Option value="Finance">Finance</Select.Option>
            <Select.Option value="Sales">Sales</Select.Option>
            <Select.Option value="Operations">Operations</Select.Option>
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
  );
};

export default EmployeeForm;