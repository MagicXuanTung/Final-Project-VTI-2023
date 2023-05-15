

import { BsQuestionSquareFill } from "react-icons/bs";
import { MdTopic } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { HiUsers } from "react-icons/hi";

export const statisticsCardsData = [
  {
    color: "yellow",
    icon: BsQuestionSquareFill,
    title: "Questions",
    value: "53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last month",
    },
  },
  {
    color: "pink",
    icon: MdTopic,
    title: "Topics",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: MdCategory,
    title: "Categories",
    value: "3,462",
    footer: {
      color: "text-green-500",
      value: "+2%",
      label: "than last month",
    },
  },
  {
    color: "blue",
    icon: HiUsers,
    title: "Users",
    value: "103,430K",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than last month",
    },
  },
];

export default statisticsCardsData;
