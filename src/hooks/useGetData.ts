import { useEffect, useState } from "react"
import axios from 'axios'

const useGetData = <T = any> (initialUrl: string|null = null) => {
	const [data, setData] = useState<T|null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [url, changeUrl] = useState<string | null>(initialUrl)
	
	const execute = () => {
		if (!url) {
			return
		}

		getData(url)
	}

	const getData = async (resourceUrl: string) => {

		setData(null)
		setError(null)
		setLoading(true)
		
		
		try {
			const res = await axios.get<T>(resourceUrl)
			await new Promise(r => setTimeout(r, 3000))
			setData(res.data)			

		} catch (err: any) {
			setError(err.message)
		}
		setLoading(false)
	}

	useEffect(() => {
		if (!url) {
			return
		}

		getData(url)
	}, [url])

	return {
		changeUrl,
		data,
		error,
        execute,
        loading
	}
}

export default useGetData
