import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const tasks = await EnterpriseRepository.getCrewTasks();
    const broadcasts = await EnterpriseRepository.getEmergencyBroadcasts();
    return NextResponse.json({ success: true, tasks, broadcasts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch crew operational data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { taskId, status, supervisorSignOff, supervisorName } = body;

    if (!taskId || !status) {
      return NextResponse.json({ success: false, error: 'taskId and status are required' }, { status: 400 });
    }

    const updatedTask = await EnterpriseRepository.updateCrewTask(taskId, status, supervisorSignOff, supervisorName);

    if (!updatedTask) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      task: updatedTask,
      message: 'Crew task status updated and synced across all mobile operational feeds.',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update crew task' }, { status: 500 });
  }
}
