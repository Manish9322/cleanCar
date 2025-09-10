import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact.model';

// GET all contact messages
export async function GET() {
  try {
    await connectDB();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch messages", error: error.message }, { status: 500 });
  }
}

// POST a new contact message
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newContact = new Contact(body);
    await newContact.save();
    return NextResponse.json({ success: true, data: newContact, message: "Message sent successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to send message", error: error.message }, { status: 400 });
  }
}

// DELETE a contact message
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, message: "Contact ID is required" }, { status: 400 });
    }
    
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return NextResponse.json({ success: false, message: "Contact message not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete message", error: error.message }, { status: 500 });
  }
}
