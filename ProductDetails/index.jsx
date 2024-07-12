import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addProduct, updateProduct } from "../../services/userService";
import './productdetails.css';

const AddProducts = ({ product, isEdit }) => {
    const [user, setUser] = useState('');
    const location = useLocation();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [tax, setTax] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [brandError, setBrandError] = useState('');
    const [taxError, setTaxError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [update,setUpdate]=useState(false)

    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loginUser = localStorage.getItem('user');
        if (loginUser) {
            setUser(JSON.parse(loginUser));
        }
    }, []);

    useEffect(() => {
        if (isEdit && product) {
            setName(product.name);
            setPrice(product.price);
            setQuantity(product.quantity);
            setBrand(product.brand);
            setTax(product.tax);
            setDescription(product.description);
        }

    }, [isEdit, product]);

    // useEffect(()=>{

    //     const handleUpdate=async(productName)=>{
    //         try{
    //             let response = await updateProduct(productName);
    //             if (response?.message === 'Product updated  successfully') {
    //               navigate('/admin');
    //             } else {
    //               setError(response?.message || 'update products failed');
    //             }
    //           } catch (error) {
    //             setError('An error occurred during the add products');
    //           }
    //     }
    //     handleUpdate();
    // },[])

    const handleProduct = async () => {
        setError('');
        setNameError('');
        setPriceError('');
        setQuantityError('');
        setBrandError('');
        setTaxError('');
        setDescriptionError('');

        if (!name) {
            setNameError("Enter the Product Name");
            return;
        }

        if (!quantity) {
            setQuantityError("Enter the Quantity of Product");
            return;
        }

        if (!price) {
            setPriceError("Enter the Price");
            return;
        }

        if (!brand) {
            setBrandError("Enter the Brand");
            return;
        }

        if (!tax) {
            setTaxError("Enter the Tax");
            return;
        }

        try {
            let response;
            if (isEdit) {
                response = await updateProduct({ name, quantity, price, brand, tax, description });
            } else {
                response = await addProduct({ name, quantity, price, brand, tax, description });
            }

            if (response?.message === 'data stored successful' || response?.message === 'Product updated successfully') {
                navigate('/admin/products');
                console.log(response.message);
                setName('');
                setPrice('');
                setQuantity('');
                setBrand('');
                setTax('');
                setDescription('');
                

            } else {
                setError(response?.message || 'product data failed');
                console.log(response.message)
            }
        } catch (error) {
            setError('An error occurred during the operation');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (nameError) {
            setNameError('');
        }
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
        if (quantityError) {
            setQuantityError('');
        }
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        if (priceError) {
            setPriceError('');
        }
    };

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
        if (brandError) {
            setBrandError('');
        }
    };

    const handleTaxChange = (e) => {
        setTax(e.target.value);
        if (taxError) {
            setTaxError('');
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        if (descriptionError) {
            setDescriptionError('');
        }
    };

    return (
        <div className="addproductbar">
            <div className="title">
            {isEdit ? "Update Product" : "Add Product"}
            </div><br/>
            <div className="product-container">
                <div className="product-form-container">
                    <div className="form1">
                        <div className="form-group">
                            <label>Product Name:
                                <div>
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="Enter the Product Name"
                                        onChange={handleNameChange}
                                        className="form-input"
                                    />
                                </div>
                            </label>
                            {nameError && <span className="error-message">{nameError}</span>}
                        </div>
                        <div className="form-group">
                            <label>Brand:
                                <div>
                                    <input
                                        type="text"
                                        value={brand}
                                        placeholder="Enter the Brand"
                                        onChange={handleBrandChange}
                                        className="form-input"
                                    />
                                </div>
                            </label>
                            {brandError && <span className="error-message">{brandError}</span>}
                        </div>
                    </div>
                    <div className="form1">
                        <div className="form-group">
                            <label>Price:
                                <div>
                                    <input
                                        type="text"
                                        value={price}
                                        placeholder="Enter the Price"
                                        onChange={handlePriceChange}
                                        className="form-input"
                                    />
                                </div>
                            </label>
                            {priceError && <span className="error-message">{priceError}</span>}
                        </div>
                        <div className="form-group">
                            <label>Quantity:
                                <div>
                                    <input
                                        type="text"
                                        value={quantity}
                                        placeholder="Enter the Quantity"
                                        onChange={handleQuantityChange}
                                        className="form-input"
                                    />
                                </div>
                            </label>
                            {quantityError && <span className="error-message">{quantityError}</span>}
                        </div>
                    </div>
                    <div className="form1">
                        <div className="form-group">
                            <label>Tax:
                                <div>
                                    <input
                                        type="text"
                                        value={tax}
                                        placeholder="Enter the Tax"
                                        onChange={handleTaxChange}
                                        className="form-input"
                                    />
                                </div>
                            </label>
                            {taxError && <span className="error-message">{taxError}</span>}
                        </div>
                        <div className="form-group"></div>
                    </div>
                    <br />
                    <div className="form1">
                        <div className="form-group">
                            <label>Description:
                                <div>
                                    <textarea
                                        value={description}
                                        placeholder="Enter the Description"
                                        onChange={handleDescriptionChange}
                                        className="form-input"
                                    />
                                </div>
                            </label>
                            {descriptionError && <span className="error-message">{descriptionError}</span>}
                        </div>
                        <div className="form-group"></div>
                    </div>
                    <br />
                    <div className="button-handle">
                        <div className="form-group2">
                            <input
                                type="button"
                                onClick={handleProduct}
                                value={isEdit ? "Update Product" : "Add Product"}
                                className="register-button"
                            />
                        </div>
                    </div>
                    {error && <span className="error-message global-error">{error}</span>}
                </div>
            </div>
        </div >
    );
};

export default AddProducts;
