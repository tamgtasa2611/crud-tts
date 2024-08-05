import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import type { FormProps } from "antd";
const { Text } = Typography;
const { Option } = Select;
import { ICustomer } from "@/app/customer/interface";
import styles from "./modal.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  formType: "create" | "update";
  data: ICustomer | null;
};

type FieldType = {
  full_name?: string;
  birthday?: string;
  phone?: string;
  email?: string;
  judge?: [];
  gender?: string;
  other_phone?: string;
  other_email?: string;
  status?: string;
  assign_to?: string;
  company_name?: string;
  career?: string;
  department?: string;
  total_employee?: number;
  country?: string;
  city?: string;
  district?: string;
  address?: string;
};

const validateMessages = {
  required: "Vui lòng nhập trường ${label}!",
  types: {
    email: "${label} không hợp lệ!",
    number: "${label} không hợp lệ!",
  }
};

const ModalForCreateAndUpdate = ({ open, onClose, formType, data }: Props) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Form nhập thông tin khách hàng tiềm năng"
        className={styles.ant_modal_content}
        style={{ top: 20 }}
        open={open}
        onCancel={onClose}
        cancelText="Đóng"
        okText="Thêm khách hàng"
        width={1000}
        okButtonProps={{
          htmlType: "submit",
          form: "create-update-form",
          onClick: () => form.submit(),
        }}
      >
        <Form
          name="create-update-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >

{/* Thong tin khach hang */}

          <Row>
            <Col span={24}>
              <Text type="secondary">Thông tin khách hàng tiềm năng</Text>
            </Col>
          </Row>

          <Row className={styles.description_text} gutter={24}>
            <Col span={12}>
              <Form.Item<FieldType> label="Họ và tên" name="full_name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Giới tính" name="gender">
                <Select onChange={() => {}} allowClear>
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Ngày sinh" name="birthday">
                <DatePicker className={styles.ant_picker} placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Số điện thoại khác" name="other_phone">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="other_email" rules={[{ type: "email" }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tình trạng" name="status" rules={[{ required: true }]}>
                <Select onChange={() => {}} allowClear>
                  <Option value="new">Mới</Option>
                  <Option value="contact">Đã liên hệ</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Đánh giá" name="judge" rules={[{ required: true }]}>
                <Select mode="multiple" onChange={() => {}} allowClear>
                  <Option value="handsome">Đẹp zai</Option>
                  <Option value="ugly">Xấu zai</Option>
                  <Option value="idiot">Đần</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Người phụ trách khách hàng"
                name="assign_to"
                rules={[{ required: true }]}
              >
                <Select onChange={() => {}} allowClear>
                  <Option value="123123123">Đạt 09</Option>
                  <Option value="351421412">Trung Đại Ca</Option>
                  <Option value="351421416">ThangDT</Option>
                  <Option value="351421419">Cường Đzai 1102</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

{/* Thong tin cong ty */}

          <Row className={styles.description_text}>
            <Col span={24}>
              <Text type="secondary">Thông tin công ty</Text>
            </Col>
          </Row>

          <Row className={styles.description_text} gutter={24}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Tên công ty"
                name="company_name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Phòng ban" name="department">
                <Select onChange={() => {}} allowClear>
                  <Option value="media">Phòng truyền thông</Option>
                  <Option value="tester">Phòng đảm bảo chất lượng</Option>
                  <Option value="dev">Phòng phát triển</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<FieldType> label="Ngành nghề" name="career">
                <Select onChange={() => {}} allowClear>
                  <Option value="transfer">Vận tải</Option>
                  <Option value="logistic">Chuỗi cung ứng hàng hóa</Option>
                  <Option value="construction">Xây dựng</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Số lượng nhân viên" name="total_employee">
                <InputNumber min={1} max={9999} className={styles.ant_input_number} />
              </Form.Item>
            </Col>
          </Row>

{/* Thong tin dia chi */}

          <Row className={styles.description_text}>
            <Col span={24}>
              <Text type="secondary">Thông tin địa chỉ</Text>
            </Col>
          </Row>

          <Row className={styles.description_text} gutter={24}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Quốc gia"
                name="country"
                rules={[{ required: true }]}
              >
                <Select onChange={() => {}} allowClear>
                  <Option value="vn">Việt Nam</Option>
                  <Option value="us">Mỹ</Option>
                  <Option value="uk">Anh</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Tỉnh/ thành" name="city"  rules={[{ required: true }]}>
                <Select onChange={() => {}} allowClear>
                  <Option value="hn">Hà Nội</Option>
                  <Option value="hcm">TP Hồ Chí Minh</Option>
                </Select>
              </Form.Item>
            </Col>

             <Col span={12}>
              <Form.Item<FieldType> label="Quận/ Huyện" name="district"  rules={[{ required: true }]}>
                <Select onChange={() => {}} allowClear>
                  <Option value="dd">Đống Đa</Option>
                  <Option value="tx">Thanh Xuân</Option>
                  <Option value="bd">Ba Đình</Option>
                  <Option value="hm">Hoàng Mai  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Địa chỉ nhà" name="address"  rules={[{ required: true }]}>
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForCreateAndUpdate;
