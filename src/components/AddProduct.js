import React, { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false)


    const handleProduct = async () => {

        console.log(!name);
        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }


        console.log(name, price, company, category)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, company, category, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)
    }


    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type='text' placeholder='Enter Product name' className='input-box'
                onChange={(e) => { setName(e.target.value) }} value={name} />

            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type='text' placeholder='Enter Product price' className='input-box'
                onChange={(e) => { setPrice(e.target.value) }} value={price} />

            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type='text' placeholder='Enter Product category' className='input-box'
                onChange={(e) => { setCategory(e.target.value) }} value={category} />

            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type='text' placeholder='Enter Product company' className='input-box'
                onChange={(e) => { setCompany(e.target.value) }} value={company} />

            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button className='appButton' onClick={handleProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct