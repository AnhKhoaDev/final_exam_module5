import axios from "axios";

const URL_PRODUCTS = "http://localhost:8080/products";

// Đổi tên hàm để phản ánh đúng ngữ cảnh sản phẩm
export const getAllProducts = async (searchName, searchCategory) => {
    try {
        let params = {};

        // Kiểm tra xem có tìm kiếm theo tên không
        if (searchName) {
            params.name = `*${searchName}*`; // Có thể kiểm tra việc này phía backend
        }

        // Gọi API với các tham số tìm kiếm
        let res = await axios.get(URL_PRODUCTS, { params });

        // Lọc sản phẩm theo category nếu có
        if (searchCategory) {
            res.data = res.data.filter(product => product.category.id === searchCategory);
        }

        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return [];
    }
}

// Hàm lưu sản phẩm
export const saveProduct = async (product) => {
    try {
        await axios.post(URL_PRODUCTS, product);
        return true;
    } catch (error) {
        console.error("Error saving product:", error.message);
        return false;
    }
}
