import { useEffect, useState } from 'react'
import { ServerBaseURL } from '../ui-v2/PersonCardUI'

export const UseFetch = () => {
    const [data, setData] = useState<any>()

    const [fetchFn] = useState(() =>
        fetch(ServerBaseURL)
            .then((response) => {
                setData(response)
                return 0
            })
            .then((r) => r)
            .catch((e) => {
                alert('Error')
            })
            .finally(() => {
                console.log('fetch end')
            })
    )

    useEffect(() => {}, [])

    return {
        data,
        fetch,
    }
}
