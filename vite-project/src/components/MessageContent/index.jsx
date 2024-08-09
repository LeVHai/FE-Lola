import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Input,
  List,
  Space,
  Typography,
} from "antd";
import MessengerItem from "../MessengerItem";
import {
  InfoCircleTwoTone,
  PhoneFilled,
  SendOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
import apiService from "../../core/service/api";
import LazyLoad from "../LazyLoad";
import { useSelector } from "react-redux";
import { socket } from "../../App";
const MessageContent = ({ receiver }) => {
  const [content, setContent] = useState([]);
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state.current_user.infoCurrentUser);
  useEffect(() => {
    if (receiver?.conversationId) {
      const fetchMessenger = async () => {
        const data = {
          conversationId: receiver.conversationId,
        };
        const res = await apiService.getMessages(data);
        setContent(res.messages);
      };
      fetchMessenger();
      if (receiver?.conversationId) {
        socket.emit("joinRoom", receiver.conversationId);
      }
    }
  }, [receiver?.conversationId]);

  const [chat, setChat] = useState("");

  useEffect(() => {
    socket.on("messageReceived", (message) => {
      if (message.conversationId === receiver?.conversationId) {
        setContent((prevMessages) => [...prevMessages, message]);
      }
    });
    return () => {
      socket.off("messageReceived");
    };
  }, [receiver?.conversationId]);
  const submit = async () => {
    if (chat === "") return;
    const data = {
      conversationId: receiver.conversationId,
      senderId: user._id,
      content: chat,
    };
    socket.emit("sendMessage", data);
    setChat("");
  };
  useEffect(() => {
    // Scroll to bottom whenever content changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [content]);
  return (
    <>
      {!receiver && (
        <div className="w-full flex justify-content-center align-items-center">
          f
        </div>
      )}
      {receiver && (
        <Card size="small">
          <Flex className="header-msg" align="center" justify="space-between">
            <Flex align="center" gap="small">
              <Avatar src={receiver?.user?.avatar} size="large"></Avatar>
              <div>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  {receiver?.user?.name}
                </Typography.Title>
                <Typography.Text type="secondary">Le hai</Typography.Text>
              </div>
            </Flex>
            <Space>
              <Button type="link" icon={<PhoneFilled />} />
              <Button type="link" icon={<VideoCameraFilled />} />
              <Button type="link" icon={<InfoCircleTwoTone />} />
            </Space>
          </Flex>
          <div className="messenger">
            <Flex className="my-2" justify="center">
              <Flex vertical align="center">
                <Avatar
                  style={{ width: "100px", height: "100px" }}
                  src={receiver?.user?.avatar}
                />
                <Typography.Title level={2}>
                  {" "}
                  {receiver?.user?.name}
                </Typography.Title>
                {
                  <Typography.Text type="secondary">
                    Các bạn hãy nhắn tin cho nhau nào !!
                  </Typography.Text>
                }
              </Flex>
            </Flex>
            {content.length > 0 && (
             
                <div className="list-content">
                  {content.map((mess, i) => {
                    return (
                      <MessengerItem
                        key={i}
                        message={mess}
                        isCurrentUser={
                          user?._id === mess.senderId ? true : false
                        }
                      />
                    );
                  })}
                   <div ref={messagesEndRef} />
                </div>
            )}
          </div>
          <div className="flex pt-4">
            <Input
              value={chat}
              onChange={(e) => setChat(e.target.value)}
              style={{ borderRadius: "20px" }}
              placeholder="Aa"
            />
            <Button onClick={submit} type="link" icon={<SendOutlined />} />
          </div>
        </Card>
      )}
    </>
  );
};

export default MessageContent;
// content_chat.length === 0 ? (
//   <div>Hãy chọn 1 đoạn chat</div>
// ) :
