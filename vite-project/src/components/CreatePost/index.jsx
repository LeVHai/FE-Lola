import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Input,
  Layout,
  message,
  Modal,
  Space,
  Spin,
  Typography,
  Upload,
} from "antd";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faImage } from "@fortawesome/free-solid-svg-icons";
import LayoutImage from "../LayoutImage";
import "./style.scss";
import apiService from "../../core/service/api";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../core/slices/postSlice";

const CreatePost = ({ user,token }) => {
  const {loadingCreatePost} = useSelector(state=> state.post)
  const [urlImg, setUrlImg] = useState([]);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const inputRef = useRef(null);

  const handleBeforeUpload = (file) => {
    const createUrl = URL.createObjectURL(file);
    setUrlImg((prev) => [...prev, createUrl]);
    setFiles((prev) => [...prev, file]);
    return false;
  };

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      // Delay focusing to ensure modal content is rendered
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100); // Adjust the delay as needed
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleCancel = () => {
    if (urlImg.length > 0) {
      urlImg.map((url) => {
        URL.revokeObjectURL(url);
      });
    }
    setUrlImg([]);
    setFiles([]);
  };

  const handleSubmit = async () => {
    if (content === "" && files.length === 0) return;
    let img = [];
    if (files.length > 0) {
      const formData = new FormData();
      files.map((file) => formData.append(`image`, file));
      const res = await apiService.uploadImg(formData);
      img = res.result;
    }
    const data = {
      type: 0,
      image: img,
      audience: 1,
      content: content,
      parent_id: null,
      hashtags: [],
      mentions: [],
      medias: [],
    };
    dispatch(createPost({ data, access_token:token ,user }));
    handleCancel()
    setIsModalOpen(false)
    setContent('')
  };

  const renderFooter = (
    <>
     <Spin spinning={loadingCreatePost} fullscreen />
      <Card size="small">
        <Typography.Text>Thêm vào bài viết của bạn</Typography.Text>
        <Space>
          <Upload
            customRequest={() => {}}
            beforeUpload={handleBeforeUpload}
            showUploadList={false}
          >
            <div className="p-2 cursor-pointer">
              <FontAwesomeIcon icon={faImage} style={{ color: "#63E6BE" }} />
              <span className="ml-2">Ảnh</span>
            </div>
          </Upload>

          <div className="p-2">
            <FontAwesomeIcon
              icon={faCameraRetro}
              style={{ color: "#74C0FC" }}
            />
            <span>Video</span>
          </div>
        </Space>
      </Card>
      <Button
        onClick={handleSubmit}
        className="mt-2"
        type="primary"
        style={{ width: "100%" }}
      >
        Đăng bài
      </Button>
    </>
  );

  return (
    <>
      <Card size="small" className="create-post border-round-xl mb-3">
        <Flex gap="large">
          <div>
            <Avatar size="large" alt="avatar" src={user?.avatar}/>
          </div>
          <div className="w-full">
            <Typography.Title level={5}>{user?.name}</Typography.Title>
            <div className="x-input" onClick={() => setIsModalOpen(true)}>
              {content ? (
                <span className="content">{content}</span>
              ) : (
                <span className="placeholder">Bạn đang nghĩ gì?</span>
              )}
            </div>
            <Space className="mt-1">
              <div
                onClick={() => setIsModalOpen(true)}
                className="p-2 cursor-pointer"
              >
                <FontAwesomeIcon icon={faImage} style={{ color: "#63E6BE" }} />
                <span className="ml-2">Ảnh</span>
              </div>

              <div onClick={() => setIsModalOpen(true)} className="p-2">
                <FontAwesomeIcon
                  icon={faCameraRetro}
                  style={{ color: "#74C0FC" }}
                />
                <span>Video</span>
              </div>
            </Space>
          </div>
        </Flex>
        <Modal
          className="x-model"
          style={{ top:20}}
          width={"25rem"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={renderFooter}
        >
          <Layout>
            <Layout.Header style={{ background: "#ffff", padding: 0 }}>
              <Flex gap="small" align="center">
                <div>
                  <Avatar size="large" src={user?.avatar} />
                </div>
                <Typography.Title level={5}>{user?.name}</Typography.Title>
              </Flex>
            </Layout.Header>
            <Layout.Content className="create-content">
              <Input.TextArea
                ref={inputRef}
                value={content}
                onChange={handleChange}
                placeholder="Bạn đang nghĩ gì ?"
                autoSize
                style={{ width: "100%" }}
              />
              {urlImg.length > 0 && (
                <Card size="small" className="my-2 " >
                  <LayoutImage image={urlImg} height={25}/>
                  <div onClick={handleCancel} className="cancel-image">
                    <CloseOutlined />
                  </div>
                </Card>
              )}
            </Layout.Content>
          </Layout>
        </Modal>
      </Card>
    </>
  );
};

export default CreatePost;
