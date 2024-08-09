import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Space, Typography } from 'antd'
import React from 'react'
const data = Array.from({
    length: 2,
  }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    content:
      'We supply a series of design principles, practical pat',
  }));
const Ads = () => {
  return (
    <div>
      {/* <Card size='small'> */}
      <Typography.Title level={5} type='secondary'>Được tài chợ</Typography.Title>

      <List
    itemLayout="vertical"
    size="small"

    dataSource={data}

    renderItem={(item) => (
      <List.Item
        key={item.title}
        extra={
          <img
          style={{width:"100px"}}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        {item.content}
      </List.Item>
    )}
  />
      {/* </Card> */}
    </div>
  )
}

export default Ads