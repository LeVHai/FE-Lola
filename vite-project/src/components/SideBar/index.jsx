import {
  CarryOutOutlined,
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Menu, Typography, Modal, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logoutSuccess } from "../../core/slices/authSlice";
const Sidebar = () => {
  const [activeKey, setActiveKey] = useState("1");
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const id = useSelector((state) => state.current_user.infoCurrentUser?._id);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   dispatch(logoutSuccess())
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveKey("1");
        break;
      case `/profile/${id}`:
        setActiveKey("5");
        break;
      case "/friend":
        setActiveKey("2");
        break;
      case "/messenger":
        setActiveKey("3");
        break;
      case "/notification":
        setActiveKey("4");
        break;
      // Add more routes as needed
      default:
        break;
    }
  }, [pathname]);
  const confirm = (e) => {
    dispatch(logoutSuccess())
    message.success("Đăng xuất thành công!");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <>
      <Flex align="center" justify="center">
        <Typography.Title level={1} className="logo">
          Lola
        </Typography.Title>
      </Flex>
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        className="menu-bar"
        style={{ border: "none" }}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: <NavLink to="/">{t("menu.home")} </NavLink>,
          },
          {
            key: "2",
            icon: <UsergroupAddOutlined />,
            label: <NavLink to="/friend">{t("menu.friend")} </NavLink>,
          },
          {
            key: "3",
            icon: <MessageOutlined />,
            label:  <NavLink to={`/messenger`}>{t("menu.messenger")} </NavLink>
          },
          {
            key: "4",
            icon: <ProfileOutlined />,
            label: t("menu.notification"),
          },
          {
            key: "5",
            icon: <UserOutlined />,
            label: (
              <NavLink to={`/profile/${id}`}>{t("menu.profile")} </NavLink>
            ),
          },
          {
            key: "6",
            icon: <LogoutOutlined />,
            label: (
              <Popconfirm
                placement="right"
                title="Đăng xuất"
                description="Bạn có muốn đăng xuất không?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Đăng xuất"
                cancelText="Huỷ"
              >
                <div>{t("menu.logout")}</div>
              </Popconfirm>
            ),
            // onClick: showModal,
          },
        ]}
      ></Menu>
      {/* <Modal
       
        title="Đăng xuất"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Huỷ"
      >
        <p>Bạn có muốn đăng xuất không?</p>
      </Modal> */}
    </>
  );
};

export default Sidebar;
