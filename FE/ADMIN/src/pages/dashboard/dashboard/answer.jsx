import React, { useEffect, useRef, useState } from "react";
import MaterialTable from "@material-table/core";
import { Col, Typography, Form, Button, Tooltip, Row, Collapse, Input, Select, theme } from "antd";
import {
    DeleteFilled,
    EditFilled,
    EyeFilled,
    HomeFilled,
    SettingTwoTone,
    CaretRightOutlined
} from '@ant-design/icons';
 import top from './../../image/3973481.jpg'
import { getCategory, getAllAnswer, getQuestionID, addAnswer, updateAnswerA , deleteAnswer } from "./apiAMid";
import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { queries } from "@testing-library/react";
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
export const boolTrue = [
    {
        "id": 1,
        "isCorrect": "true"
    },

]
export const boolFalse = [
    {
        "id": 1,
        "isCorrect": "false"
    },
]
function Answer() {


    const { Panel } = Collapse;
    const { Title } = Typography;
    const { Option } = Select;
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [size, setSize] = useState(0);
    const [ckeck, setCkeck] = useState(false);
    const [cateId, setCateId] = useState();
    const [quesId, setQuesId] = useState();
    const [updateAnswer, setUpdateAnswer] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    const [dataQuestion, setDataQuestion] = useState([]);

    const [dataAnsWer, setDataAnsWer] = useState([])
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
    }, [])
    useEffect(() => {

        handleGetAnswer();

        // dataAnsWer.filter((item) => {
        //     console.log(" toi ktrm bn ",);
        //     if (item?.isCorrect === true) {
        //         return setCkeck (true);
        //     }
        // })

    }, [cateId, quesId])

    const onFinish = async (valuse) => {
        setCateId(valuse.cateID);
        setQuesId(valuse.quesID);
        form2.resetFields();
    }

    const handleCategory = async (event) => {
        form2.resetFields();
        handeleGetQuestion(event);
        setCkeck(false);
    }
    const handeleGetQuestion = async (data) => {
        form2.resetFields();
        getQuestionID(data).then((res) => {
            setDataQuestion(res?.data);
            setCkeck(false)
        });

    }

    const handleGetAnswerAll = async () => {
        getAllAnswer(cateId, quesId).then(res => {
            setDataAnsWer(res?.data);
            setCkeck(false);
            setSize(res?.data.length);
            handldeCheck(res?.data)
        })

    }
    const handldeCheck = (data) => {
        data.filter((item) => {
            if (item?.isCorrect === true) {
                return setCkeck(true);
            }
        })
    }
    const handleGetAnswer = async () => {
        handleGetAnswerAll();
        handleGetAnswerAll();

    }

    console.log(" ktr", size);
    const onFinish2 = async (values) => {
        values.isDelete = false;

        if (size < 4) {
            addAnswer(quesId, cateId, values)
            await handleGetAnswer()
            form2.resetFields();


        } else {
            console.log("Reach limit");
        }



    }

    const columns = [
        {
            title: "Action",
            render: (rowData) => {
                return (
                    <div className="createStaff-action ">

                        <Tooltip placement="top" title="Update">
                            <Button type="primary" shape="circle">
                                <EditFilled className="editFilled-icon"
                                />
                            </Button>

                        </Tooltip>
                        <Tooltip placement="top" title="Delete">
                            <Button type="primary" shape="circle"  >
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
            title: "answer",
            field: "answer",
            cellStyle: {
                width: "70%",
            },
        }, {
            title: "isCorrect",
            field: "isCorrect",
            cellStyle: {
                width: "10%",
            },
        },

    ]
    //  thu
    const { token } = theme.useToken();

  
    const onFinish3 = async (data) => {
      

        const dataupdate = {
            "answer": data[updateAnswer?.id],
            "id": updateAnswer?.id,
            "isCorrect": updateAnswer?.isCorrect,
            "isDelete": updateAnswer?.isDelete,
        }
        await  updateAnswerA(updateAnswer?.id , quesId , cateId , dataupdate   );
        await handleGetAnswer()
    }
      const handleDelete  = async(data )=>{
        console.log(" data" , data);
        await deleteAnswer(data?.id  , quesId , cateId);
        await handleGetAnswer()
      }
    return <>
        <div className="m-sm-30">
            <Title level={3}>
                ANSWER CONTROLLER
            </Title>
            <div className="content" style={{ marginLeft: 20, marginTop: 40 }}>
                <Form form={form} onFinish={onFinish} >
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
                </Form>
            </div>
            <div className="AnsWer" style={{ backgroundColor: "#DDDDDD", height: 200, }}>
                <Form form={form2} onFinish={onFinish2}>
                    <Row gutter={16}     >
                        <Col span={24}>

                            {ckeck === false ? <Title level={4}> Enter a correct answer</Title> : <Title level={4}> Enter a false answer </Title>}
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Answer"
                                name="answer"
                            >
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Type of answer"
                                name="isCorrect"
                            >
                                {ckeck === false ? (<Select>
                                    {boolTrue.map((item) => {

                                        return <Option key={item?.id} value={item?.isCorrect}>{item?.isCorrect}</Option>

                                    })}

                                </Select>) : (<Select>
                                    {boolFalse.map((item) => {

                                        return <Option key={item?.id} value={item?.isCorrect}>{item?.isCorrect}</Option>

                                    })}

                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col>
                            <Button htmlType="submit" style={{ background: "#0066FF", color: "#fff" }}>
                                Add
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            {/* <div style={{ marginTop: 30 }}>
                    <MaterialTable
                        columns={columns}
                        data={dataAnsWer}
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

                </div> */}
            <div style={{ marginTop: 30 }}>
                {dataAnsWer.length !== 0 ?( <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{ backgroundColor: "red", paddingTop: 20, paddingBottom: 10 }}
                >
                    {dataAnsWer.map((item) => (
                        <Panel onClick={() => { setUpdateAnswer(item) }} header={item?.answer} key={item?.id} style={{ backgroundColor: "#FF99FF", marginTop: 10, marginBottom: 10, borderRadius: 10 }}>
                            <div style={{ backgroundColor: '#FF9933', height: 60, borderRadius: 5, display: "flex", alignItems: "center", }}>
                                <Form form={form3} onFinish={onFinish3} style={{ display: "flex", width: " 700px", marginTop: 20, marginLeft: 40 }}>
                                    <Form.Item label="Enter a new answer"
                                        name={item?.id}>
                                        <Input style={{ width: "350px" }} />
                                    </Form.Item>
                                    <Button htmlType="submit" style={{ marginLeft: 20 }}>
                                        Adjust
                                    </Button>
                                </Form>
                                <Button onClick={()=> handleDelete(item)}>
                                    Delete
                                </Button>
                            </div>
                        </Panel>
                    ))}

                </Collapse>):(<div> 
                    <Title level={3}> KHong co du lieu </Title>
                    <img style={{height: 400 , width: 600 , marginLeft: 200}} src={top} alt="nodata"/>
                </div>)}
               
            </div>
        </div>
    </>
}
export default Answer;




