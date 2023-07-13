import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EnquiriesPage.css';

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get('/api/enquiries');
        setEnquiries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/enquiries/${id}`);
      setEnquiries((prevEnquiries) =>
        prevEnquiries.filter((enquiry) => enquiry.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Enquiries</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <td>{enquiry.name}</td>
              <td>{enquiry.email}</td>
              <td>{enquiry.subject}</td>
              <td>{enquiry.message}</td>
              <td>
                <button
                  onClick={() => handleDelete(enquiry.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiriesPage;
