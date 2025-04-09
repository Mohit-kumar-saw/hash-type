import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    // Here you would typically save the data to a database
    // For demonstration, we'll just log it
    console.log('Test results:', data);

    // Respond with success
    return NextResponse.json({ success: true, message: 'Test results saved successfully.' });
  } catch (error) {
    console.error('Error saving test results:', error);
    return NextResponse.json({ success: false, message: 'Failed to save test results.' }, { status: 500 });
  }
} 