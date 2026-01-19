import { NextResponse } from 'next/server'
import { Client, Environment } from 'square'

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox
})

export async function POST(request: Request) {
  try {
    const { sourceId, amount } = await request.json()

    const response = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(amount),
        currency: 'USD'
      },
      locationId: process.env.SQUARE_LOCATION_ID!
    })

    return NextResponse.json({ success: true, payment: response.result.payment })
  } catch (error: any) {
    console.error('Payment error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
