import { useEffect, useState } from 'react'
import { ServerBaseURL } from '../ui-v2/user-card/PersonCardUI'

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
            .finally(() => {})
    )

    useEffect(() => {}, [])

    return {
        data,
        fetch,
    }
}
