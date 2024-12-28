'use client';

import { useRef, useState } from 'react';
import styles from './css/image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker ({ label, name }) {
    const imageInputRef = useRef();
    const [pickedImage, setImagePicked] = useState();

    function handleImagePickerClick () {
        imageInputRef.current.click();
    }

    function handleImageChanged (e) {
        const file = e.target.files[0];
        if (!file) {
            setImagePicked(null);
            return;
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setImagePicked(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={styles.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No picked image yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='Image selected by the user' fill />}
                </div>
                <input
                    className={styles.input}
                    ref={imageInputRef}
                    id={name}
                    name={name}
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={handleImageChanged}
                    required
                />
                <button className={styles.button} type='button' onClick={handleImagePickerClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    );
};