import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  PrinterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { message, Layout, Menu } from "antd";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { Header, Content, Footer, Sider } = Layout;

  useEffect(() => {
    const getValidUser = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetCurrentUser();
        dispatch(HideLoading());
        if (response.success) {
          dispatch(SetUser(response.data));
        } else {
          message.error(response.message);
          localStorage.removeItem("token");
          navigate("/login");
          dispatch(HideLoading());
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        message.error("Failed to fetch user data. Please try again.");
        localStorage.removeItem("token");
      }
    };
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);
  const navItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: `${user ? user.name : "Profile"}`,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              " My Profile"
            </span>
          ),
          icon: <PrinterOutlined></PrinterOutlined>,
        },
        {
          label: (
            <Link to="/login" onClick={() => localStorage.removeItem("token")}>
              " Logout"
            </Link>
          ),
          icon: <LogoutOutlined></LogoutOutlined>,
        },
      ],
    },

    {
      key: "print",
      icon: <PrinterOutlined />,
      label: "Print Tickets",
      onClick: () => navigate("/print-tickets"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        dispatch({ type: "user/clearUser" });
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="justify-content-between d-flex align-items-center"
        style={{
          backgroundColor: "#001529",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <h3 className="text-white m-0">Book My Show</h3>
        <Menu
          items={navItems}
          mode="horizontal"
          theme="dark"
          className="flex-1 justify-content-end"
        />
      </Header>
      <div style={{ padding: "20px", minHeight: 380, background: "#fff" }}>
        {children}
      </div>
    </Layout>
  );
};
export default ProtectedRoute;
