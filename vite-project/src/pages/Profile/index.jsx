import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./ProfileDetail";
import { useParams } from "react-router-dom";
import { getMyPost } from "../../core/slices/postSlice";
import apiService from "../../core/service/api";

const ProfileCurrentUser = () => {

  const post = useSelector((state) => state.post.user);
  const { access_token } = useSelector((state) => state.auth.token);
  const currentUser = useSelector(
    (state) => state.current_user?.infoCurrentUser
  );
  const {isLoading : useLoading} = useSelector(
    (state) => state.current_user
  );
  const { isLoading } = useSelector((state) => state.post);
const[loading,setLoading] = useState(false)
  const dispatch = useDispatch();

  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const isOwnProfile = id === currentUser?._id ? true : false;

  useEffect(() => {
    if (isOwnProfile) {
      getMyPost({
        page: post.page,
        limit: post.limit,
        id,
        access_token
      });
      setHasMore(post.hasMore);
    }
  }, [isOwnProfile, id]);

  useEffect(() => {
    if (isOwnProfile) {
      setLoading(useLoading)
      setUser(currentUser);
      setPosts(post.data);

    } else {
      const getData = async () => {
      setLoading(true)
        const user = await  apiService.getUser(id)
        const post = await  apiService.getPost({
          page: page,
          limit: 5,
          id,
          access_token
        })
        setUser(user);
        setLoading(false)
        if (post.length === 0) {
          setHasMore(false);
          return;
        }
        setPosts(post);
      };
      getData();
    }
  }, [id, currentUser, post]);

  const handleFetchData = async () => {
    if (isOwnProfile && !isLoading) {
      if (post.hasMore) {
        dispatch(
          getMyPost({
            page: post.page,
            limit: post.limit,
            id,
            access_token
          })
        );
      }
    }
    if (!isOwnProfile && !isLoading && hasMore) {
      const res = await apiService.getPost({
        page: page + 1,
        limit: 5,
        id,
        access_token
      });
      setPosts((prevPosts) => [...prevPosts, ...res]);
      setPage(page + 1);
      if (res.length === 0) setHasMore(false);
    }
  };

  useEffect(() => {
    isOwnProfile && setHasMore(post.hasMore);
  }, [post.hasMore]);
  
  return (
    <Profile
      user={user}
      post={posts}
      isOwnProfile={isOwnProfile}
      token={access_token}
      handleFetchData={handleFetchData}
      hasMore={hasMore}
      isLoading={loading}
    />
  );
};

export default ProfileCurrentUser;

// // Profile.js
// import React, { useEffect, useState } from 'react';
// import {
//   Avatar,
//   Button,
//   Card,
//   Col,
//   DatePicker,
//   Flex,
//   Form,
//   Input,
//   message,
//   Modal,
//   Row,
//   Space,
//   Typography,
//   Upload,
// } from 'antd';
// import { CameraOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
// import Back from '../../components/Back';
// import CreatePost from '../../components/CreatePost';
// import LazyLoad from '../../components/LazyLoad';
// import Post from '../../components/Post';
// import apiService from '../../core/service/api';
// import { getMyPost } from '../../core/slices/postSlice';
// import { setState } from '../../core/slices/userSlice';
// import _ from 'lodash';
// import './style.scss';

// const Profile = ({ user, isOwnProfile }) => {
//   const dispatch = useDispatch();
//   const { page, limit, hasMore, data } = useSelector((state) => state.post.user);
//   const { isLoading } = useSelector((state) => state.post);
//   const { access_token } = useSelector((state) => state.auth.token);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [fileList, setFileList] = useState(null);
//   const [previewImage, setPreviewImage] = useState('');

//   useEffect(() => {
//     if (isOwnProfile) {
//       dispatch(getMyPost({ page, limit, id: user?._id }));
//     }
//   }, [isOwnProfile, user?._id]);

//   const handleFetchData = () => {
//     if (!isLoading && hasMore) {
//       dispatch(getMyPost({ page, limit, id: user?._id }));
//     }
//   };

//   const handleBeforeUpload = (file) => {
//     const objectURL = URL.createObjectURL(file);
//     setPreviewImage(objectURL);
//     setFileList(file);
//     return false;
//   };

//   const handleUpload = async () => {
//     if (!fileList) {
//       message.error('No file to upload');
//       return;
//     }
//     const fileUpload = new FormData();
//     fileUpload.append('image', fileList);
//     try {
//       const res = await apiService.uploadImg(fileUpload);
//       const imageUrl = res.result[0].url;
//       const updatedUser = _.cloneDeep(user);
//       updatedUser.cover_photo = imageUrl;
//       const updatedUserInfo = await apiService.updateUser(updatedUser, access_token);
//       dispatch(setState({ infoCurrentUser: updatedUserInfo }));
//       URL.revokeObjectURL(previewImage);
//       setPreviewImage('');
//       setFileList(null);
//       message.success('Upload successful!');
//     } catch (error) {
//       message.error('Upload failed. Please try again.');
//     }
//   };

