import { Col, Row, Typography, Form, Input, Select, Button, Tooltip, } from "antd";
import React, { useEffect, useState } from "react";
import { getCategory, addQuestion, getQuestionID, deleteQuestion, updateQuestion } from "./apiAMid";
import MaterialTable from "@material-table/core";
import {
    DeleteFilled,
    EditFilled,

} from '@ant-design/icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import e from "cors";
export const level = [
    {
        "id": 1,
        "level": "Easy"
    },
    {
        "id": 2,
        "level": "Medium"
    },
    {
        "id": 3,
        "level": "Hard"
    },
]
function Question() {
    const { Option } = Select;
    const { Title } = Typography;
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [categoryId, setCategoryIdID] = useState(0);

    const [updateQuestiondata, setUpdateQuestiondata] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    const [dataQuestion, setDataQuestion] = useState([]);

    const getListCategory = async () => {
        const res = await getCategory();
        if (res?.status === 200) {
            setDataCategory(res?.data?.data);
        } else {
            console.log("Failed");
        }

    }
    const handeleGetQuestionAll = async (data) => {
        form2.resetFields();
        getQuestionID(data).then((res) => setDataQuestion(res?.data))
    }

    useEffect(() => {
        getListCategory();
    }, [])
    const handeleGetQuestion = async (data) => {
        await handeleGetQuestionAll(data);
        await handeleGetQuestionAll(data)

    }

    const onFinish = async (value) => {
        setCategoryIdID(value.IdCategory);
        await handeleGetQuestion(value.IdCategory);
    }

    const onFinish2 = async (value) => {
        value.answerList = [];
        value.isDelete = "false";
        if (!updateQuestiondata?.id) {
            const res = await addQuestion(categoryId, value);
            if (res?.status === 200) {
                toast.success("Add Question successfully");
            } else {
                toast.error("Add Question failed")
            }
            await handeleGetQuestion(categoryId);
        } else {
            const res = await updateQuestion(updateQuestiondata?.id, categoryId, value);
            if (res?.status === 200) {
                toast.success("Add Adjust successfully");
            } else {
                toast.error("Add Adjust failed")
            }
            await handeleGetQuestion(categoryId);
        }
        setUpdateQuestiondata({});


    }

    const handleDeleteQuestion = async (data) => {

        const res = await deleteQuestion(data?.id, categoryId);
        if (res?.status === 200) {
            toast.success("Delete Question successfully");
        } else {
            toast.error("Delete Question failed")
        }
        await handeleGetQuestion(categoryId);

    }
    const handleUpdate = async (data) => {
        setUpdateQuestiondata(data);
        form2.setFieldsValue({
            question: data?.question,
            level: data?.level,
        });
    }
    const columns = [
        {
            title: "Action",
            render: (rowData) => {
                return (
                    <div className="createStaff-action ">

                        <Tooltip placement="top" title="Update">
                            <Button type="primary" shape="circle" onClick={() => handleUpdate(rowData)}>
                                <EditFilled className="editFilled-icon"
                                />
                            </Button>

                        </Tooltip>
                        <Tooltip placement="top" title="Delete">
                            <Button type="primary" shape="circle" onClick={() => handleDeleteQuestion(rowData)} >
                                <DeleteFilled className='deleteFilled-icon' />
                            </Button>

                        </Tooltip>
                    </div>
                )
            },

            cellStyle: {
                width: "10%",
            },
        }, {
            title: "ID",
            field: "id",
            cellStyle: {
                width: "5%",
            },
        }, {
            title: "Question",
            field: "question",
            cellStyle: {
                width: "70%",
            },
        }, {
            title: "Level",
            field: "level",
            cellStyle: {
                width: "10%",
            },
        },

    ]
    return <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored" />
        <div className="m-sm-30">
            <div>
                <Title level={3}>Select a Category</Title>
                <Form form={form1} onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Category"
                                name="IdCategory"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc phải nhập trường này!',
                                    },

                                ]}>
                                <Select placeholder="Category">
                                    {dataCategory.map(item => {
                                        return <Option key={item?.id} value={item?.id}>{item?.category}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Button htmlType="submit" style={{ background: "#0066FF", color: "#fff" }}>
                                Select
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div style={{ backgroundColor: "#DDDDDD" }}>
                <Title level={3}>QUESTION CONTROLLER</Title>
                <Form form={form2} onFinish={onFinish2}>
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                        <Col span={20} >
                            <Form.Item
                                label=" Enter a question "
                                name="question"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc phải nhập trường này!',
                                    },

                                ]}>
                                <Input style={{ width: '100 %' }} />
                            </Form.Item>
                        </Col>
                        <Col span={20}  >
                            <Form.Item
                                label="Select level"
                                name="level"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc phải nhập trường này!',
                                    },

                                ]}>
                                <Select>
                                    {level.map((item) => {
                                        return <Option key={item?.id} value={item?.level}>{item?.level}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5} style={{ marginBottom: 15 }}>
                            <Button htmlType="submit" style={{ background: "#0066FF", color: "#fff" }}>
                                Add
                            </Button>
                        </Col>

                    </Row>
                </Form>
            </div>
            <div>
                <Title level={3} style={{ marginTop: 10 }}>Question List </Title>
                <MaterialTable
                    columns={columns}
                    data={dataQuestion}
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
            </div>
        </div >
    </>
}
export default Question;