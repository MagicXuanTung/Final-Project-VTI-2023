import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Col, Typography, Form, Button, Tooltip, Row, Modal, Input } from "antd";
import {
    DeleteFilled,
    EditFilled,
    EyeFilled,
} from '@ant-design/icons';
import { getUserss, addUser , updateUsers } from "./apiAMid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import e from "cors";
export const active = [
    {
        id: true,
        value: "Hoạt động "
    },
    {
        id: false,
        value: "Không Hoạt động "
    }
]
export const okButtonProps = {
    style: {
        backgroundColor: '#1890ff',
        color: '#ffffff',
    },
}
function User() {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [dataUser, setDataUser] = useState([]);
    const [updateUser, setUpdateUser] = useState({});
    const [shouldOpenModal, setShouldOpenMosal] = useState(false)
    const handleGetData = async () => {
        getUserss().then(res => setDataUser(res?.data?.data));

    }
    useEffect(() => {
        handleGetData();
    }, [])
    const handleCancel = () => {
        setShouldOpenMosal(false);
    };
    const handleUpdateUse = (data) => {
        console.log(" chao bn ", data)
        setUpdateUser(data)
        setShouldOpenMosal(true)
        form.setFieldsValue({
            userName: data?.userName,
            passWord:  data?.passWord,
            email:  data?.email,
        })
    }
    const onFinish = async (valuse) => {
        
        valuse.createdTime = "null";
        valuse.isActive = "true";
        valuse.role = [];
        if(!updateUser.id){
             const res= await addUser(valuse);
              if(res?.status === 200)
              {
                toast.success("User add successfully")
              }else{
                toast.error("User add failed")
              }
            handleGetData();
            handleGetData();
            setShouldOpenMosal(false)
        }else{
            valuse.id = updateUser?.id;
            console.log(" upsdat" , valuse);
            const res= await  updateUsers(updateUser?.id , valuse);
            if(res?.status === 200)
            {
              toast.success("User adjust successfully")
            }else{
              toast.error("User adjust failed")
            }
            handleGetData();
            handleGetData();
            setShouldOpenMosal(false)
        }


        form.resetFields();
    }
    const columns = [
        {
            title: "Action",
            render: (rowData) => {
                return (
                    <div className="createStaff-action ">
                        <Tooltip placement="top" title="Information">
                            <Button type="primary" shape="circle" >
                                <EyeFilled className='eyeFilled-icon' />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Update">
                            <Button type="primary" shape="circle" onClick={() => handleUpdateUse(rowData)} >
                                <EditFilled className="editFilled-icon"
                                />
                            </Button>

                        </Tooltip>
                        <Tooltip placement="top" title="Delete">
                            <Button type="primary" shape="circle" >
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
            title: "userName",
            field: "userName",
        }, {
            title: "email",
            field: "email",
        },
        {
            title: "active",
            field: "active",
            render: (rowData) => active[rowData?.active]
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
            <Title level={3}> USER CONTROLLER</Title>
            <Button onClick={() => setShouldOpenMosal(true)} style={{ backgroundColor: "#0099FF", color: "#fff", fontSize: "18px", height: "40px", width: "120px", marginLeft: 20 }}>
                Add User
            </Button>
            <div style={{ margin: 20 }}>
                <MaterialTable
                    columns={columns}
                    data={dataUser}
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

            <Modal centered title={!updateUser?.id ? "User register " : " Adjust User"} open={shouldOpenModal} footer={null} onCancel={handleCancel} okButtonProps={okButtonProps}>
                <Form form={form} onFinish={onFinish}>
                    <Row>
                        <Col span={20}>
                            <Form.Item
                                label="Enter Username "
                                name="userName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc phải nhập trường này!',
                                    },

                                ]}
                            >
                                <Input style={{ width: '100 %' }} />
                            </Form.Item>
                        </Col >
                        <Col span={20}>
                            <Form.Item
                                label="Enter password"
                                name="passWord"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc phải nhập trường này!',
                                    },

                                ]}>
                                <Input style={{ width: '100 %' }} />
                            </Form.Item>
                        </Col>
                        <Col span={20}>
                            <Form.Item
                                label="Enter Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Bắt buộc phải nhập trường này!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Không đúng định dạng email!',
                                    }
                                ]}>
                                <Input style={{ width: '100 %' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="action-btn" >

                        <Button className="cancel" style={{ backgroundColor: '#FF9E43', color: "#EEEEEE", fontSize: 15, width: 72}}>Cancel</Button>
                        <Button htmlType="submit" className="sub" style={{ backgroundColor: '#1890ff', color: "#EEEEEE", fontSize: 15, width: 60 }}> Save</Button>
                    </div>
                </Form>
            </Modal>

        </div>
    </>

}

export default User;
