export const API_COUNTRIES = 'https://api.first.org/data/v1/countries'

export async function fetchAllCountries(){
  const res = await fetch(API_COUNTRIES)
  if(!res.ok) throw new Error('Failed to fetch')
  const json = await res.json()
  // returns object keyed by code
  return Object.entries(json.data || {}).map(([code, obj]) => ({ code, ...obj }))
}