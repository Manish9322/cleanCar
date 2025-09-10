import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service.model';

// GET all services
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({});
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST a new service
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newService = new Service(body);
    await newService.save();
    return NextResponse.json({ success: true, data: newService, message: 'Service created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT to update a service
export async function PUT(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();

        if (!id) {
            return NextResponse.json({ success: false, message: 'Service ID is required' }, { status: 400 });
        }

        const updatedService = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updatedService) {
            return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedService, message: 'Service updated successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// DELETE a service
export async function DELETE(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Service ID is required' }, { status: 400 });
        }

        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
