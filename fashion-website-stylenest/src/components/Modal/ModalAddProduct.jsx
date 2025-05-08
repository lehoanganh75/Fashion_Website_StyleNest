import React, { useState } from 'react'

const ModalAddProduct = ({ isOpen, onClose, saveProduct, products }) => {
    const [descriptions, setDescriptions] = useState([{ title: '', content: '' }]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [images, setImages] = useState([{ file: null, preview: '', caption: '' }]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [formData, setFormData] = useState({
        name: 'Áo Thun Nam Trơn Basic Just Tee Form Regular',
        brand: 'ICON DENIM',
        type: 'Áo Thun',
        price: '199000',
        discount: '5',
        condition: true,
        SKU: 'ATID0598-02',
        material: '100% Cotton',
        fabric: 'Thun cotton mềm mại',
        origin: 'VN',
        careInstructions: 'Để giữ cho chiếc áo thun nam trơn basic Just Tee luôn bền đẹp, bạn nên giặt tay hoặc máy ở chế độ nhẹ với nước lạnh hoặc ấm. Tránh sử dụng các chất tẩy mạnh có thể làm phai màu hoặc hư hại sợi vải. Sau khi giặt, nên phơi áo ở nơi thoáng mát, tránh ánh nắng trực tiếp gắt để bảo vệ màu sắc và độ bền của chất liệu cotton. Việc chăm sóc đúng cách sẽ giúp chiếc áo của bạn luôn như mới và đồng hành cùng bạn trong thời gian dài.',
        rating: '0',
        review: '0',
        slogan: 'Vô địch',
        dateAdded: new Date(),
        instock: '123',
    });

    console.log("size", products.length);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;
      
        const preview = URL.createObjectURL(file);
      
        const updatedImages = [...images];
        updatedImages[index] = {
          ...updatedImages[index],
          file, 
          preview
        };
      
        setImages(updatedImages);
    };
    
    const addImage = () => {
        setImages([...images, { file: null, preview: '', caption: '' }]);
    };  

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedSizes((prev) => [...prev, value]);
        } else {
            setSelectedSizes((prev) => prev.filter((size) => size !== value));
        }
    };

    const handleColorChange = (e) => {
        const { value, checked } = e.target;
        setSelectedColors((prevColors) =>
            checked ? [...prevColors, value] : prevColors.filter((color) => color !== value)
        );
      };
  
    const colorOptions = [
        "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", 
        "white", "cyan", "magenta", "violet", "indigo", "maroon", "olive", "lime", "teal", "navy",
        "aqua", "fuchsia", "silver", "gold", "peach", "chocolate", "beige", "ivory", "lavender", "coral"
    ];

    const addDescription = () => {
        setDescriptions([...descriptions, { title: '', content: '' }]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };    

    const handleSubmit = () => {
        const productToSave = {
            id: Math.max(...products.map((a) => a.id || 0), 0) + 1,            
            name: formData.name,
            brand: formData.brand,
            type: formData.type,
            price: Number(formData.price),
            discount: Number(formData.discount),
            condition: Boolean(formData.condition),
            SKU: formData.SKU,
            rating: Number(formData.rating),
            review: Number(formData.review),
            slogan: formData.slogan,
            dateAdded: new Date(formData.dateAdded),
            instock: Number(formData.instock),
    
            colors: selectedColors,
            size: selectedSizes,
    
            descriptions: descriptions.map(desc => ({
                title: desc.title,
                content: desc.content
            })),
    
            details: {
                material: formData.material,
                fabric: formData.fabric,
                origin: formData.origin,
                careInstructions: formData.careInstructions
            }
        };
    
        // Lấy mảng file ảnh từ state
        const imageFiles = images.map(i => i.file); // cần đảm bảo `file` là File object đã chọn từ input
    
        saveProduct(productToSave, imageFiles);

        onClose();
    };
    
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-['Roboto']">
        {/* Nền mờ */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn transition-transform duration-300"> 
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
                <h2 className="text-xl font-semibold text-gray-900">Thêm sản phẩm mới</h2>
            </div>

            <div className="space-y-4 mt-2">
                {/* Ảnh */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Ảnh sản phẩm</label>
                        {images.map((img, index) => (
                            <div key={index} className="mb-4 flex items-center gap-4">
                                {img.preview && (
                                    <img src={img.preview} alt={`Ảnh ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="px-3 py-2 text-red-600 border border-red-300 rounded hover:bg-red-100 transition"
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}
                    <button
                        type="button"
                        onClick={addImage}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Thêm ảnh
                    </button>
                </div>

                {/* Tên sản phẩm */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Tên sản phẩm</label>
                    <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Thương hiệu */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Thương hiệu</label>
                    <input 
                    type="text" 
                    name="brand" 
                    value={formData.brand}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Loại */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Loại</label>
                    <input 
                    type="text" 
                    name="type" 
                    value={formData.type}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Giá bán */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Giá tiền</label>
                    <input 
                    type="text" 
                    name="price" 
                    value={formData.price}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Giảm giá */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Giảm giá</label>
                    <input 
                    type="text" 
                    name="discount" 
                    value={formData.discount}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Kích thức */}
                <div>
                    <label className="block font-medium mb-2 text-gray-700">Kích thước</label>
                    <div className="flex flex-wrap gap-3">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div key={size}>
                            <input
                                type="checkbox"
                                id={`size_${size}`}
                                value={size}
                                className="hidden"
                                onChange={handleSizeChange}
                                checked={selectedSizes.includes(size)}
                            />
                            <label
                                htmlFor={`size_${size}`}
                                className={`px-4 py-2 border rounded-md cursor-pointer text-sm font-medium transition-all duration-200 inline-block
                                    ${selectedSizes.includes(size)
                                    ? "bg-blue-100 border-blue-500 text-blue-700"
                                    : "border-gray-300 text-gray-700 hover:bg-blue-100 hover:border-blue-500"}
                                `}
                                >
                                {size}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>

                {/* SKU */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">SKU</label>
                    <input 
                    type="text" 
                    name="SKU" 
                    value={formData.SKU}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Slogan */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Slogan</label>
                    <input 
                    type="text" 
                    name="slogan" 
                    value={formData.slogan}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Số lượng trong cửa hàng */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Số lượng trong của hàng</label>
                    <input 
                    type="number" 
                    name="instock" 
                    value={formData.instock}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Thông tin vật liệu */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Vật liệu</label>
                    <input 
                    type="text" 
                    name="material" 
                    value={formData.material}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Thông tin vải vóc */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Vải vóc</label>
                    <input 
                    type="text" 
                    name="fabric" 
                    value={formData.fabric}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>                

                {/* Thông tin nguồn gốc */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Nguồn gốc</label>
                    <input 
                    type="text" 
                    name="origin" 
                    value={formData.origin}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Thông tin hướng dẫn sử dụng */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Hướng dẫn sử dụng</label>
                    <input 
                    type="text" 
                    name="careInstructions" 
                    value={formData.careInstructions}
                    onChange={handleChange}
                    required 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                    />
                </div>

                {/* Mô tả sản phẩm */}
                <div>
                    {descriptions.map((desc, index) => (
                        <div key={index}>
                            <label className="block font-medium mb-1 text-gray-700">Mô tả {index + 1} - Tiêu đề</label>
                            <input
                                type="text"
                                name={`desc_title_${index + 1}`}
                                value={desc.title}
                                onChange={(e) => {
                                const updatedDescriptions = [...descriptions];
                                updatedDescriptions[index].title = e.target.value;
                                setDescriptions(updatedDescriptions);
                                }}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        
                            <label className="block font-medium mb-1 text-gray-700">Mô tả {index + 1} - Nội dung</label>
                            <textarea
                                name={`desc_content_${index + 1}`}
                                value={desc.content}
                                onChange={(e) => {
                                const updatedDescriptions = [...descriptions];
                                updatedDescriptions[index].content = e.target.value;
                                setDescriptions(updatedDescriptions);
                                }}
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addDescription}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Thêm tiêu đề
                    </button>
                </div>
            
                {/* Chọn màu */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Chọn màu</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                    {colorOptions.map((color) => (
                        <div key={color} className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            id={color}
                            value={color}
                            onChange={handleColorChange}
                            className="hidden"
                        />
                        <label
                            htmlFor={color}
                            className="w-10 h-10 border border-gray-300 shadow-sm rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110"
                            style={{
                            backgroundColor: color,
                            }}
                        >
                            <span className="sr-only">{color}</span>
                        </label>
                        </div>
                    ))}
                    </div>
            
                    <p className="mt-4 text-lg text-gray-800">Màu đã chọn: {selectedColors.join(", ")}</p>
                </div>

                {/* Nút đóng và lưu */}
                <div className="flex gap-2 justify-end">
                    <button
                        className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition shadow-md"
                        onClick={handleSubmit}
                    >
                        Lưu
                    </button>

                    <button
                        className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition shadow-md"
                        onClick={onClose}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>  
  )
}

export default ModalAddProduct;