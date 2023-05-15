import chartsConfig from "../configs/charts-config";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Visitors",
      data: [5000, 2000, 1000, 2200, 5000, 1000, 4000],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Profit",
      data: [50000, 40000, 30000, 32000, 50000, 35000, 20000, 23000, 53000],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "blue",
    title: "Website Visitors",
    description: "Last Month Performance",
    footer: "Data updated 2 days ago",
    chart: websiteViewsChart,
  },
  {
    color: "pink",
    title: "Topic",
    description: "15% increase in today Topic",
    footer: "Data updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "green",
    title: "Categories",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
  },
  {
    color: "yellow",
    title: "Questions",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
  },
  {
    color: "red",
    title: "Website Visitors",
    description: "Last Month Performance",
    footer: "Data updated 2 days ago",
    chart: websiteViewsChart,
  },
  {
    color: "gray",
    title: "Answer",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: dailySalesChart,
  },
];

export default statisticsChartsData;
