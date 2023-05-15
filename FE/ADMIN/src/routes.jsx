import {
    HomeIcon,
    UserCircleIcon,
    InboxStackIcon,
    Squares2X2Icon,
    ArrowRightOnRectangleIcon,
    TicketIcon,
    UserPlusIcon,
    IdentificationIcon,
    UserGroupIcon,
    QueueListIcon,
    ClipboardDocumentListIcon,
    GiftTopIcon,
    ComputerDesktopIcon
} from "@heroicons/react/24/solid";
import Home from "./pages/dashboard/home";
import Profile from "./pages/dashboard/profile";
// Quiz Test
import Category from "./pages/dashboard/category";
import Question from "./pages/dashboard/question";
import Users from "./pages/dashboard/user";
import Answer from "./pages/dashboard/answer";
import Topic from "./pages/dashboard/topic";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                name: "dashboard",
                path: "/home",
                element: <Home />,
            },
            {
                icon: <IdentificationIcon {...icon} />,
                name: "Category",
                path: "/category",
                element: <Category />,
            },
            {
                icon: <UserGroupIcon {...icon} />,
                name: "User",
                path: "/user",
                element: <Users />,
            },
            {
                icon: <QueueListIcon {...icon} />,
                name: "Question",
                path: "/question",
                element: <Question />,
            },
            {
                icon: <ClipboardDocumentListIcon   {...icon} />,
                name: "AnsWer",
                path: "/answer",
                element: <Answer />,
            },
            {
                icon: <ComputerDesktopIcon   {...icon} />,
                name: "Topic",
                path: "/topic",
                element: <Topic />,
            },
            {
                icon: <UserCircleIcon {...icon} />,
                name: "profile",
                path: "/profile",
                element: <Profile />,
            },
            {
                icon: <ArrowRightOnRectangleIcon {...icon} />,
                name: "log out",
                path: "/sign-in",
                element: <Profile />,
            },
        ],
    },
];

export default routes;
