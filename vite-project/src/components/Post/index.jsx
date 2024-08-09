// import React, { useState } from "react";
// import {
//   Avatar,
//   Button,
//   Card,
//   Flex,
//   Image,
//   Input,
//   Menu,
//   Modal,
//   Popover,
//   Space,
//   Typography,
// } from "antd";
// import moment from "moment";
// import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
// import { cloneDeep } from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import { setState } from "../../core/slices/postSlice";
// import apiService from "../../core/service/api";
// import LayoutImage from "../LayoutImage";
// import "./style.scss";

// const Post = ({ post, user, token }) => {
//   const { user: users, community } = useSelector((state) => state.post);
//   const { name, avatar, content, image, create_at, like_count, like } = post;
// // 
//   const [bookmark, setBookmark] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [likes, setLikes] = useState(false);
//   const [countLikes, setCountLikes] = useState(0);
//   const dispatch = useDispatch();

//   const handleLike = async (post_id, token) => {
//     if (like && like_count) {
//       const newLiked = !like;

//       const _users = cloneDeep(users);
//       const _community = cloneDeep(community);

//       const index = _users.data.findIndex((post) => post._id === post_id);
//       const index2 = _community.data.findIndex((post) => post._id === post_id);

//       if (newLiked) {
//         await apiService.like(post_id, token);
//         if (index !== -1) {
//           _users.data[index].like_count += 1;
//           _users.data[index].like = true;
//         }
//         if (index2 !== -1) {
//           _community.data[index2].like_count += 1;
//           _community.data[index2].like = true;
//         }
//       } else {
//         await apiService.unLike(post_id, token);
//         if (index !== -1) {
//           _users.data[index].like_count -= 1;
//           _users.data[index].like = false;
//         }
//         if (index2 !== -1) {
//           _community.data[index2].like_count -= 1;
//           _community.data[index2].like = false;
//         }
//       }

//       dispatch(setState({ user: _users, community: _community }));
//     } else {
//       const newLiked = !likes;
//       setLikes(newLiked);
//       countLikes((prev) => {newLiked ? prev - 1 : prev + 1});
//       if(newLiked){
//         await apiService.like(post_id, token);
//       }else{
//         await apiService.unLike(post_id, token);
//       }
//     }
//   };

//   const handleBookmark = () => {
//     setBookmark((prevBookmark) => !prevBookmark);
//   };

//   const displayImages = Array.isArray(image) ? image.slice(0, 4) : [];
//   let containerClass = "image-container";
//   if (displayImages.length === 1) {
//     containerClass += " single-image";
//   } else if (displayImages.length === 2) {
//     containerClass += " double-image";
//   } else if (displayImages.length === 3) {
//     containerClass += " triple-image";
//   } else if (displayImages.length === 4) {
//     containerClass += " quadruple-image";
//   }

//   return (
//     <Card className="border-round-xl post-item">
//       <Flex justify="space-between">
//         <Flex align="center" gap="small">
//           <Avatar size="large" src={avatar || user?.avatar} />
//           <div>
//             <Typography.Title level={5} style={{ margin: 0 }}>
//               {name || user?.name}
//             </Typography.Title>
//             <Space>
//               <span className="text-xs" style={{ color: "#998a8a" }}>
//                 {moment(create_at).format("DD/MM/YYYY")}
//               </span>
//               <span className="text-xs" style={{ color: "#998a8a" }}>
//                 {moment(create_at).format("HH:mm")}
//               </span>
//             </Space>
//           </div>
//         </Flex>

//         <Popover
//           trigger="click"
//           showArrow
//           placement="bottomRight"
//           content={
//             <Menu
//               style={{ borderRadius: "10px" }}
//               items={[
//                 {
//                   key: 1,
//                   label: "Edit",
//                   icon: <EditOutlined />,
//                 },
//                 {
//                   key: 2,
//                   label: "Delete",
//                   icon: <EditOutlined />,
//                 },
//               ]}
//             />
//           }
//         >
//           <Button
//             icon={
//               <EllipsisOutlined
//                 style={{ fontSize: "25px", fontWeight: "bold" }}
//               />
//             }
//             onClick={() => setOpenModal(true)}
//             type="link"
//           />
//         </Popover>
//       </Flex>
//       <p className="p-2">{content}</p>
//       <LayoutImage image={image} height={30} />
//       <Flex justify="space-between" className="mt-3">
//         <Space size="middle">
//           <div onClick={() => handleLike(post._id, token)}>
//             {like || likes ? (
//               <i className="fa-solid fa-heart like"></i>
//             ) : (
//               <i className="fa-regular fa-heart icon"></i>
//             )}
//           </div>
//           <div>
//             <i className="fa-regular fa-comment icon"></i>
//           </div>
//           <div>
//             <i className="fa-regular fa-share-from-square icon"></i>
//           </div>
//         </Space>
//         <div onClick={handleBookmark}>
//           {bookmark ? (
//             <i className="fa-solid fa-bookmark bookmark"></i>
//           ) : (
//             <i className="fa-regular fa-bookmark icon"></i>
//           )}
//         </div>
//       </Flex>
//       {like_count > 0 ||
//         (countLikes > 0 && (
//           <span className="font-medium text-xs">
//             {like_count || countLikes} người thích
//           </span>
//         ))}
//       <Flex className="mt-2" gap="small">
//         <Avatar src={user?.avatar} />
//         <Input style={{ borderRadius: "20px" }} />
//       </Flex>
//     </Card>
//   );
// };

