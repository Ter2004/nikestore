import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/app/ีutils/db';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // ค้นหา User จากฐานข้อมูล
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'User not registered' }, { status: 401 });
  }

  // ตรวจสอบ Password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // ส่ง Role กลับไป (user หรือ admin)
  return NextResponse.json({
    message: 'Login successful',
    role: user.role,
  });
}