//   const handleCancel = () => {
//     setPreviewImage('');
//     setFileList(null);
//     URL.revokeObjectURL(previewImage);
//   };

//   return (
//     <>
//       <Back />
//       <div className="profile">
//         <div className="h-15rem relative">
//           <img
//             className="w-full h-full"
//             src={previewImage || user?.cover_photo}
//             alt="Cover"
//           />
//           {isOwnProfile && (
//             <div className="absolute" style={{ right: '20px', bottom: '10px' }}>
//               {previewImage ? (
//                 <Space>
//                   <Button onClick={handleCancel}>Huỷ</Button>
//                   <Button
//                     onClick={handleUpload}
//                     icon={<UploadOutlined />}
//                     type="primary"
//                   >
//                     Đồng ý
//                   </Button>
//                 </Space>
//               ) : (
//                 <Upload
//                   customRequest={() => {}}
//                   beforeUpload={handleBeforeUpload}
//                   showUploadList={false}
//                 >
//                   <Button icon={<CameraOutlined />}>Upload</Button>
//                 </Upload>
//               )}
//             </div>
//           )}
//           <div className="avatar">
//             <Avatar style={{ width: '150px', height: '150px' }} src={user?.avatar} />
//           </div>
//         </div>
//         <Flex justify="space-between" className="mt-5">
//           <Typography.Title>{user?.name}</Typography.Title>
//           {isOwnProfile && (
//             <Button
//               onClick={() => setIsModalOpen(!isModalOpen)}
//               icon={<SettingOutlined />}
//               type="primary"
//             >
//               Chỉnh sửa thông tin
//             </Button>
//           )}
//         </Flex>
//         {isOwnProfile && (
//           <Modal
//             style={{ top: 20 }}
//             title="Chỉnh sửa thông tin"
//             open={isModalOpen}
//             footer={null}
//           >
//             <Form layout="vertical" style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
//               <Form.Item>
//                 <Space size="middle">
//                   <Avatar size="large" src={user?.avatar} />
//                   <Upload>
//                     <Button>Tải ảnh lên</Button>
//                   </Upload>
//                 </Space>
//               </Form.Item>
//               <Form.Item label="Tên">
//                 <Input defaultValue={user?.name} />
//               </Form.Item>
//               <Form.Item label="Bio">
//                 <Input.TextArea autoSize={{ minRows: 2 }} defaultValue={user?.bio} />
//               </Form.Item>
//               <Form.Item label="Website">
//                 <Input defaultValue={user?.website} />
//               </Form.Item>
//               <Form.Item label="Địa chỉ">
//                 <Input defaultValue={user?.address} />
//               </Form.Item>
//               <Form.Item label="Ngày sinh">
//                 <DatePicker defaultValue={moment(user?.date_of_birth)} />
//               </Form.Item>
//             </Form>
//           </Modal>
//         )}
//         <Row gutter={16}>
//           <Col span={8}>
//             <div className="sticky top-0">
//               <Card size="small">
//                 <Typography.Title level={5}>Thông tin</Typography.Title>
//                 <ul>
//                   {user?.bio && <li>{user.bio}</li>}
//                   {user?.email && (
//                     <li>
//                       <i className="fa-regular fa-envelope"></i>
//                       <span>{user.email}</span>
//                     </li>
//                   )}
//                   {user?.website && (
//                     <li>
//                       <i className="fa-solid fa-link"></i>
//                       <span>{user.website}</span>
//                     </li>
//                   )}
//                   {user?.date_of_birth && (
//                     <li>
//                       <i className="fa-regular fa-calendar-days"></i>
//                       <span>{moment(user.date_of_birth).format('DD/MM/YYYY')}</span>
//                     </li>
//                   )}
//                   <li>
//                     <i className="fa-solid fa-location-dot"></i>
//                     <span>{user?.location || 'Unknown'}</span>
//                   </li>
//                 </ul>
//               </Card>
//             </div>
//           </Col>
//           <Col span={16}>
//             {isOwnProfile && <CreatePost />}
//             <LazyLoad dataLength={data.length} fetchData={handleFetchData} hasMore={hasMore}>
//               {data.length > 0 && data.map((post) => (
//                 <Post key={post._id} post={post} user={user} />
//               ))}
//             </LazyLoad>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };

// export default Profile;
