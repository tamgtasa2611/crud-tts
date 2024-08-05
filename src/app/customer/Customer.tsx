import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Modal, Row, Space, Table, Tag} from "antd";
import type {TableProps} from "antd";
import {Typography} from "antd";
import {IModalConfig, IDataType} from "./interface";
import CustomerModal from "@/components/customer/CustomerModal";
import {deleteCustomer, getCustomers} from "@/app/customer/api";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {notification} from "antd/lib";

const {Title} = Typography;

const ModalType = {
    CREATE: "create",
    UPDATE: "update"
};

export default function Crud() {
    const [modalConfig, setModalConfig] = useState<IModalConfig>({
        type: "",
        data: null,
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<[]>([]);

    const openModal = (type: string, data?: IDataType) => {
        setModalConfig({
            type: type,
            data: data || null,
        });
    };

    const closeModal = () => {
        setModalConfig({
            type: "",
            data: null,
        });
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleFilled/>,
            content: 'Bạn có chắc muốn xóa khách hàng này?',
            cancelText: "Đóng",
            okText: "Xác nhận",
            okType: "danger",
            maskClosable: true,
            onOk() {
                try {
                    deleteCustomer(id).then(() => {
                        handleReload();
                        notification.success({
                            message: 'Xóa thành công!',
                        })
                    })
                } catch (e) {
                    console.log(e)
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleReload = () => {
        handleRequest();
    }

    const handleRequest = useCallback(() => {
        setLoading(true);
        getCustomers()
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setLoading, setData]);

    useEffect(() => {
        handleRequest();
    }, [handleRequest]);

    const columns: TableProps<IDataType>["columns"] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Họ và tên",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email",
        },
        {
            title: "Đánh giá",
            dataIndex: "jugde",
            key: "jugde",
            render: (_, {judge}) => (
                <>
                    {judge.map((item) => {
                        switch (item) {
                            case "handsome":
                                return (<Tag color="red" key={item}>Đẹp trai</Tag>);
                            case "ugly":
                                return (<Tag color="red" key={item}>Xấu</Tag>);
                            case "idiot":
                                return (<Tag color="red" key={item}>Đần</Tag>);
                        }
                    })}
                </>
            ),
        },
        {
            title: "Tình trạng",
            key: "status",
            dataIndex: "status",
            render: (_, {status}) => (status === "new" ? "Mới" : "Đã liên hệ"),
        },
        {
            title: "Người phụ trách khách hàng",
            key: "assign_to",
            dataIndex: "assign_to",
            render: (_, {assign_to}) => {
                switch (assign_to) {
                    case "123123123":
                        return "Đạt 09";
                    case "351421419":
                        return "Cường Đzai 1102";
                    case "351421416":
                        return "ThangDT";
                    case "351421412":
                        return "Trung Dai Ca"
                }
            },
        },
        {
            title: "Tên công ty",
            key: "company_name",
            dataIndex: "company_name",
        },
        {
            title: "Quốc gia",
            key: "country",
            dataIndex: "country",
            render: (_, {country}) => {
                switch (country) {
                    case "vn":
                        return "Việt Nam";
                    case "us":
                        return "Mỹ";
                    case "uk":
                        return "Anh";
                }
            },
        },
        {
            title: "Tỉnh/ thành",
            key: "city",
            dataIndex: "city",
            render: (_, {city}) => (city === "hn" ? "Hà Nội" : "TP Hồ Chí Minh"),
        },
        {
            title: "Quận/ Huyện",
            key: "district",
            dataIndex: "district",
            render: (_, {district}) => {
                switch (district) {
                    case "dd":
                        return "Đống Đa";
                    case "tx":
                        return "Thanh Xuân";
                    case "bd":
                        return "Ba Đình";
                    case "hm":
                        return "Hoàng Mai";
                }
            },
        },
        {
            title: "Địa chỉ nhà",
            key: "address",
            dataIndex: "address",
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        openModal(ModalType.UPDATE, record);
                    }}>Sửa</Button>
                    <Button type="primary" danger onClick={() => {
                        handleDelete(record.id);
                    }}>Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row justify="space-between" align="bottom">
                <Col>
                    <Title level={4}>Danh sách khách hàng tiềm năng</Title>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={() => {
                            openModal(ModalType.CREATE);
                        }}
                        style={{marginBottom: 8}}
                    >
                        Thêm khách hàng
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} rowKey={record => record?.id} loading={loading}
                   pagination={{pageSize: 5}}/>
            {modalConfig.type && (
                <CustomerModal
                    open
                    onClose={closeModal}
                    formType={modalConfig.type === "create" ? "create" : "update"}
                    data={modalConfig.data}
                    handleReload={handleReload}
                />
            )}
        </>
    );
}
