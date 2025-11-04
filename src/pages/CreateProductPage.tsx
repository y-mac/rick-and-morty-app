import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup

// Define the Yup schema for validation
const schema = yup.object().shape({
  title: yup.string().matches(/^[a-zA-Z\s]+$/, 'Title must contain only letters').required('Title is required'),
  price: yup.number().typeError('Price must be a number').positive('Price must be positive').required('Price is required'),
  description: yup.string().matches(/^[a-zA-Z\s]+$/, 'Description must contain only letters').required('Description is required'),
  image: yup.string().matches(/^[a-zA-Z0-9\/.:\-_]+$/, 'Image must be alphanumeric').required('Image is required'),
});

const CreateProductPage: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    // 1. Una vez validado el formulario, consumir la API
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          // Añade campos extra que la API necesite, ej:
          category: 'electronica' 
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Producto creado con éxito:', result);
        alert('Producto creado con éxito!');
      } else {
        console.error('Error al crear el producto');
        alert('Hubo un error al crear el producto.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error de conexión con la API.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 60px)', // Adjust based on header height
      padding: '20px 0',
      marginTop: '60px' // Adjust based on header height
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '10px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        padding: '40px',
        width: '100%',
        maxWidth: '800px',
        color: 'white'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Create New Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* 1. Campo: Titulo */}
            <div>
              <label style={{ display: 'block' }}>Título:</label>
              <input {...register('title')} type="text" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
            </div>

            {/* 2. Campo: Precio (numérico, acepta punto) */}
            <div>
              <label style={{ display: 'block' }}>Precio:</label>
              <input {...register('price')} type="number" step="0.01" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              {errors.price && <p style={{ color: 'red' }}>{errors.price.message}</p>}
            </div>

            {/* 4. Campo: Imagen (alfanumérico) */}
            <div>
              <label style={{ display: 'block' }}>Imagen (URL o similar):</label>
              <input {...register('image')} type="text" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* 3. Campo: Descripción */}
            <div>
              <label style={{ display: 'block' }}>Descripción:</label>
              <textarea {...register('description')} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '120px' }}></textarea>
              {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
            </div>

            <button type="submit" style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer', fontSize: '1em', marginTop: 'auto' }}>Crear Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
