import {useEffect, useState} from "react";
import * as productService from "../../service/ProductService";
import {Link} from "react-router-dom";
import * as categoryService from "../../service/CategoryService";

function ProductList() {
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    useEffect(() => {
        getAllProducts(searchName, searchCategory)
    }, [searchName, searchCategory]);

    const getAllProducts = async (searchName, searchCategory) => {
        let products = await productService.getAllProducts(searchName, searchCategory);
        setProduct(products);
    }

    useEffect(() => {
        getAllCategories()
    }, []);

    const getAllCategories = async () => {
        let categories = await categoryService.getAllCategories();
        setCategory(categories);
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={searchName}
                    placeholder="Nhập tên sản phẩm"
                    onChange={(e) => setSearchName(e.target.value)}
                /><br/>
                <select
                    className="form-control ml-3"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                >
                    <option value="">Chọn thể loại</option>
                    {category.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select><br/>
                <Link to="/createProduct" className="btn btn-primary">Thêm mới</Link>
            </div>

            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>STT</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Thể loại</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Ngày nhập</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.category.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;