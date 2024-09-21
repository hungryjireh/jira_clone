// File: pages/index.js
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:5328'

export default function Home() {
  const [issues, setIssues] = useState([])
  const [newIssue, setNewIssue] = useState({ title: '', description: '', status: '' })
  const [editingIssue, setEditingIssue] = useState(null)

  useEffect(() => {
    fetchIssues()
  }, [])

  const fetchIssues = async () => {
    try {
      const response = await axios.get(`${API_URL}/issues`)
      setIssues(response.data)
    } catch (error) {
      console.error('Error fetching issues:', error)
    }
  }

  const createIssue = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/issues`, newIssue)
      setNewIssue({ title: '', description: '', status: '', user: '' })
      fetchIssues()
    } catch (error) {
      console.error('Error creating issue:', error)
    }
  }

  const deleteIssue = async (id) => {
    try {
      await axios.delete(`${API_URL}/issues/${id}`)
      fetchIssues()
    } catch (error) {
      console.error('Error deleting issue:', error)
    }
  }

  const startEditing = (issue) => {
    setEditingIssue({ ...issue })
  }

  const cancelEditing = () => {
    setEditingIssue(null)
  }

  const updateIssue = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_URL}/issues/${editingIssue.id}`, editingIssue)
      setEditingIssue(null)
      fetchIssues()
    } catch (error) {
      console.error('Error updating issue:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Jira Issues Manager</h1>

      <form onSubmit={createIssue} className="mb-8">
        <input
          type="text"
          placeholder="Issue Title"
          value={newIssue.title}
          onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={newIssue.description}
          onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
          className="w-full p-2 mb-2 border rounded"
        />
        <select
          value={newIssue.status}
          onChange={(e) => setNewIssue({...newIssue, status: e.target.value})}
          required
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="text"
          placeholder="Assigned To"
          value={newIssue.user}
          onChange={(e) => setNewIssue({...newIssue, user: e.target.value})}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Issue</button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Issues</h2>
      {issues.map((issue) => (
        <div key={issue.id} className="border p-4 mb-4 rounded">
          {editingIssue && editingIssue.id === issue.id ? (
            <form onSubmit={updateIssue} className="space-y-2">
              <input
                type="text"
                value={editingIssue.title}
                onChange={(e) => setEditingIssue({...editingIssue, title: e.target.value})}
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                value={editingIssue.description}
                onChange={(e) => setEditingIssue({...editingIssue, description: e.target.value})}
                className="w-full p-2 border rounded"
              />
              <select
                value={editingIssue.status}
                onChange={(e) => setEditingIssue({...editingIssue, status: e.target.value})}
                required
                className="w-full p-2 border rounded"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <input
                type="text"
                placeholder="Assigned To"
                value={editingIssue.user}
                onChange={(e) => setEditingIssue({...editingIssue, user: e.target.value})}
                required
                className="w-full p-2 mb-2 border rounded"
              />
              <div className="flex space-x-2">
                <button type="submit" className="p-2 bg-green-500 text-white rounded">Save</button>
                <button type="button" onClick={cancelEditing} className="p-2 bg-gray-500 text-white rounded">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="text-xl font-bold">{issue.title}</h3>
              <p>{issue.description || 'No description'}</p>
              <p>Status: {issue.status}</p>
              <p>Assigned To: {issue.user || 'Unassigned'}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => startEditing(issue)}
                  className="p-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteIssue(issue.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
