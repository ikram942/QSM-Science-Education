import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import QuizResult from '@/models/QuizResult';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const result = await QuizResult.create(data);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json({ success: false, error: 'Failed to save result' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const results = await QuizResult.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: results }, { status: 200 });
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch results' }, { status: 500 });
  }
}
