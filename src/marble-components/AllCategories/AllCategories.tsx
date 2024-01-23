import React, { useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import Select from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
interface Category {
  id: number;
  name: string;
  parentId?: number | null;
}

interface InputProps {
  type: string;
  value?: string | number | readonly string[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const handleDelete = (
  deleteCategory: Category | null,
  categories: Category[],
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  toggleDeleteModal: () => void
) => {
  if (deleteCategory) {
    const updatedCategories = categories.filter(
      (category) => category.id !== deleteCategory.id
    );

    setCategories(updatedCategories);
    toggleDeleteModal();
  }
};

const AllCategories: React.FC = () => {
  document.title = "Basic Tables | Skote - React Admin & Dashboard Template";

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "marble" },
    { id: 2, name: "Stone" },
    { id: 3, name: "Granite" },
    // Add more categories as needed
  ]);
  const [currentCategory, setCurrentCategory] = useState("marble");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedParentCategory, setSelectedParentCategory] = useState<
    number | null
  >(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
    setNewCategory("");
    setSelectedParentCategory(null);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  const handleAddCategory = (
    newCategory: string,
    parentId: number | null,
    categories: Category[],
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    toggleAddModal: () => void
  ) => {
    if (newCategory && parentId !== null) {
      const newCategoryId = categories.length + 1;
      const newCategoryObject: Category = {
        id: newCategoryId,
        name: newCategory,
        parentId,
      };

      console.log("Adding category:", newCategoryObject);

      setCategories([...categories, newCategoryObject]);
      toggleAddModal();
    }
  };

  const handleEditCategory = (
    editedCategory: Category | null,
    editedName: string,
    editedParentId: number | null,
    categories: Category[],
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    toggleEditModal: () => void
  ) => {
    if (editedCategory && editedName && editedParentId !== null) {
      const updatedCategories = categories.map((category) =>
        category.id === editedCategory.id
          ? { ...category, name: editedName, parentId: editedParentId }
          : category
      );

      setCategories(updatedCategories);
      toggleEditModal();
    }
  };

  ////////////////////////////////

  const [inputValue, setInputValue] = useState("");

  const handleCreateOption = (inputValue: string) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    return newOption;
  };

  const loadOptions = (inputValue: string, callback: any) => {
    // You can fetch or process options dynamically here
    const filteredOptions = [{ value: inputValue, label: inputValue }];
    callback(filteredOptions);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="All Categories" />
          <div className="d-flex justify-content-end mb-3">
            <Button color="primary" onClick={toggleAddModal}>
              ADD NEW CATEGORY
            </Button>
          </div>
          <Row className="mt-4">
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Categories</th>
                          <th className="text-center d-flex justify-content-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td className="text-center d-flex justify-content-center">
                              <i
                                style={{ fontSize: "20px" }}
                                className="dripicons-preview"
                              ></i>
                              <i
                                style={{ fontSize: "20px", marginLeft: "10px" }}
                                className="bx bx-edit-alt"
                                onClick={() => {
                                  setEditedCategory(category);
                                  toggleEditModal();
                                }}
                              ></i>
                              <i
                                style={{
                                  fontSize: "18px",
                                  color: "red",
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                className="dripicons-trash"
                                onClick={() => {
                                  setDeleteCategory(category);
                                  toggleDeleteModal();
                                }}
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <div
                  style={{ marginRight: "20px" }}
                  className="d-flex justify-content-end"
                >
                  <Pagination aria-label="Page navigation example" size="md">
                    <PaginationItem>
                      <PaginationLink first href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" previous />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" next />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" last />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>
          Delete Confirmation
        </ModalHeader>
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
                setCategories,
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

      <Modal isOpen={isAddModalOpen} toggle={toggleAddModal}>
        <ModalHeader toggle={toggleAddModal}>Add New Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="newCategory">Category Name</Label>
              <Input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </FormGroup>

            <AsyncCreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onCreateOption={handleCreateOption}
              loadOptions={(inputValue, callback) =>
                loadOptions(inputValue, callback)
              }
              onInputChange={(input: string) => setInputValue(input)}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              handleAddCategory(
                newCategory,
                selectedParentCategory,
                categories,
                setCategories,
                toggleAddModal
              )
            }
          >
            Add Category
          </Button>{" "}
          <Button color="secondary" onClick={toggleAddModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editCategory">Category Name</Label>
              <Input
                type="text"
                id="editCategory"
                value={editedCategory?.name || ""}
                onChange={(e) =>
                  setEditedCategory((prev) => ({
                    ...prev!,
                    name: e.target.value,
                  }))
                }
              />
            </FormGroup>
            <AsyncCreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onCreateOption={handleCreateOption}
              loadOptions={(inputValue, callback) =>
                loadOptions(inputValue, callback)
              }
              onInputChange={(input: string) => setInputValue(input)}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              handleEditCategory(
                editedCategory,
                editedCategory?.name || "",
                editedCategory?.parentId || null,
                categories,
                setCategories,
                toggleEditModal
              )
            }
          >
            Save Changes
          </Button>{" "}
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AllCategories;
