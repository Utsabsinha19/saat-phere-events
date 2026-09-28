import { NextResponse } from 'next/server';
import { BranchRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const branches = await BranchRepository.getAll();
    const totals = await BranchRepository.getTotals();

    return NextResponse.json({
      success: true,
      branches,
      totals,
    });
  } catch (error) {
    console.error('Error fetching branches:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch branch data' },
      { status: 500 }
    );
  }
}
