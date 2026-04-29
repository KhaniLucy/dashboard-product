import { useCallback, useEffect, useState } from "react"

type FetchState<T> = {
data: T | null
isLoading: boolean
error: string | null
retry: () => void
}

export function useFetch<T>(url: string): FetchState<T> {
const [data, setData] = useState<T | null>(null)
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const [attempt, setAttempt] = useState(0)

const retry = useCallback(() => {
setAttempt((prev) => prev + 1)
}, [])

useEffect(() => {
if (!url) return

async function fetchData() {
setIsLoading(true)
setError(null)

try {
const response = await fetch(url)
if (!response.ok) throw new Error("Request failed")
const result: T = await response.json()
setData(result)
} catch (err) {
setError("Something went wrong. Please try again.")
} finally {
setIsLoading(false)
}
}

fetchData()
}, [url, attempt]) // re-runs when url changes or retry is called

return { data, isLoading, error, retry }
}

