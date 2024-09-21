import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO issues (title, description, status) VALUES (?, ?, ?)",
            ('First Issue', 'Content for the first Issue', 'OPEN')
            )

cur.execute("INSERT INTO issues (title, description, status) VALUES (?, ?, ?)",
            ('Second Issue', 'Content for the second Issue', 'OPEN')
            )

connection.commit()
connection.close()