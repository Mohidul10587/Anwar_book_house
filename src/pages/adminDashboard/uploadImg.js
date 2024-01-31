import React, { useState } from "react";
import dashboardLayout from "../../components/layouts/adminDashboardLayout";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [uploadedImage4, setUploadedImage4] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageChange2 = (e) => {
    const selectedImage2 = e.target.files[0];
    setImage2(selectedImage2);
  };
  const handleImageChange3 = (e) => {
    const selectedImage3 = e.target.files[0];
    setImage3(selectedImage3);
  };
  const handleImageChange4 = (e) => {
    const selectedImage4 = e.target.files[0];
    setImage4(selectedImage4);
  };

  const uploadImage = async (
    selectedImage,
    setImageFunction,
    setUploadedImageFunction
  ) => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=6c0277e2286d8c4a1059080d1574e2a7`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const uploadedUrl = data.data.url;
        console.log(uploadedUrl);
        setImageFunction(uploadedUrl);
        return true;
      } else {
        console.error("Image upload failed");
        return false;
      }
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const upload1 = await uploadImage(image, setImage, setUploadedImage);
    const upload2 = await uploadImage(image2, setImage2, setUploadedImage2);
    const upload3 = await uploadImage(image3, setImage3, setUploadedImage3);
    const upload4 = await uploadImage(image4, setImage4, setUploadedImage4);
  };

  return (
    <div>
      <h1>Upload Images to ImageBB</h1>
      <form onSubmit={handleUpload}>
        <div>
          <label>Image 1:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <label>Image 2:</label>
          <input type="file" accept="image/*" onChange={handleImageChange2} />
        </div>
        <div>
          <label>Image 3:</label>
          <input type="file" accept="image/*" onChange={handleImageChange3} />
        </div>
        <div>
          <label>Image 4:</label>
          <input type="file" accept="image/*" onChange={handleImageChange4} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="Uploaded 1" />
        </div>
      )}
      {uploadedImage2 && (
        <div>
          <img src={uploadedImage2} alt="Uploaded 2" />
        </div>
      )}
      {uploadedImage3 && (
        <div>
          <img src={uploadedImage3} alt="Uploaded 2" />
        </div>
      )}{" "}
      {uploadedImage4 && (
        <div>
          <img src={uploadedImage4} alt="Uploaded 2" />
        </div>
      )}
    </div>
  );
}

ImageUpload.Layout = dashboardLayout;
export default ImageUpload;
