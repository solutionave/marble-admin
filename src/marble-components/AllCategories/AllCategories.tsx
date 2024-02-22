import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import makeAnimated from "react-select/animated";
import DeleteCategoryModal from "./DeleteCatModal";
import AddCatModal from "./AddCatModal";
import UpdateCatModal from "./UpdateCatModal";
import AllCategoriesDetail from "./AllCategoriesDetail";
const animatedComponents = makeAnimated();
interface Category {
  id: number;
  name: string;
  parentId?: number | null;
  subcategories: {
    value: string;
}[];
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
  const categories = [
    {
      id: 1,
      name: "marble",
      subcategories: [
        {
          id: 1,
          name: "sub marble 1",
        },
        {
          id: 2,
          name: "sub marble 2",
        },
        {
          id: 3,
          name: "sub marble 3",
        },
      ],
    },
    {
      id: 2,
      name: "Stone",
      subcategories: [
        {
          id: 1,
          name: "sub stone 1",
        },
        {
          id: 2,
          name: "sub stone 2",
        },
        {
          id: 3,
          name: "sub stone 3",
        },
      ],
    },
    {
      id: 3,
      name: "Granite",
      subcategories: [
        {
          id: 1,
          name: "sub granite 1",
        },
        {
          id: 2,
          name: "sub granite 2",
        },
        {
          id: 3,
          name: "sub granite 3",
        },
      ],
    },
  ];
  const categories2 = [
    {
      id: 1,
      name: "marble",
      subcategories: [
        {
          value: "sub marble 1",
        },
        {
          value: "sub marble 2",
        },
        {
          value: "sub marble 3",
        },
      ],
    },
    {
      id: 2,
      name: "Stone",
      subcategories: [
        {
          value: "sub Stone 1",
        },
        {
          value: "sub Stone 2",
        },
        {
          value: "sub Stone 3",
        },
      ],
    },
    {
      id: 3,
      name: "Granite",
      subcategories: [
        {
          value: "sub granite 1",
        },
        {
          value: "sub granite 2",
        },
        {
          value: "sub granite 3",
        },
      ],
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    { id: number; name: string }[]
  >([]);

  document.title = "Manage Categories";
  const [viewdata, setviewdata] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newCategories, setnewCategories] = useState<Category[]>(categories2);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedParentCategory, setSelectedParentCategory] = useState<
    number | null
  >(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

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

  const handleAllData = (data) => {
    setviewdata(data);
  };

  const handleAddCategory = (
    selectedCategory: string,
    parentId: number | null,
    categories: Category[],
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    selectedSubcategories: { value: string }[],
    toggleAddModal: () => void
  ) => {
    if (selectedCategory) {
      const newCategoryId = newCategories.length + 1;
      const newCategoryObject: Category = {
        id: newCategoryId,
        name: selectedCategory,
        parentId,
        subcategories:selectedSubcategories,
      };

      console.log("Adding Categories:", newCategoryObject);
      const category=[...newCategories, newCategoryObject];
      setCategories([...newCategories, newCategoryObject]);
      console.log("Categories:", newCategories);
      setnewCategories(category);
      // localStorage.removeItem('categories');
      // localStorage.setItem("categories", JSON.stringify(newCategories));
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
  // const storedUser: any = localStorage.getItem("categories");
  //   const storedArray = JSON.parse(storedUser);
  useEffect(() => {
    // This will log the updated categories after each re-render
    
    
    // if (storedArray) {
    // setnewCategories(storedArray);
    // }
    // localStorage.setItem("categories", JSON.stringify(newCategories));
    console.log("Categories use effect", newCategories);
    // console.log("Stored Categories use effect", storedUser);
  }, [newCategories]); 
  ////////////////////////////////

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
                        {newCategories.map((category) => (
                          <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td className="text-center d-flex justify-content-center">
                              {/* <i
                                style={{ fontSize: "20px" }}
                                className="dripicons-preview"
                              ></i> */}
                               <i
                                onClick={() => handleAllData(category)}
                                style={{ fontSize: "20px", cursor: "pointer" }}
                              >
                                <AllCategoriesDetail viewdata={viewdata} />
                              </i>
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

      {/* add modal  */}
      <AddCatModal
        isAddModalOpen={isAddModalOpen}
        toggleAddModal={toggleAddModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories2}
        setSelectedSubcategories={setSelectedSubcategories}
        animatedComponents={animatedComponents}
        selectedSubcategories={selectedSubcategories}
        handleAddCategory={handleAddCategory}
        newCategory={newCategory}
        selectedParentCategory={selectedParentCategory}
      />

      {/* edit modal  */}

      <UpdateCatModal
        isEditModalOpen={isEditModalOpen}
        toggleEditModal={toggleEditModal}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        setSelectedSubcategories={setSelectedSubcategories}
        animatedComponents={animatedComponents}
        selectedSubcategories={selectedSubcategories}
        editedCategory={editedCategory}
        handleEditCategory={handleEditCategory}
      />

      {/* delet modales  */}
      <DeleteCategoryModal
        categories={categories}
        setSelectedSubcategories={setSelectedSubcategories}
        isDeleteModalOpen={isDeleteModalOpen}
        toggleDeleteModal={toggleDeleteModal}
        handleDelete={handleDelete}
        deleteCategory={deleteCategory}
      />
    </React.Fragment>
  );
};

export default AllCategories;
