import { NextRequest, NextResponse } from 'next/server'

type CountryCacheEntry = {
    country: string
    timestamp: number
}

const COUNTRY_CACHE_TTL_MS = 24 * 60 * 60 * 1000
const countryCache = new Map<string, CountryCacheEntry>()

function readCountryCache(ip: string) {
    const entry = countryCache.get(ip)

    if (!entry) return null
    if (Date.now() - entry.timestamp > COUNTRY_CACHE_TTL_MS) {
        countryCache.delete(ip)
        return null
    }

    return entry.country
}

function writeCountryCache(ip: string, country: string) {
    countryCache.set(ip, {
        country,
        timestamp: Date.now()
    })
}

export async function GET(request: NextRequest) {
    const ip = request.nextUrl.searchParams.get('ip')

    if (!ip) {
        return NextResponse.json({ error: 'Missing ip parameter' }, { status: 400 })
    }

    const cachedCountry = readCountryCache(ip)
    if (cachedCountry) {
        return NextResponse.json({ country: cachedCountry, cached: true })
    }

    try {
        const response = await fetch(`https://api.ipquery.io/${encodeURIComponent(ip)}?format=json`, {
            headers: {
                Accept: 'application/json'
            },
            next: { revalidate: 86400 }
        })

        if (!response.ok) {
            return NextResponse.json(
                { country: 'Unknown', error: `Upstream status ${response.status}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        const country = data?.location?.country || data?.country || 'Unknown'

        writeCountryCache(ip, country)

        return NextResponse.json({ country })
    } catch (error) {
        console.error('IP country lookup failed:', error)
        return NextResponse.json({ country: 'Unknown' }, { status: 200 })
    }
}
