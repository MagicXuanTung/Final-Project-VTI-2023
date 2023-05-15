import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard from "../../widgets/cards/statistics-card";
import StatisticsChart from "../../widgets/charts/statistics-chart";

import statisticsCardsData from "../../data/statistics-cards-data";
import statisticsChartsData from "../../data/statistics-charts-data";
import projectsTableData from "../../data/projects-table-data";
import ordersOverviewData from "../../data/orders-overview-data";
import { useState, useEffect } from 'react'
import axios from 'axios'


export function Home() {
  const [orders, setOrder] = useState([])

  const fetchData = async () => {
    const token = localStorage.getItem('token')

    console.log(token, "token")
    // eslint-disable-next-line no-undef
    const res = await axios.get(
      'http://localhost:8080/api/v1/orders/getByPagging?pageNumber=0&pageSize=10',
      // { mode: 'cors' },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    const resData = res.data
    console.log({ res })
    const status = res.status
    if (status === 200) {
      if (resData.status === 200) {

        setOrder(resData.data)
        console.log({ dataOrder: resData })
      }
    }
    // data JSON POSTMAN
  }
  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Orders
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["orderCode", "user name", "product name", "date"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
              {orders.map((item, index) => (
                  <tr>
                    {item.delete ? (
                      <></>
                    ) : (
                      <>
                        <td className={`py-3 px-5 ${index === orders.length - 1 ? 'border-b border-blue-gray-50' : "border-b border-blue-gray-50"}`}>
                          <a className="text-xs font-semibold text-blue-gray-600">
                            {item.orderCode}
                          </a>
                        </td>
                        <td className={`py-3 px-5 ${index === orders.length - 1 ? 'border-b border-blue-gray-50' : "border-b border-blue-gray-50"}`}>
                          <a className="text-xs font-semibold text-blue-gray-600">
                            {item.userInfo.name}
                          </a>
                        </td>
                        <td className={`py-3 px-5 ${index === orders.length - 1 ? 'border-b border-blue-gray-50' : "border-b border-blue-gray-50"}`}>
                          <a className="text-xs font-semibold text-blue-gray-600">
                            {item.product.prodName}
                          </a>
                        </td>
                        <td className={`py-3 px-5 ${index === orders.length - 1 ? 'border-b border-blue-gray-50' : "border-b border-blue-gray-50"}`}>
                          <a className="text-xs font-semibold text-blue-gray-600">
                            {item.orderDate}
                          </a>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                      ? "after:h-0"
                      : "after:h-4/6"
                      }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
