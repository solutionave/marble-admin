import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const DeleteProductModal = ({ isOpen, toggleDeleteModal, handleDelete, deleteProduct }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Confirmation</ModalHeader>
        <ModalBody>
          Are you sure to delete {deleteProduct && deleteProduct.name}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
  
  export default DeleteProductModal;
  