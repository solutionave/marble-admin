import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row, Col, Card, CardBody } from "reactstrap";

const StoreViewModak = ({ isOpen, toggle, selectedProduct }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Product Detail</ModalHeader>
      <ModalBody>
          <div
            className="page-content"
            style={{ paddingTop: "2px", paddingBottom: "5px" }}
          >
            <Container fluid>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <Row className="d-flex justify-content-center">
                        {/* <Col xl={"10"}>
                          <div className="product-detai-imgs">
                            <img src="" alt="alt" />
                          </div>
                        </Col> */}

                        <Col xl="10">
                          <div className="mt-4 mt-xl-3">
                            {/* <Link to="#" className="text-primary">
                              ,,,
                            </Link> */}
                            <h4 className="mt-1 mb-3">
                              {" "}
                              <span style={{ fontSize: "25px" }}>
                                Name :
                              </span>{" "}
                              {selectedProduct?.name}
                            </h4>

                            <div className="product-color mt-5">
                              <h5 className="font-size-15">
                                {" "}
                                <span style={{ fontSize: "25px" }}>
                                  Email:
                                </span>{" "}
                                {selectedProduct?.email}
                              </h5>
                            </div>
                            <div className="product-color mt-5">
                              <h5 className="font-size-15">
                                {" "}
                                <span style={{ fontSize: "25px" }}>
                                  Whatsapp :
                                </span>{" "}
                                {selectedProduct?.whatsapp}
                              </h5>
                            </div>

                            <div className="product-color mt-5">
                              <h5 className="font-size-15">
                                {" "}
                                <span style={{ fontSize: "25px" }}>
                                  Telephone :
                                </span>{" "}
                                {selectedProduct?.telephone}
                              </h5>
                            </div>
                            <div className="product-color mt-5">
                              <h5 className="font-size-15">
                                {" "}
                                <span style={{ fontSize: "25px" }}>
                                  Address :
                                </span>{" "}
                                {selectedProduct?.address}
                              </h5>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StoreViewModak;
