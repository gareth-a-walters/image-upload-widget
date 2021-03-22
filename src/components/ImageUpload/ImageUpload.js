import React, { useState, useRef } from 'react';
import styles from './ImageUpload.module.css';
import plusIcon from '../../assets/icons/plus.svg';
import placeholderIcon from '../../assets/icons/placeholder_icon.svg';

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const hiddenFileInput = useRef(null);
  const maxImages = 3;

  const addImageClick = () => {
    hiddenFileInput.current.click();
  };

  const removeImageClick = (imageName) => {
    setSelectedImages((previousImages) =>
      previousImages.filter((image) => image !== imageName)
    );
  };

  const handleChange = (event) => {
    const maxFileSize = 10485760;
    const newImages = event.target.files;

    if (selectedImages.length + newImages.length > maxImages) {
      alert(`Only ${maxImages} images can be uploaded`);
    } else {
      const acceptedImages = Array.from(newImages)
        .filter((file) => file.size <= maxFileSize)
        .map((file) => URL.createObjectURL(file));

      const rejectedImagesNum = newImages.length - acceptedImages.length;
      if (rejectedImagesNum > 0) {
        alert(
          `${rejectedImagesNum} image(s) exceeded accepted file size (10mb)`
        );
      }

      setSelectedImages((previousImages) => [
        ...previousImages,
        ...acceptedImages,
      ]);
    }
    hiddenFileInput.current.value = null;
  };

  const renderImages = (images) => {
    return images.map((image) => {
      return (
        <div className={styles.imageInnerWrapper} key={image}>
          <img src={image} alt="user upload" className={styles.previewImages} />
          <button
            className={styles.removeImageBtn}
            onClick={() => {
              removeImageClick(image);
            }}
          ></button>
        </div>
      );
    });
  };

  return (
    <>
      <br />
      <div
        className={
          selectedImages.length <= 0
            ? styles.previewImagesEmptyContainer
            : styles.previewImagesContainer
        }
      >
        {renderImages(selectedImages)}
        <button
          type="button"
          className={styles.imageUploadButton}
          style={{ display: selectedImages.length < maxImages ? '' : 'none' }}
          onClick={addImageClick}
        >
          <img
            style={{
              display: selectedImages >= 0 ? '' : 'inline-block',
            }}
            src={plusIcon}
            alt="Add Photos Button"
            className={styles.addIcon}
          />

          <img
            style={{
              display: selectedImages >= 0 ? '' : 'none',
            }}
            src={placeholderIcon}
            alt="Add Photos Button"
          />
          <p
            className={styles.imageUploadText}
            style={{
              display: selectedImages >= 0 ? '' : 'none',
            }}
          >
            Click to add images
          </p>
          <p
            className={styles.imageUploadMicrocopy}
            style={{
              display: selectedImages >= 0 ? '' : 'none',
            }}
          >
            Max upload: 3 images. Max file size: 10MB.
          </p>
          <input
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            onChange={handleChange}
            className={styles.file}
            multiple
          />
        </button>
      </div>
    </>
  );
};

export default ImageUpload;
