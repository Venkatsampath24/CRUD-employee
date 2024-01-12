import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeD.css';

function EmployeesD() {
  const [employee, setEmployee] = useState([]);
  const [singleEmployee, setSingleEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [createEmployee, setCreateEmployee] = useState({
    id: 0,
    employee_name: '',
    employee_salary: 0,
  });

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
        setEmployee(response.data.data);
      } catch (error) {
        console.error('Error fetching all employees:', error);
        setError('Error fetching all employees');
      }
    };

    fetchAllEmployees();
  }, []);

  useEffect(() => {
    const getSingleEmployee = async () => {
      try {
        const response = await axios.get('https://dummy.restapiexample.com/api/v1/employee/1');
        setSingleEmployee(response.data.data);
      } catch (error) {
        console.error('Error fetching single employee:', error);
        setSingleEmployee(null);
      }
    };

    getSingleEmployee();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://dummy.restapiexample.com/api/v1/create', createEmployee);
  
      // Update the local state with the newly created employee
      setEmployee((prevEmployees) => [...prevEmployees, response.data.data]);
      console.log(response);
    } catch (error) {
      console.error('Error creating employee:', error);
      setError('Error creating employee');
    }
  };
 
  
  

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`https://dummy.restapiexample.com/api/v1/update/${id}`, {
        data: createEmployee,
      });
      // Update the local state with the updated employee
      setEmployee((prevEmployees) =>
      prevEmployees.map((emp) => (emp.id === id ? { ...emp, ...response.data.data } : emp))
    );
    
      console.log(response);
    } catch (error) {
      console.error(`Error updating employee with ID ${id}:`, error);
      setError(`Error updating employee with ID ${id}`);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummy.restapiexample.com/api/v1/delete/${id}`);
      // Update the local state by filtering out the deleted employee
      setEmployee((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
      console.log(`Employee with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
      setError(`Error deleting employee with ID ${id}`);
    }
  };

  return (
    <div>
      <h1>GET Fetching All employees Details:</h1>
      {employee.map((empDetails) => (
        <div className="employee-details" key={empDetails.id}>
          <h2>Employee ID: {empDetails.id}</h2>
          <p>Name: {empDetails.employee_name}</p>
          <p>Salary: {empDetails.employee_salary}</p>
          <button onClick={() => handleUpdate(empDetails.id)}>Update</button>
          <button onClick={() => handleDelete(empDetails.id)}>Delete</button>
        </div>
      ))}

      <h2>II GET single Employee Details</h2>
      {singleEmployee && (
        <div className="single-emp">
          <h2>Employee ID: {singleEmployee.id}</h2>
          <p>Name: {singleEmployee.employee_name}</p>
        </div>
      )}

      <h2>Create a New Employee</h2>
      <div>
        <label htmlFor="employee_name">Employee Name:</label>
        <input
          type="text"
          id="employee_name"
          name="employee_name"
          value={createEmployee.employee_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="employee_salary">Employee Salary:</label>
        <input
          type="number"
          id="employee_salary"
          name="employee_salary"
          value={createEmployee.employee_salary}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Create Employee</button>
    </div>
  );
}

export default EmployeesD;
