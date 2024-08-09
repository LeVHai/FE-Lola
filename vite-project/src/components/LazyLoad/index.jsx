import { Card, Flex, Skeleton } from "antd";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Loading = () =>{
  return (
   <Flex vertical gap={10}>
     <Card className="border-round-xl post-item">
      <Flex align="center" gap="small">
        <div>
        <Skeleton.Avatar size="large" active />
        </div>
        <Skeleton.Input size="small" active />
      </Flex>

      <div className="p-2">
        <Skeleton style={{width:"100%"}} active />
      </div>
    </Card>
    <Card className="border-round-xl post-item">
      <Flex align="center" gap="small">
        <div>
        <Skeleton.Avatar size="large" active />
        </div>
        <Skeleton.Input size="small" active />
      </Flex>

      <div className="p-2">
        <Skeleton style={{width:"100%"}} active />
      </div>
    </Card>
   </Flex>
    )
}

const LazyLoad = (props) => {
  const { dataLength, fetchData, hasMore, children } = props;
  return (
    <InfiniteScroll
      dataLength={dataLength || 0} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      // loader={<Loading/>}
      loader={<div>Load</div>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
     {children}
    </InfiniteScroll>
  );
};

export default LazyLoad;
