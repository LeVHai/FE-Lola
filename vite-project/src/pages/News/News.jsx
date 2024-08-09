import React, { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import { Card, Col, Flex, Row } from "antd";
import LazyLoad from "../../components/LazyLoad";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityPost } from "../../core/slices/postSlice";
import Ads from "../../components/Ads";
import FriendSuggest from "../../components/FriendSuggest";

const News = () => {
  const {
    page,
    limit,
    data = [],
    hasMore,
  } = useSelector((state) => state.post.community);
  const { isLoading } = useSelector((state) => state.post);
  const infoCurrentUser = useSelector(
    (state) => state.current_user?.infoCurrentUser
  );
  const access_token = useSelector((state) => state.auth.token?.access_token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommunityPost({ page, limit, access_token }));
  }, []);
  const handleFetchData = () => {
    if (!isLoading && hasMore) {
      dispatch(getCommunityPost({ page, limit, access_token }));
    }
  };
  return (
    <Row gutter={150}>
      <Col span={14}>
        <div className="mb-3">
          <CreatePost user={infoCurrentUser} token={access_token} />
        </div>

        <LazyLoad
          dataLength={data.length}
          fetchData={handleFetchData}
          hasMore={hasMore}
        >
          <Flex vertical gap={5}>
            {data.length > 0 &&
              data.map((i) => ( 
                <Post
                  key={i._id}
                  post={i}
                  user={infoCurrentUser}
                  token={access_token}
                />
              ))}
          </Flex>
        </LazyLoad>
      </Col>
      <Col span={10}>
        <div className="sticky" style={{top: 10}}>
         <div className="relative">
         <div className="absolute top-0  overflow-y-auto  right-0" style={{height:"100vh"}}>
          <Ads />
          <FriendSuggest/>
          </div>
         </div>
        </div>
      </Col>
    </Row>
  );
};

export default News;
