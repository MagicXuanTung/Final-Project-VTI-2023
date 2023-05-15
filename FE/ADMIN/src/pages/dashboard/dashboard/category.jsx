import { Col, Row, Typography, Empty, Form, Input, Button, Tooltip, Modal, Space, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { getCategory, addCategory, updateCategory, deleteCategory } from "./apiAMid";
import MaterialTable from "@material-table/core";
import {
    DeleteFilled,
    EditFilled,
    EyeFilled,
    HomeFilled,
} from '@ant-design/icons';
function Category() {

    const { Title } = Typography;
    const [form] = Form.useForm();
    const { Panel } = Collapse;
    const [dataCategory, setDataCategory] = useState([]);
    const [updateCategorys, setUpdateCateorys] = useState({});
    const [dataQuestion, setDataQuestion] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const getListCategory = async () => {
        handleget();
        handleget();

    }
    const handleget = async () => {
        const res = await getCategory();
        if (res?.status === 200) {
            console.log(res);
            setDataCategory(res?.data?.data);
        } else {
            console.log("Failed");
        }
    }
    useEffect(() => {
        getListCategory();
    }, [])
    const handleEdit = (data) => {
        setUpdateCateorys(data)
        console.log("data", data);
        form.setFieldsValue({
            category: data?.category,
        });
    }
    const handleDelete = (data) => {
        deleteCategory(data?.id);
        getListCategory();
        // getListCategory();
    }
    const handleShowData = (data) => {
        setDataQuestion(data?.questionList)
        setShowModal(true)
    }
    const onFinish = async (values) => {
        if (!updateCategorys?.id) {
            values.id = "1";
            values.questionList = [];
            values.isDelete = "false";

            addCategory(values);;

            getListCategory();
        } else {

            values.id = updateCategorys?.id;
            values.questionList = updateCategorys?.questionList;
            values.isDelete = "false";

            updateCategory(values?.id, values);

            getListCategory();
        }
        getListCategory();
        setUpdateCateorys({})

        form.resetFields();
    }

    const columns = [
        {
            title: "Action",
            render: (rowData) => {
                return (
                    <div className="createStaff-action ">
                        <Tooltip placement="top" title="Information">
                            <Button type="primary" shape="circle" onClick={() => handleShowData(rowData)}>
                                <EyeFilled className='eyeFilled-icon' />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Update">
                            <Button type="primary" shape="circle" onClick={() => handleEdit(rowData)}>
                                <EditFilled className="editFilled-icon"
                                />
                            </Button>

                        </Tooltip>
                        <Tooltip placement="top" title="Delete">
                            <Button type="primary" shape="circle" onClick={() => handleDelete(rowData)}>
                                <DeleteFilled className='deleteFilled-icon' />
                            </Button>

                        </Tooltip>
                    </div>
                )
            }
        }, {
            title: "ID",
            field: "id",
        }, {
            title: "Category",
            field: "category",
        }, {
            title: "Delete",
            field: "delete",
        },

    ]

    const handleCancel = () => {
        setShowModal(false);
    };

    return <>
        <div className="m-sm-30">
            <div className="content">
                <Title level={3}>CATEGORY CONTROLLER</Title>
            </div>
            <div>
                <Form form={form}
                    onFinish={onFinish}>
                    <Row>
                        <Col span={20} >
                            <Form.Item
                                label="Enter Category's name"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc phải nhập trường này!',
                                    },

                                ]}
                            >
                                <Input style={{ width: '100 %' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ marginLeft: 50 }}>
                        <Col span={5}>
                            <Button htmlType="submit" style={{ background: "#0066FF", color: "#fff" }}>
                                Add Category
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row style={{ marginTop: 50 }}>
                    <Col span={20}>
                        <MaterialTable
                            columns={columns}
                            data={dataCategory}
                            style={{
                                border: "1px solid black",
                                borderRadius: "5px",
                                boxShadow: "0px 0px 5px gray",
                            }}
                            options={{
                                pageSize: 5,
                                pageSizeOptions: [5, 10, 15, 20],
                                rowStyle: (rowData, index) => {
                                    return {
                                        backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                                    };
                                },

                                maxBodyHeight: "1000px",
                                minBodyHeight: "370px",
                                headerStyle: {
                                    backgroundColor: "#262e49",
                                    color: "#fff",
                                },

                                padding: "default",

                                toolbar: false,
                            }} />
                    </Col>
                </Row>
            </div>
        </div>
        <Modal title="Question list" open={showModal} width={800} onCancel={handleCancel} footer={null}>
            <Space direction="vertical" style={{ width: "100%" }}>

                {dataQuestion.map((item) => (
                    <Collapse expandIconPosition="end">
                        <Panel header={`Question : ${item?.question}`} key={item?.id} style={{ fontSize: "20px" }}>
                               {item?.answerList.length !== 0?<> {item?.answerList.map((item)=>{
                                    return <div  key={item?.id} style={{fontSize: 18}}> answer:  {item?.answer}</div>
                                })}</>: <Empty/>}
                        </Panel>
                       
                    </Collapse>
                ))}


            </Space>
        </Modal>
    </>
}
export default Category;
