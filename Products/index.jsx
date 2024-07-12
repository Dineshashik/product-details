import React, { useState, useEffect } from 'react';
import { CgMoreVerticalAlt } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import './Products.css';
import AddProducts from '../ProductDetails';
import { getDeleteProduct, addProduct, fetchProducts } from "../../services/userService";

const ProductPage = ({ isSidebarOpen }) => {
  const [search, setSearch] = useState('');
  const [showActionId, setShowActionId] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [pagination, setPagination] = useState(1);
  const [user, setUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const productUser = localStorage.getItem('user');
    if (productUser) {
      setUser(JSON.parse(productUser));
    }
  }, []);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        let response;

        if (search) {
          response = await fetchProducts({ productName: search });
        } else {
          response = await fetchProducts({ page: pagination, limit: pageSize });
        }

        if (response && response.data) {
          setProducts(response.data);
          setTotalPages(response.totalPages);
        } else {
          console.error("No product data found in response");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsData();
  }, [pagination, pageSize, search]);

  const handleSearchInputChange = async (e, navigate, setError) => {
    const data = e.target.value;
    setSearch(data);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setAddProduct(true);

  };

  const handleDelete = async (productName) => {
    setDeletingProduct(productName);
    try {
      const confirmDelete = window.confirm(`Do you want to delete the product ${productName}?`);
      if (confirmDelete) {
        console.log(`Deleting product: ${productName}`);
        let response = await getDeleteProduct(productName);
        if (response?.message === 'Product deleted successfully') {
          navigate('/admin/products');
        } else {
          setError(response?.message || 'Delete product failed');
        }
      }
    }
    catch (error) {
      setError('An error occurred during the delete product');
    }
  };


  const handleUserIconClick = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setShowActionId(prev => (prev === productId ? null : productId));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowActionId(null);
  };

  const handleAddToProductClick = async (data) => {
    setEditingProduct(null);
    setAddProduct(prev => !prev);
    setAnchorEl(null);
    setShowActionId(null);
    try {
      let response = await addProduct(data);
      if (response?.message === 'Product added successfully') {
        navigate('/admin/products');
      } else {
        setError(response?.message || 'add products failed');
      }
    } catch (error) {
      setError('An error occurred during the add products');
    }
  };

  const handlePreviousClick = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };

  const handleNextClick = () => {
    if (pagination < totalPages) {
      setPagination(pagination + 1);
    }
  };

  return (
    <div className={isSidebarOpen ? "sidebarproduct-page" : "product-page"}>
      <div className="product-header">
        {!addProduct && (
          <div className="search">
            <div className='search-container'>
              <input
                type="text"
                placeholder="Search the Product Name"
                value={search}
                onChange={(e) => handleSearchInputChange(e)}
                className="search-input"
              />
            </div>
            <button className="add-to-product-button" onClick={handleAddToProductClick}>
              Add Product
            </button>
          </div>
        )}
        {addProduct && (
          <button className="back-to-products-button" onClick={handleAddToProductClick}>
            Back to Products
          </button>
        )}
      </div>
      {addProduct ? (
        <AddProducts product={editingProduct} isEdit={!!editingProduct} />
      ) : (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Brand</th>
                <th>Tax</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="product-row">
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.brand}</td>
                  <td>{product.tax}</td>
                  <td style={{ position: 'relative' }}>
                    <CgMoreVerticalAlt
                      className="user-icon"
                      onClick={(event) => handleUserIconClick(event, product.id)}
                    />
                    <Popper
                      open={showActionId === product.id}
                      anchorEl={anchorEl}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: 'center top' }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                id="composition-menu"
                                aria-labelledby="composition-button"
                              >
                                <MenuItem onClick={() => handleEdit(product)}>Edit</MenuItem>
                                <MenuItem onClick={() => handleDelete(product.name)}>Delete</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="product-pagination">
            <a
              className={`product-1 ${pagination === 1 ? 'disabled' : ''}`}
              onClick={handlePreviousClick}
            >
              &laquo;
            </a>
            {Array.from({ length: totalPages }, (_, index) => (
              <a
                key={index + 1}
                className={`product-${index + 1} ${pagination === index + 1 ? 'active' : ''}`}
                onClick={() => setPagination(index + 1)}
              >
                {index + 1}
              </a>
            ))}
            <a
              className={`product-1 ${pagination === totalPages ? 'disabled' : ''}`}
              onClick={handleNextClick}
            >
              &raquo;
            </a>
          </div>

        </>
      )}
    </div>
  );
};

export default ProductPage;


