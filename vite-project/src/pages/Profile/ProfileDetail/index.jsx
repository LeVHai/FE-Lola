// Profile.js
import React, { lazy, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Typography,
  Upload,
} from "antd";
import {
  CameraOutlined,
  MessageOutlined,
  PlusOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import "./style.scss";
import apiService from "../../../core/service/api";
import Back from "../../../components/Back";
import Post from "../../../components/Post";
import LazyLoad from "../../../components/LazyLoad";
import { setState } from "../../../core/slices/userSlice";
import ImageGallery from "../../../components/ImageGallery";
import InfoUser from "../components/InfoUser";
import CreatePost from "../../../components/CreatePost";
import { useNavigate } from "react-router-dom";

const Profile = ({
  user,
  post,
  isOwnProfile,
  token,
  handleFetchData,
  hasMore,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState(null);
  const [previewImage, setPreviewImage] = useState({
    avatar: "",
    cover_photo: "",
  });
  const currentUser = useSelector(
    (state) => state.current_user.infoCurrentUser
  );
  const initialDefault = {
    _id: "",
    name: "",
    date_of_birth: null,
    bio: "",
    location: "",
    website: "",
    username: "",
    avatar: "",
    cover_photo: "",
  };
  const [data, setData] = useState(initialDefault);
const navigate = useNavigate()
  useEffect(() => {
    setData(user);
  }, [user]);

  const handleChange = (field, value) => {
    const _data = _.cloneDeep(data);
    if (_data.hasOwnProperty(field)) {
      _data[field] = value;
    }
    setData(_data);
  };

  const handleBeforeUpload = (field, file) => {
    const objectURL = URL.createObjectURL(file);
    setPreviewImage((prev) => ({ ...prev, [field]: objectURL }));
    setFileList(file);
    return false;
  };

  const handleUpload = async (field) => {
    const updatedUser = _.cloneDeep(data);
    if (fileList) {
      try {
        const fileUpload = new FormData();
        fileUpload.append("image", fileList);
        const res = await apiService.uploadImg(fileUpload);
        const imageUrl = res.result[0].url;
        updatedUser[field] = imageUrl;
      } catch (error) {
        message.error("Upload failed. Please try again.");
        return;
      }
    }
    try {
      const updatedUserInfo = await apiService.updateUser(updatedUser, token);
      dispatch(setState({ infoCurrentUser: updatedUserInfo }));
      URL.revokeObjectURL(previewImage[field]);
      setPreviewImage({
        avatar: "",
        cover_photo: "",
      });
      setFileList(null);
      message.success("Upload successful!");
    } catch (error) {
      message.error("Update failed. Please try again.");
    }
  };

  const handleCancel = (field) => {
    if (field === "avatar") {
      setIsModalOpen(false);
      setData(user);
    }
    setPreviewImage((prev) => ({ ...prev, [field]: "" }));
    setFileList(null);
    URL.revokeObjectURL(previewImage[field]);
  };

  const list = [
    // "http://localhost:4000/static/images/3d6b41097cf992a975e161b1c.jpg",
    // "http://localhost:4000/static/images/3d6b41097cf992a975e161b1c.jpg",
    // "http://localhost:4000/static/images/3d6b41097cf992a975e161b1c.jpg",
    // "http://localhost:4000/static/images/3d6b41097cf992a975e161b1c.jpg",
    // "http://localhost:4000/static/images/3d6b41097cf992a975e161b1c.jpg",
    // Additional image URLs...
  ];

  const handleStartChat = async () => {
    const data = {
      user1: currentUser?._id,
      user2: user?._id,
    };
    await apiService.createChat(data);
    navigate(`/messenger/${user._id}`)
  };

  return isLoading ? (
    <div>d</div>
  ) : (
    <>
      <Back />
      <div className="profile">
        <div className="h-15rem relative">
          <img
            className="w-full h-full"
            src={previewImage.cover_photo || user?.cover_photo}
            alt="Cover"
          />
          {isOwnProfile && (
            <div className="absolute" style={{ right: "20px", bottom: "10px" }}>
              {previewImage.cover_photo ? (
                <Space>
                  <Button onClick={() => handleCancel("cover_photo")}>
                    Huỷ
                  </Button>
                  <Button
                    onClick={() => handleUpload("cover_photo")}
                    icon={<UploadOutlined />}
                    type="primary"
                  >
                    Đồng ý
                  </Button>
                </Space>
              ) : (
                <Upload
                  customRequest={() => {}}
                  beforeUpload={(file) =>
                    handleBeforeUpload("cover_photo", file)
                  }
                  showUploadList={false}
                >
                  <Button icon={<CameraOutlined />}>Upload</Button>
                </Upload>
              )}
            </div>
          )}

          <div className="avatar">
            <Avatar
              style={{ width: "150px", height: "150px" }}
              src={user?.avatar}
            />
          </div>
        </div>
        <Flex justify="space-between" className="mt-5">
          <Typography.Title>{user?.name}</Typography.Title>
          {isOwnProfile && (
            <Button
              onClick={() => setIsModalOpen(!isModalOpen)}
              icon={<SettingOutlined />}
              type="primary"
            >
              Chỉnh sửa thông tin
            </Button>
          )}
          {!isOwnProfile && (
            <Space>
              <Button onClick={handleStartChat} icon={<MessageOutlined />}>Nhắn tin</Button>
              <Button type="primary" icon={<PlusOutlined />}>
                Theo dõi
              </Button>
            </Space>
          )}
        </Flex>
        {isOwnProfile && (
          <Modal
            closeIcon={false}
            style={{ top: 20 }}
            title={
              <Flex justify="space-between">
                <Typography.Text>Chỉnh sửa thông tin</Typography.Text>{" "}
                <Space>
                  <Button onClick={() => handleUpload("avatar")} type="primary">
                    Lưu
                  </Button>
                  <Button onClick={() => handleCancel("avatar")}>
                    Quay lại
                  </Button>
                </Space>
              </Flex>
            }
            open={isModalOpen}
            footer={null}
            onCancel={() => {
              handleCancel("avatar");
            }}
          >
            <Form
              layout="vertical"
              style={{ maxHeight: "80vh", overflowY: "scroll" }}
            >
              <Form.Item>
                <Space size="middle">
                  <Avatar
                    style={{ width: "100px", height: "100px" }}
                    src={previewImage.avatar || user?.avatar}
                  />
                  <Upload
                    customRequest={() => {}}
                    beforeUpload={(file) => handleBeforeUpload("avatar", file)}
                    showUploadList={false}
                  >
                    <Button>Tải ảnh lên</Button>
                  </Upload>
                  {previewImage.avatar && (
                    <Button
                      type="primary"
                      onClick={() => handleCancel("avatar")}
                    >
                      Huỷ
                    </Button>
                  )}
                </Space>
              </Form.Item>
              <Form.Item label="Tên">
                <Input
                  value={data?.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Bio">
                <Input.TextArea
                  autoSize={{ minRows: 2 }}
                  value={data?.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Website">
                <Input
                  value={data?.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Địa chỉ">
                <Input
                  value={data?.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Ngày sinh">
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  value={
                    data?.date_of_birth ? moment(data?.date_of_birth) : null
                  }
                  onChange={(date, dateString) =>
                    handleChange("date_of_birth", dateString)
                  }
                />
              </Form.Item>
            </Form>
          </Modal>
        )}
        <Row gutter={20}>
          <Col span={10}>
            <div className="flex flex-column gap-3 sticky top-0">
              <InfoUser user={user} />
              <ImageGallery image={list} />
            </div>
          </Col>
          <Col span={14}>
            {isOwnProfile && <CreatePost user={user} token={token} />}
            <LazyLoad
              dataLength={post.length}
              fetchData={handleFetchData}
              hasMore={hasMore}
            >
              <Flex vertical gap={5}>
                {post.length > 0 &&
                  post.map((i) => (
                    <Post key={i._id} post={i} user={user} token={token} />
                  ))}
              </Flex>
            </LazyLoad>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
