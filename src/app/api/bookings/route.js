import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking.model';

// GET all bookings
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const filter = {};
    if (userId) filter.userId = userId;

    const bookings = await Booking.find(filter).populate('userId', 'name email').populate('serviceId', 'name price');
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
    const newBooking = new Booking(body);
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
