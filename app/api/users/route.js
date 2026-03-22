import { NextResponse } from 'next/server';
import pool from '../../lib/db';

// GET all users
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST new user
export async function POST(request) {
  try {
    const { name, email, age } = await request.json();
    
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }
    
    const [result] = await pool.query(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age || null]
    );
    
    return NextResponse.json({ 
      id: result.insertId, 
      name, 
      email, 
      age 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PUT update user
export async function PUT(request) {
  try {
    const { id, name, email, age } = await request.json();
    
    if (!id || !name || !email) {
      return NextResponse.json({ error: 'ID, name, and email are required' }, { status: 400 });
    }
    
    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age || null, id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ id, name, email, age });
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}