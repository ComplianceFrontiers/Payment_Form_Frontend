'use client'
import React, { useEffect, useState } from 'react';
import './admin.scss';
import * as XLSX from 'xlsx';

interface User {
  playerFirstName: string;
  playerLastName: string;
  parentFirstName: string;
  parentLastName: string;
  phoneNumber: string;
  email: string;
  section: string;
  signupDate: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tournamentTimings, setTournamentTimings] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTournamentTimings, setNewTournamentTimings] = useState<string>('');

  useEffect(() => {
    // Fetch user data from the API
    fetch('https://payment-form-backend.vercel.app/Club_users')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging

        // Check if data is an array
        if (Array.isArray(data)) {
          // Transform the data to match the User interface
          const modifiedData = data.map((user: any) => ({
            playerFirstName: user.playerFirstName || '',
            playerLastName: user.playerLastName || '',
            parentFirstName: user.parentFirstName || '',
            parentLastName: user.parentLastName || '',
            phoneNumber: user.phoneNumber || '',
            email: user.email || '',
            section: user.section || '',
            signupDate: user.signupDate || new Date().toISOString(),
          }));

          setUsers(modifiedData);
        } else {
          throw new Error('Invalid data format');
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      });

    // Fetch tournament timings from the API
    fetch('http://127.0.0.1:80/tournament-timings')
      .then(response => response.json())
      .then(data => {
        setTournamentTimings(data);
        setNewTournamentTimings(data); // Initialize newTournamentTimings with fetched data
      })
      .catch(error => {
        console.error('Error fetching tournament timings:', error);
        setTournamentTimings('Failed to load tournament timings');
      });
  }, []);

  const exportToExcel = () => {
    // Convert the user data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    // Export the workbook as an Excel file
    XLSX.writeFile(workbook, 'users.xlsx');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTournamentTimings(event.target.value);
  };

  const handleSaveClick = () => {
    fetch('http://127.0.0.1:80/update_tournament', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ TornumentTimings: newTournamentTimings }),
    })
      .then(response => response.json())
      .then(() => {
        setTournamentTimings(newTournamentTimings);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error saving tournament timings:', error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-container">
      <div className="header">
        <button className="export-button" onClick={exportToExcel}>Export to Excel</button>
        <div className="tournament-timing">
          {isEditing ? (
            <>
              <input
                type="text"
                value={newTournamentTimings}
                onChange={handleInputChange}
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <span className="tournament-timings">{tournamentTimings}</span>
              <button onClick={handleEditClick}>Edit</button>
            </>
          )}
        </div>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Player First Name</th>
            <th>Player Last Name</th>
            <th>Parent First Name</th>
            <th>Parent Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Section</th>
            <th>Signup Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.playerFirstName}</td>
              <td>{user.playerLastName}</td>
              <td>{user.parentFirstName}</td>
              <td>{user.parentLastName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>{user.section}</td>
              <td>{user.signupDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
