import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Feedback from '@/models/Feedback.model';

// GET all feedback
export async function GET(request) {
  try {
    await connectDB();
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: feedbacks });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch feedback", error: error.message }, { status: 500 });
  }
}

// POST new feedback
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newFeedback = new Feedback(body);
    await newFeedback.save();
    return NextResponse.json({ success: true, data: newFeedback, message: "Feedback submitted successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create feedback", error: error.message }, { status: 400 });
  }
}

// PUT to update feedback
export async function PUT(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json({ success: false, message: "Feedback ID is required" }, { status: 400 });
    }
    
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    
    if (!updatedFeedback) {
      return NextResponse.json({ success: false, message: "Feedback not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedFeedback, message: "Feedback updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update feedback", error: error.message }, { status: 500 });
  }
}

// DELETE feedback
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, message: "Feedback ID is required" }, { status: 400 });
    }
    
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    
    if (!deletedFeedback) {
      return NextResponse.json({ success: false, message: "Feedback not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete feedback", error: error.message }, { status: 500 });
  }
}
