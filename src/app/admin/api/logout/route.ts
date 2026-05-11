import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  return NextResponse.redirect(new URL('/admin/login', 'https://weartac.com'))
}
