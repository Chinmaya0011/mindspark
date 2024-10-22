// src/components/LogList.js

import React, { useEffect, useState } from 'react';
import style from "../Styles/LogList.module.css";

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetch logs from the backend
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logs'); // Update with your production URL
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(); // Call fetchLogs on component mount
  }, []);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter logs based on search term (ip, method, url, status, date, and time)
  const filteredLogs = logs.filter(log => {
    const logDate = new Date(log.time).toLocaleDateString();
    const logTime = new Date(log.time).toLocaleTimeString();
    return (
      log.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.status.toString().includes(searchTerm) || // Convert status to string for comparison
      logDate.includes(searchTerm) || // Check for date
      logTime.includes(searchTerm) // Check for time
    );
  });

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  };

  if (loading) {
    return <div className={style.loading}>Loading logs...</div>;
  }

  if (error) {
    return <div className={style.error}>Error: {error}</div>;
  }

  return (
    <div className={style.logListContainer}>
      <h2 className={style.title}>Log List</h2>
      
      {/* Search Input */}
      <input
        type="text"
        className={style.searchInput}
        placeholder="Search logs..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <table className={style.logTable}>
        <thead>
          <tr>
            <th>IP</th>
            <th>Method</th>
            <th>URL</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Duration</th>
            <th>User Agent</th>
            <th>Referer</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr key={log._id}>
              <td>{log.ip}</td>
              <td>{log.method}</td>
              <td title={log.url}>{truncateText(log.url, 30)}</td> {/* Truncated URL */}
              <td>{new Date(log.time).toLocaleDateString()}</td>
              <td>{new Date(log.time).toLocaleTimeString()}</td>
              <td>{log.status}</td>
              <td>{log.duration} ms</td>
              <td title={log.userAgent}>{truncateText(log.userAgent, 30)}</td> {/* Truncated User Agent */}
              <td title={log.referer}>{truncateText(log.referer, 30)}</td> {/* Truncated Referer */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogList;
