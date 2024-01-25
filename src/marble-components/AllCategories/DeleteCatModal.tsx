import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const DeleteCategoryModal = ({
  categories,
  setSelectedSubcategories,
  isDeleteModalOpen,
  toggleDeleteModal,
  handleDelete,
  deleteCategory,
}) => {
  return (
    <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
      <ModalHeader toggle={toggleDeleteModal}>Delete Confirmation</ModalHeader>
      <ModalBody>
        Are you sure to delete {deleteCategory && deleteCategory.name}?
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={() =>
            handleDelete(
              deleteCategory,
              categories,
              setSelectedSubcategories,
              toggleDeleteModal
            )
          }
        >
          Delete
        </Button>{" "}
        <Button color="secondary" onClick={toggleDeleteModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteCategoryModal;
