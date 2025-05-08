import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
    try {
      const pool = await getConnection()
      
      const result = await pool.request().query('SELECT * FROM Supplier')
  
      return NextResponse.json(result.recordset)
    } catch (err) {
      console.error('Query error:', err)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  }