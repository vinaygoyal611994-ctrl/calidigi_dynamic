import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authMiddleware'

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const headers = [
    'title', 'company_name', 'email', 'phone', 'web', 'link', 'logo',
    'address', 'address_new', 'city', 'state', 'zip_code', 'country', 'county',
    'lat', 'lon', 'about', 'rating', 'review', 'claimed', 'yelp_url',
    'hours_of_operation', 'hours_of_ops', 'founding_date', 'noe',
    'skor', 'sent', 'filename', 'zips_id', 'updates', 'web_scan',
  ]

  const sample = [
    'Joe\'s Pizza', 'Joe\'s Pizza LLC', 'joe@joespizza.com', '(415) 555-0101',
    'https://joespizza.com', 'https://yelp.com/biz/joes-pizza', '',
    '123 Main St', '123 Main Street', 'San Francisco', 'CA', '94102', 'US', 'San Francisco',
    '37.7749', '-122.4194', 'Best pizza in San Francisco since 1985.',
    '4.5', '128', '1', 'https://yelp.com/biz/joes-pizza',
    'Mon-Fri 11am-10pm', 'Mon-Fri 11am-10pm', '1985', '12',
    '85', '0', '', '', '0', '0',
  ]

  const csv = [headers.join(','), sample.map(v => `"${v}"`).join(',')].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="businesses_sample.csv"',
    },
  })
}
