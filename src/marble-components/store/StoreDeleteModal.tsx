import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const StoreDeleteModal = ({ isOpen, toggle, handleDelete, selectedProduct }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>
      <ModalBody>
        Are you sure to delete {selectedProduct?.name}?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default StoreDeleteModal;