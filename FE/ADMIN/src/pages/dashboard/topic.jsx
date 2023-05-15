import React, { useEffect, useState } from "react";
import { Col, Typography, Form, Button, Collapse, Select, Row, Modal, Input } from "antd";
import { addTopic, getTopic, deleteTopic, getCategory, getQuestionID, updateTopic } from "./apiAMid";
import {

    CaretRightOutlined
} from '@ant-design/icons';
import top from './../../image/3973481.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const okButtonProps = {
    style: {
        backgroundColor: '#1890ff',
        color: '#ffffff',
    },
}


function Topic() {
    const { Option } = Select;
    const { Panel } = Collapse;
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [dataTopic, setDataTopic] = useState([])
    const [modalAboutData, setModalAboutData] = useState({});
    const [shouldModalAbout, setShouldModalAbout] = useState(false)
    const [shouldOpenModal, setShouldOpenModal] = useState(false);
    const [topicUpdate, setTopicUpdate] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    const [dataQuestion, setDataQuestion] = useState([]);
    const handlegetTopic = async () => {
        getTopic().then(res => setDataTopic(res?.data?.data))
    }
    const handleGetAll = () => {
        handlegetTopic();
        handlegetTopic();

    }

    const handleCancel = () => {
        setShouldOpenModal(false);
        form1.resetFields();
        setShouldModalAbout(false)
    };
    const getListCategory = async () => {
        const res = await getCategory();
        if (res?.status === 200) {

            setDataCategory(res?.data?.data);
        } else {
            console.log("Failed");
        }

    }
    useEffect(() => {
        getListCategory();
        handleGetAll();
    }, [])

    const handleCategory = async (event) => {

        handeleGetQuestion(event);
    }
    const handeleGetQuestion = async (data) => {

        getQuestionID(data).then((res) => {
            setDataQuestion(res?.data);

        });

    }
    const onFinish = async (values) => {
        values.id = 1;
        values.questionListID = [];
        values.isDelete = false;
        const res = await addTopic(values);
        if (res?.status === 200) {
            toast.success("Add question successfully");
        } else {
            toast.error(" Add question successfully")
        }
        form.resetFields();
        handleGetAll();
    }
    const handleDeleteTopic = async (data) => {
        const res = await deleteTopic(data?.id);
        if (res?.status === 200) {
            toast.success("Delete question successfully");
        } else {
            toast.error(" Delete question successfully")
        }
        handleGetAll();
    }
    const handleUpdate = async (data) => {
        setShouldOpenModal(true);
        setTopicUpdate(data);
    }
    const onFinish1 = async (values) => {

        const res = await updateTopic(topicUpdate?.id, [values?.quesID]);
        if (res?.status === 200) {
            toast.success("Add Question succsessfully");
        } else {
            toast.error("Add Question falsed")
        }
        form1.resetFields();
        handleGetAll();
    }
    const handleAbout = async (data) => {
        setShouldModalAbout(true);
        setModalAboutData(data)
    }
    console.log("datata" , modalAboutData , modalAboutData?.questionListID?.length);
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
            <Title level={3}>Topic</Title>
            <div style={{ position: "relative", marginLeft: 20, height: 200, width: "1000px", backgroundColor: "#FFA07A", borderRadius: 5 }} >
                <div style={{ margin: "30px 20px 20px 20px ", position: "absolute" }}>
                    <Title style={{ marginBottom: 20 }} level={3}> ADD Topic</Title>
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item
                            label="Topic Name"
                            name="topic"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bắt buộc phải nhập trường này!',
                                },

                            ]}>
                            <Input style={{ width: "140%" }} />
                        </Form.Item>
                        <Button htmlType="submit" style={{ marginLeft: 450, height: 40, width: 120, backgroundColor: '#FFD700', borderColor: '#FFD700', color: "#fff", fontSize: 16 }} >Add</Button>
                    </Form>

                </div>
            </div>
            <Title level={3} style={{ marginTop: 20 }}> List of Topic</Title>
            {dataTopic.length !== 0 ? (<div className="listTopic" style={{ backgroundColor: '#A9A9A9', minHeight: 40, padding: 20, width: "1000px", borderRadius: 5, marginLeft: 20, marginTop: 30 }} >
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{ backgroundColor: "#A9A9A9", paddingTop: 20, paddingBottom: 10 }}
                >
                    {dataTopic.map((item) => {
                        return (
                            <div key={item?.id} style={{ backgroundColor: '#FF9933', height: 100, width: "100%", marginBottom: 30, borderRadius: 5 }} >
                                <div className="content" style={{ display: "flex ", alignItems: "center", paddingTop: 10 }}>
                                    <Title level={4} style={{ padding: 5, marginLeft: 20, width: 600 }}> Topic: {item?.topic}</Title>
                                    <Button onClick={() => handleAbout(item)} style={{ marginLeft: 2, backgroundColor: "#EE82EE	", borderColor: '#EE82EE', color: "#fff"  , marginRight: 5}}> About</Button>
                                    <Button onClick={() => handleUpdate(item)} style={{ marginLeft: 2, backgroundColor: "#BC8F8F", borderColor: '#BC8F8F', color: "#fff",marginRight: 5 }}> Add Question</Button>
                                    <Button onClick={() => handleDeleteTopic(item)} style={{ marginLeft: 2, backgroundColor: "#FF4500", borderColor: '#FF4500', color: "#fff" }}> Delete</Button>
                                </div>
                                {/* <Form form={form1}>
                                    <Row>
                                        <Col span={7} style={{ marginRight: 15 }}>
                                            <Form.Item
                                                label="Select a category"
                                                name="cateID"
                                            >
                                                <Select onChange={(value) => handleCategory(value)}>
                                                    {dataCategory.map(item => {

                                                        return <Option key={item?.id} value={item?.id}>{item?.category}</Option>
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={11} style={{ marginRight: 15 }} >
                                            <Form.Item
                                                label="Select a Question"
                                                name="quesID"
                                            >
                                                <Select>
                                                    {dataQuestion.map(item => {
                                                        return <Option key={item?.id} value={item?.id}>{item?.question}</Option>
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ marginLeft: 10 }}>
                                            <Button htmlType="submit" style={{ backgroundColor: "#0099FF", color: "#fff", }}>
                                                Sreach
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form> */}
                            </div>
                        )
                    })}

                </Collapse>
            </div>) : (<div>
              
                <img style={{ height: 400, width: 600, marginLeft: 200 }} src={top} alt="nodata" />
            </div>)}

        </div>
        <Modal centered open={shouldOpenModal} footer={null} onCancel={handleCancel} okButtonProps={okButtonProps}>
            <Title level={3}> Add Question For Topic</Title>
            <Form form={form1} onFinish={onFinish1}>
                <Row gutter={16}>
                    <Col span={24}> <Form.Item
                        label="Select a category"
                        name="cateID"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc phải nhập trường này!',
                            },

                        ]}>

                        <Select onChange={(value) => handleCategory(value)}>
                            {dataCategory.map(item => {

                                return <Option key={item?.id} value={item?.id}>{item?.category}</Option>
                            })}

                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="Select a Question"
                            name="quesID"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bắt buộc phải nhập trường này!',
                                },

                            ]}
                        >
                            <Select>
                                {dataQuestion.map(item => {
                                    return <Option key={item?.id} value={item?.id}>{item?.question}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Button htmlType="submit" style={{ backgroundColor: "#0099FF", color: "#fff", }}>
                           Add
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Modal centered open={shouldModalAbout} footer={null} onCancel={handleCancel} okButtonProps={okButtonProps} >
            <Title level={3}> List of Question </Title>
            {modalAboutData?.questionListID?.length ? (<> {modalAboutData?.questionListID.map((item) => {
                return <div >  questionId : {item}</div>
            })}</>) : (<div> No Data </div>)}

        </Modal>
    </>
}

export default Topic;
