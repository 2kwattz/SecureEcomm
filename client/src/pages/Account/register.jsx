import React, { useState } from 'react';

const RegistrationForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  // State to hold errors for each field
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    // Phone regex allowing +, spaces, dashes, digits
    const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // STOP the page from refreshing and killing your vibe

    // You can now send formData to your backend via fetch or axios
    try {
      const response = await fetch('http://150.107.210.11/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to register');
      const result = await response.json();

      alert("Success")
      console.log('Success:', result);
      // Maybe clear form or redirect user
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="firstName">First Name *</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={errors.firstName ? styles.inputError : styles.input}
        />
        {errors.firstName && <div style={styles.error}>{errors.firstName}</div>}

        <label htmlFor="lastName">Last Name *</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={errors.lastName ? styles.inputError : styles.input}
        />
        {errors.lastName && <div style={styles.error}>{errors.lastName}</div>}

        <label htmlFor="email">Email *</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          style={errors.email ? styles.inputError : styles.input}
        />
        {errors.email && <div style={styles.error}>{errors.email}</div>}

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="+1234567890"
          value={formData.phone}
          onChange={handleChange}
          style={errors.phone ? styles.inputError : styles.input}
        />
        {errors.phone && <div style={styles.error}>{errors.phone}</div>}

        <label htmlFor="password">Password *</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          style={errors.password ? styles.inputError : styles.input}
        />
        {errors.password && <div style={styles.error}>{errors.password}</div>}

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

// Simple inline styles (because CSS files are for people who like effort)
const styles = {
  container: {
    maxWidth: 400,
    margin: '50px auto',
    padding: 30,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '18px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 15,
  },
  inputError: {
    width: '100%',
    padding: '10px',
    marginBottom: '18px',
    border: '1px solid red',
    borderRadius: 4,
    fontSize: 15,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: -14,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    border: 'none',
    borderRadius: 5,
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  }
};

export default RegistrationForm;
