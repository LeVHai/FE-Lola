import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Input,
  Layout,
  Menu,
  Space,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import {
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { getCurrentUser } from "../core/slices/userSlice";
import { Outlet } from "react-router-dom";
const DefaultLayout = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const token = useSelector((state) => state.auth.token?.access_token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser(token));
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Layout className="default-layout">
        <Layout.Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider"
        >
          <Sidebar />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="triger-btn"
          ></Button>
        </Layout.Sider>
        <Layout>
          <Layout.Header className="header">
            <Flex
              align="center"
              justify="space-between"
              style={{ width: `${width / 1.3}px` }}
              gap="large"
            >
              <div style={{ width: "100%" }}>
                <Input></Input>
              </div>

              <Flex gap="small" align="center">
                <Tooltip title="Dark/Light" className="icon-header">
                  <i
                    className="fa-solid fa-circle-half-stroke"
                    style={{ color: "#000000", fontSize: "20px" }}
                  ></i>
                </Tooltip>

                <Dropdown
                  overlay={
                    <Menu selectedKeys="0">
                      <Menu.Item key="0">Tiếng Việt</Menu.Item>
                      <Menu.Item key="1">Tiếng Anh</Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Tooltip title="Ngôn ngữ" className="icon-header">
                    <GlobalOutlined style={{ fontSize: "20px" }} />
                  </Tooltip>
                </Dropdown>

                <div></div>

                <Avatar src={currentUser?.avatar} size="large" />
              </Flex>
            </Flex>
          </Layout.Header>
          <Layout.Content
            className="content my-2"
            style={{ width: `${width / 1.4}px` }}
          >
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DefaultLayout;
