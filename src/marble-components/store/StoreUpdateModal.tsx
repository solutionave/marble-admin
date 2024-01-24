import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";

const StoreUpdateModal = ({ isOpen, toggle, handleUpdate, formData, setFormData }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Product</ModalHeader>
      <ModalBody>
      <Form>
            <FormGroup>
              <Label for="productName"> Name</Label>
              <Input
                type="text"
                name="name"
                id="productName"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label for="productDescription"> Email</Label>
              <Input
                type="text"
                name="description"
                id="productDescription"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="productPrice">Telephone</Label>
              <Input
                type="number"
                name="price"
                id="productPrice"
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="productImage">Whatsapp</Label>
              <Input
                type="number"
                name="image"
                id="productImage"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
              />
            </FormGroup>

            <Label for="productImage">Adress</Label>

            <FormGroup>
              <Input
                type="text"
                name="location"
                id="productLocation"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </FormGroup>
          </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Update Product
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StoreUpdateModal;
