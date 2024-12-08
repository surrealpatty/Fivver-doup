import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditService = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const history = useHistory(); // To redirect after successful update

  const [service, setService] = useState({
    title: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    // Fetch existing service data when the component mounts
    const fetchService = async () => {
      try {
        const response = await axios.get(`/services/${id}`);
        setService(response.data.service);
      } catch (error) {
        console.error('Failed to fetch service data');
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const updateService = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/services/${id}`, service);
      alert('Service updated successfully');
      history.push(`/services/${id}`); // Redirect to service page after update
    } catch (error) {
      alert('Failed to update service');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Service</h2>
      <form onSubmit={updateService}>
        <div>
          <label htmlFor="title">Service Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={service.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={service.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={service.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Service</button>
      </form>
    </div>
  );
};

export default EditService;
