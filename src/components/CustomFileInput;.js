import React from "react";
import { FiImage, FiUpload } from "react-icons/fi";

const CustomFileInput = ({ id, name, onChange, value, label, accept }) => {
  const handleFileReset = () => {
    // Create a new file input element
    const fileInput = document.getElementById(id);
    if (fileInput) {
      fileInput.value = null; // Reset the value to null
    }

    // Trigger the onChange event to notify the parent component about the change
    if (onChange) {
      onChange({ target: { name, value: null } });
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="text-white text-lg font-semibold mb-2 block"
      >
        {label}
      </label>

      {value ? (
        <div className="flex items-center mt-2">
          <img
            src={URL.createObjectURL(value)}
            alt="Chosen"
            className="h-80 w-80 object-cover rounded-md border border-gray-300"
          />
        </div>
      ) : (
        <div className="flex items-center mt-2">
          <img
            src="data:image/png;base64,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"
            alt="Chosen"
            className="h-80 w-80 object-cover rounded-md border border-gray-300"
          />
        </div>
      )}

      <div className="relative mt-4">
        <label
          htmlFor={id}
          className="cursor-pointer flex items-center gap-2 bg-primary py-2 px-4 rounded-md text-white  transition duration-300 ease-in-out"
        >
          <div className="flex justify-center w-72 gap-4 items-center ">
            <FiUpload className="text-lg" />
            <span>{value ? "Change Image" : "Upload Image"}</span>
          </div>
        </label>
        <input
          id={id}
          name={name}
          onChange={onChange}
          value=""
          className="hidden"
          type="file"
          accept={accept}
        />
      </div>
    </div>
  );
};

export default CustomFileInput;