// export default Post;
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Image,
  Input,
  Menu,
  Modal,
  Popover,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../core/slices/postSlice";
import apiService from "../../core/service/api";
import LayoutImage from "../LayoutImage";
import "./style.scss";
import { useLocation } from "react-router-dom";

const Post = ({ post, user, token }) => {
  const { user: users, community } = useSelector((state) => state.post);
  const { name, avatar, content, image, create_at, like_count, like } = post;
  const [bookmark, setBookmark] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [likes, setLikes] = useState(false);
  const [countLikes, setCountLikes] = useState(like_count); // Use initial like count
  const path = useLocation()
  
  useLayoutEffect(()=>{
    setLikes(post.like)
    },[post])
  const dispatch = useDispatch();

  const handleLike = async (post_id, token) => {
    try {
      const newLiked = !likes;

      if (location.pathname === '/profile') {
        const _users = cloneDeep(users);
        const _community = cloneDeep(community);
        const index = _users.data.findIndex((post) => post._id === post_id);
        const index2 = _community.data.findIndex((post) => post._id === post_id);
        if (newLiked) {
          await apiService.like(post_id, token);

          if (index !== -1) {
            _users.data[index].like_count += 1;
            _users.data[index].like = true;
          }
          if (index2 !== -1) {
            _community.data[index2].like_count += 1;
            _community.data[index2].like = true;
          }
        } else {
          await apiService.unLike(post_id, token);
          if (index !== -1) {
            _users.data[index].like_count -= 1;
            _users.data[index].like = false;
          }
          if (index2 !== -1) {
            _community.data[index2].like_count -= 1;
            _community.data[index2].like = false;
          }
        }

        dispatch(setState({ user: _users, community: _community }));
      } else {
        if (newLiked) {
          await apiService.like(post_id, token);
        } else {
          await apiService.unLike(post_id, token);
        }
        setCountLikes(newLiked ? countLikes + 1 : countLikes - 1);
      }
      setLikes(newLiked);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleBookmark = () => {
    setBookmark((prevBookmark) => !prevBookmark);
  };

  const displayImages = Array.isArray(image) ? image.slice(0, 4) : [];
  let containerClass = "image-container";
  if (displayImages.length === 1) {
    containerClass += " single-image";
  } else if (displayImages.length === 2) {
    containerClass += " double-image";
  } else if (displayImages.length === 3) {
    containerClass += " triple-image";
  } else if (displayImages.length === 4) {
    containerClass += " quadruple-image";
  }

  return (
    <Card className="border-round-xl post-item">
      <Flex justify="space-between">
        <Flex align="center" gap="small">
          <Avatar size="large" src={avatar || user?.avatar} />
          <div>
            <Typography.Title level={5} style={{ margin: 0 }}>
              {name || user?.name}
            </Typography.Title>
            <Space>
              <span className="text-xs" style={{ color: "#998a8a" }}>
                {moment(create_at).format("DD/MM/YYYY")}
              </span>
              <span className="text-xs" style={{ color: "#998a8a" }}>
                {moment(create_at).format("HH:mm")}
              </span>
            </Space>
          </div>
        </Flex>

        <Popover
          trigger="click"
          showArrow
          placement="bottomRight"
          content={
            <Menu
              style={{ borderRadius: "10px" }}
              items={[
                {
                  key: 1,
                  label: "Edit",
                  icon: <EditOutlined />,
                },
                {
                  key: 2,
                  label: "Delete",
                  icon: <EditOutlined />,
                },
              ]}
            />
          }
        >
          <Button
            icon={
              <EllipsisOutlined
                style={{ fontSize: "25px", fontWeight: "bold" }}
              />
            }
            onClick={() => setOpenModal(true)}
            type="link"
          />
        </Popover>
      </Flex>
      <p className="p-2">{content}</p>
      <LayoutImage image={image} height={30} />
      <Flex justify="space-between" className="mt-3">
        <Space size="middle">
          <div onClick={() => handleLike(post._id, token)}>
            {likes ? (
              <i className="fa-solid fa-heart like"></i>
            ) : (
              <i className="fa-regular fa-heart icon"></i>
            )}
          </div>
          <div>
            <i className="fa-regular fa-comment icon"></i>
          </div>
          <div>
            <i className="fa-regular fa-share-from-square icon"></i>
          </div>
        </Space>
        <div onClick={handleBookmark}>
          {bookmark ? (
            <i className="fa-solid fa-bookmark bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark icon"></i>
          )}
        </div>
      </Flex>
      {(countLikes > 0) && (
        <span className="font-medium text-xs">
          {countLikes} người thích
        </span>
      )}
      <Flex className="mt-2" gap="small">
        <Avatar src={user?.avatar} />
        <Input style={{ borderRadius: "20px" }} />
      </Flex>
    </Card>
  );
};

export default Post;
