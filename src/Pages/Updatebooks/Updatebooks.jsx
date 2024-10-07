import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBook } from '../../utils/bookSlice';

const UpdateBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector(state => state.book.find(book => book.id === id));

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    type: '',
    image: null,
    description: '',
  });

  useEffect(() => {
    if (book) {
      setBookData({
        ...book,
        image: null // To avoid re-uploading previous image
      });
    }
  }, [book]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setBookData({
      ...bookData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, author, description } = bookData;

    if (!title || !author || !description) {
      alert('Please ensure all the fields are entered');
      return;
    }

    const updatedBook = {
      ...bookData,
      id: book.id,
      img: bookData.image ? URL.createObjectURL(bookData.image) : book.img, // Keep original image if not changed
    };

    dispatch(updateBook(updatedBook));
    navigate('/browsebook');
  };

  return (
    <form className='md:w-1/2 w-full font-Poppins p-12 mx-auto' onSubmit={handleSubmit}>
      <h2 className='font-semibold text-2xl mb-4 text-center'>Add new Book</h2>
      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Title</label>
        <input type="text" name='title' value={bookData.title} onChange={handleChange} placeholder='Enter a Title of Book' className='w-full h-12 pl-2 pr-5 border-2 border-black outline-none' />
      </div>
      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Author</label>
        <input type="text" name='author' value={bookData.author} onChange={handleChange} placeholder='Enter a Author' className='w-full h-12 pl-2 pr-5 border-2 border-black outline-none' />
      </div>
      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Book Type</label>
        <input type="text" name='type' value={bookData.type} onChange={handleChange} placeholder='Enter a book type eg: fantacy, Non-Fiction, crime, fiction, Science, ' className='w-full h-12 pl-2 pr-5 border-2 border-black outline-none' />
      </div>
      <div className='mb-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Description</label>
        <textarea type="text" name='description' value={bookData.description} onChange={handleChange} placeholder='Enter a description' className='w-full h-12 pl-2 pr-5 border-2 border-black outline-none' rows='5'></textarea>
      </div>
      <div className='mb-4 flex gap-4'>
        <label className='font-medium text-lg text-gray-600 mb-2'>Upload a Image</label>
        <input type="file" name='image' accept='image/*' onChange={handleChange} placeholder='Choose a Image' className='outline-none' />
      </div>
     
      <button type='submit' className='px-6 py-2 bg-black text-white font-semibold'>Update Book</button>
      
    </form>
  );
};

export default UpdateBook;
