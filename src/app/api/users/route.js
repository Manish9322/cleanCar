import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User.model';
import bcrypt from 'bcryptjs';

// GET all users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).select('-password');
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST a new user (Register)
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password, phone, address, vehicleType, vehicleNumber } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Name, email, and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ success: false, message: 'User with this email already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ 
        name, 
        email, 
        password: hashedPassword, 
        phone,
        address,
        vehicleType,
        vehicleNumber
    });
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json({ success: true, data: userResponse, message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT to update a user
export async function PUT(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();

        if (!id) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        // If password is being updated, hash it
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedUser, message: 'User updated successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE a user
export async function DELETE(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
