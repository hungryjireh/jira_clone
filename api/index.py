import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('api/database.db')
    conn.row_factory = sqlite3.Row
    return conn

# API routes
@app.route('/issues', methods=['GET'])
def get_issues():
    conn = get_db_connection()
    issues = conn.execute('SELECT * FROM issues').fetchall()
    conn.close()
    return jsonify([dict(issue) for issue in issues])

@app.route('/issues', methods=['POST'])
def create_issue():
    data = request.json
    if not data or not 'title' in data or not 'status' in data:
        return jsonify({'error': 'Bad request'}), 400
    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO issues (title, description, status, user) VALUES (?, ?, ?, ?)',
                (data['title'], data.get('description', ''), data['status'], data.get('user', '')))
    conn.commit()
    issue_id = cur.lastrowid
    conn.close()
    
    return jsonify({'id': issue_id, 'message': 'Issue created successfully'}), 201

@app.route('/issues/<int:issue_id>', methods=['GET'])
def get_issue(issue_id):
    conn = get_db_connection()
    issue = conn.execute('SELECT * FROM issues WHERE id = ?', (issue_id,)).fetchone()
    conn.close()
    
    if issue is None:
        return jsonify({'error': 'Issue not found'}), 404
    
    return jsonify(dict(issue))

@app.route('/issues/<int:issue_id>', methods=['PUT'])
def update_issue(issue_id):
    data = request.json
    if not data:
        return jsonify({'error': 'Bad request'}), 400
    
    conn = get_db_connection()
    issue = conn.execute('SELECT * FROM issues WHERE id = ?', (issue_id,)).fetchone()
    
    if issue is None:
        conn.close()
        return jsonify({'error': 'Issue not found'}), 404
    
    title = data.get('title', issue['title'])
    description = data.get('description', issue['description'])
    status = data.get('status', issue['status'])
    user = data.get('user', issue['user'])
    
    conn.execute('UPDATE issues SET title = ?, description = ?, status = ?, user = ? WHERE id = ?',
                 (title, description, status, user, issue_id))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Issue updated successfully'})

@app.route('/issues/<int:issue_id>', methods=['DELETE'])
def delete_issue(issue_id):
    conn = get_db_connection()
    issue = conn.execute('SELECT * FROM issues WHERE id = ?', (issue_id,)).fetchone()
    
    if issue is None:
        conn.close()
        return jsonify({'error': 'Issue not found'}), 404
    
    conn.execute('DELETE FROM issues WHERE id = ?', (issue_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Issue deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)