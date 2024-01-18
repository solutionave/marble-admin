import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "Components/Common/withRouter";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";

//Import Star Ratings
import StarRatings from "react-star-ratings";

//Import Breadcrumb
import Breadcrumbs from "Components/Common/Breadcrumb";

//Import actions
import { getProductDetail as onGetProductDetail } from "slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

function AllProductsDetail({viewdata}) {
    console.log(viewdata.description)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      style={{
        position: "absolute",
        top: "15px",
        right: "15px",
      }}
      onClick={toggle}
    >
      &times;
    </button>
  );
  return (
    <div>
      <Button
        className="px-2"
        style={{ backgroundColor: "blue", padding: "0px" }}
        onClick={toggle}
      >
        View Details
      </Button>
      <Modal isOpen={modal} toggle={toggle}  external={externalCloseBtn}>
        <ModalHeader>Product Detail</ModalHeader>
              {/* <Breadcrumbs title="Ecommerce" breadcrumbItem="Product Detail" /> */}
        <ModalBody>
          <div  className="page-content">
            <Container fluid>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <Row className="d-flex justify-content-center">
                        <Col xl={10}>
                          <div className="product-detai-imgs">
                           
                              <img src={viewdata.image} alt="alt" />
                          </div>
                        </Col>

                        <Col xl="6">
                          <div className="mt-4 mt-xl-3">
                            {/* <Link to="#" className="text-primary">
                              ,,,
                            </Link> */}
                            <h4 className="mt-1 mb-3">{viewdata.name}</h4>

                            {/* <div className="text-muted float-start me-3">
                              <StarRatings
                                rating={4}
                                starRatedColor="#F1B44C"
                                starEmptyColor="#74788d"
                                numberOfStars={5}
                                name="rating"
                                starDimension="14px"
                                starSpacing="3px"
                              />
                            </div> */}
                            {/* <p className="text-muted mb-4">
                            ( {productDetail.reviews} Customers Review )
                          </p>

                          {!!productDetail.isOffer && (
                            <h6 className="text-success text-uppercase">
                              {productDetail.offer} % Off
                            </h6>
                          )}
                          <h5 className="mb-4">
                            Price :{" "}
                            <span className="text-muted me-2">
                              <del>${productDetail.oldPrice} USD</del>
                            </span>{" "}
                            <b>${productDetail.newPrice} USD</b>
                          </h5> */}
                            <p className="text-muted mb-4">
                             {viewdata.description}
                            </p>
                           

                            <div className="product-color">
                              <h5 className="font-size-15">{viewdata.price}</h5>
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
    </div>
  );
}

export default AllProductsDetail;
