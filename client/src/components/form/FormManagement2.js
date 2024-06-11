import React, { useState } from 'react';

function FormManagement2() {
    const [formData, setFormData] = useState({
        school_id: '',
        school_name: '',
        telephone: '',
        subdistrict: '',
        district: '',
        province: '',
        affiliation: '',
        headmaster_name: '',
        outstanding_activities: '',
        education_levels: [],
        student_counts: {
          primary: '',
          secondary: '',
          // Add more levels if needed
        },
        teacher_counts: {
          primary: '',
          secondary: '',
          // Add more levels if needed
        },
        other_education_level: ''
      });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEducationLevelChange = (e, level) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      student_counts: {
        ...formData.student_counts,
        [level]: value
      }
    });
  };

  const handleTeacherCountChange = (e, level) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      teacher_counts: {
        ...formData.teacher_counts,
        [level]: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/submitform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data);
      alert(data); // Show success message
      // You can redirect or do anything else after successful submission
    })
    .catch(error => {
      console.error('There was an error!', error);
      alert('Error submitting form. Please try again later.');
    });
  };

  return (
    <div>
      <h2>Submit Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="school_id">School ID:</label><br />
        <input type="text" id="school_id" name="school_id" value={formData.school_id} onChange={handleChange} /><br />

        <label htmlFor="school_name">School Name:</label><br />
        <input type="text" id="school_name" name="school_name" value={formData.school_name} onChange={handleChange} /><br />

        <label htmlFor="telephone">Telephone:</label><br />
        <input type="text" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} /><br />

        <label htmlFor="subdistrict">Subdistrict:</label><br />
        <input type="text" id="subdistrict" name="subdistrict" value={formData.subdistrict} onChange={handleChange} /><br />

        <label htmlFor="district">District:</label><br />
        <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} /><br />

        <label htmlFor="province">Province:</label><br />
        <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} /><br />

        <label htmlFor="affiliation">Affiliation:</label><br />
        <input type="text" id="affiliation" name="affiliation" value={formData.affiliation} onChange={handleChange} /><br />

        <label htmlFor="headmaster_name">Headmaster Name:</label><br />
        <input type="text" id="headmaster_name" name="headmaster_name" value={formData.headmaster_name} onChange={handleChange} /><br />

        <label htmlFor="outstanding_activities">Outstanding Activities:</label><br />
        <input type="text" id="outstanding_activities" name="outstanding_activities" value={formData.outstanding_activities} onChange={handleChange} /><br />

        <h3>Education Levels:</h3>
        <div>
          <label htmlFor="primary">Primary:</label>
          <input type="text" id="primary" name="primary" value={formData.student_counts.primary} onChange={(e) => handleEducationLevelChange(e, 'primary')} />
          <input type="text" id="primary_teacher" name="primary_teacher" value={formData.teacher_counts.primary} onChange={(e) => handleTeacherCountChange(e, 'primary')} />
        </div>
        <div>
          <label htmlFor="secondary">Secondary:</label>
          <input type="text" id="secondary" name="secondary" value={formData.student_counts.secondary} onChange={(e) => handleEducationLevelChange(e, 'secondary')} />
          <input type="text" id="secondary_teacher" name="secondary_teacher" value={formData.teacher_counts.secondary} onChange={(e) => handleTeacherCountChange(e, 'secondary')} />
        </div>
        {/* Add more education level inputs as needed */}

        <label htmlFor="other_education_level">Other Education Level:</label><br />
        <input type="text" id="other_education_level" name="other_education_level" value={formData.other_education_level} onChange={handleChange} /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default FormManagement2;