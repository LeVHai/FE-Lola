import React, { useEffect, useState } from "react";
import Back from "../../components/Back";
import { Avatar, Card, Col, Input, List, Row, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MessageContent from "../../components/MessageContent";
import apiService from "../../core/service/api";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../core/slices/userSlice";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
const Messenger = () => {
  const token = useSelector((state) => state.auth.token?.access_token);
  const current_user = useSelector(
    (state) => state.current_user.infoCurrentUser
  );
  const { id } = useParams();
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!current_user?._id) {
      dispatch(getCurrentUser(token));
    }
  }, [token]);
  
  useEffect(() => {
    if (id && current_user?._id) {
      const getUser = async () => {
        const res = await apiService.getOneChat({
          userId: id,
          currentUserId: current_user._id,
        });
        setUser(res);
        console.log(res);
      };
      getUser();
    }
  }, [id,current_user]);
  useEffect(() => {
    const fetchConversation = async () => {
      if (current_user?._id) {
        const data = {
          userId: current_user._id,
          limit: 10,
          page: 1,
        };
        const res = await apiService.getChat(data);
        setConversations(res.conversations);
      }
    };
    fetchConversation();
  }, [current_user]);

  const navigate = useNavigate();
  const onShowContentMessenger = (user) => {
    console.log(user);
    
    setUser(user);
    navigate(`/messenger/${user.id}`);
  };

  return (
    <>
      <div className="p-2 main-messenger">
        <Row gutter={16}>
          <Col span={8}>
            <Back />
            <div className="mb-2">
              <Typography.Title level={5}>Đoạn chat</Typography.Title>
              <Input
                style={{ borderRadius: "20px" }}
                placeholder="Tìm kiếm trên messenger"
                prefix={<SearchOutlined />}
              />
            </div>
            <List
              itemLayout="horizontal"
              dataSource={conversations}
              renderItem={(item, index) => {
                return (
                  <List.Item
                    key={item.conversationId}
                    onClick={() => onShowContentMessenger(item)}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ width: "40px", height: "40px" }}
                          src={item?.user.avatar}
                        />
                      }
                      title={item?.user.name}
                      description={
                        item?.lastMessage === null
                          ? "Các bạn hiện có thể nhắn tin cho nhau"
                          : item?.lastMessage?.content
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </Col>
          <Col span={16}>
            <MessageContent
              receiver={user}
           
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Messenger;
