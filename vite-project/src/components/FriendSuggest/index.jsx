import { Avatar, Button, Card, List, Typography } from 'antd';
import React from 'react'
const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
const FriendSuggest = () => {
  return (
<List
header={<Typography.Title level={5} type='secondary'> Những người bạn có thể biết</Typography.Title>}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item >
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="">{item.title}</a>}
          description={<Button>Theo dõi</Button>}
        />
      </List.Item>
    )}
    />
  )
}

export default FriendSuggest