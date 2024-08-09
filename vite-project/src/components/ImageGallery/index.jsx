import { Button, Card, Col, Image, Modal, Row, Typography } from "antd";
import React, { useState } from "react";

const ImageGallery = ({ image = [] }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Card size="small">
        <Typography.Title level={5}>Ảnh</Typography.Title>
        {image.length > 0 && (
          <>
            <Row>
              <Image.PreviewGroup>
                {image.slice(0, 9).map((img, index) => (
                  <Col span={8} key={img} style={{ padding: "1px" }}>
                    <Image src={img} />
                  </Col>
                ))}
              </Image.PreviewGroup>
            </Row>
            <Button
              type="link"
              onClick={() => setOpenModal(true)}
              style={{ width: "100%" }}
            >
              Show more
            </Button>
          </>
        )}
        {image.length === 0 && <div className="font-medium text-center">Chưa có ảnh nào</div>}
      </Card>
      <Modal
        style={{ top: 20 }}
        footer={null}
        width="80vw"
        height="80vh"
        open={openModal}
        onCancel={() => setOpenModal(false)}
      >
        <div
          className="w-full"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <Row>
            <Image.PreviewGroup>
              {image.map((img, index) => (
                <Col span={4} key={img} style={{ padding: "1px" }}>
                  <Image src={img} />
                </Col>
              ))}
            </Image.PreviewGroup>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default ImageGallery;
