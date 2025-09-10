import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking.model';
import User from '@/models/User.model';
import { headers } from 'next/headers';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

async function getUserIdFromToken() {
    const token = headers().get('x-user-payload');
    if (!token) return null;
    try {
        const payload = JSON.parse(token);
        return payload.userId;
    } catch (error) {
        return null;
    }
}


// GET all bookings
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    let filter = {};
    if (userId) {
        filter.userId = userId;
    } else {
        // If no userId is provided in query, check token.
        // This is for fetching bookings for the logged-in user.
        const loggedInUserId = await getUserIdFromToken();
        if (loggedInUserId) {
            filter.userId = loggedInUserId;
        }
    }

    const bookings = await Booking.find(filter).populate('userId', 'name email').populate('serviceId', 'name price').sort({ date: -1, time: -1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST a new booking
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { customerDetails, serviceId, date, time } = body;
    
    // Find or create a user based on customer details
    let user = await User.findOne({ phone: customerDetails.phone });

    if (!user) {
        // A simple way to create a user on the fly. 
        // Note: Password is not set, so they can't log in directly without a password reset flow.
        user = new User({
            name: customerDetails.name,
            phone: customerDetails.phone,
            email: `${customerDetails.phone}@aquashine.placeholder`, // Create a placeholder email
            password: '---' // Placeholder
        });
        await user.save();
    }
    
    const newBookingData = {
        ...body,
        userId: user._id,
    };
    
    const newBooking = new Booking(newBookingData);
    await newBooking.save();
    return NextResponse.json({ success: true, data: newBooking, message: "Booking created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT to update a booking
export async function PUT(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();

        if (!id) {
            return NextResponse.json({ success: false, message: 'Booking ID is required' }, { status: 400 });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!updatedBooking) {
            return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedBooking, message: 'Booking updated successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// DELETE a booking
export async function DELETE(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Booking ID is required' }, { status: 400 });
        }

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
