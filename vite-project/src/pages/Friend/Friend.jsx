import React, { useEffect, useState } from "react";
import Back from "../../components/Back";
import { Button, Card, Col, Row, Typography } from "antd";
import apiService from "../../core/service/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Friend = () => {
  const [users, setUsers] = useState([]);
  const page = 1;
  const token = useSelector((state) => state.auth.token?.access_token);
  console.log(token);
  const getUsers = async () => {
    const res = await await apiService.getUserNotFollow(token, page, 5);
    setUsers(res);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Back />
      <Row gutter={16}>
        {users.length > 0 &&
          users.map((user) => (
            <Col
              key={user._id}
              xs={{ flex: "50%" }}
              md={{ flex: "40%" }}
              lg={{ flex: "25%" }}
              xl={{ flex: "18%" }}
            >
              <Card
                cover={<Link to={`/friend/profile/${user?._id}`}><img  style={{ height: "200px" }} src={user?.avatar} /></Link>}

              >
                <Card.Meta
                  title={user?.name}
                  description={
                    <Button style={{ width: "100%" }} type="primary">
                      Theo dõi
                    </Button>
                  }
                />
              </Card>
          
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Friend;
