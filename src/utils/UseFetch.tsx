import { useEffect, useState } from 'react'

export const UseFetch = () => {
    const [data, setData] = useState<any>()

    const [fetchFn] = useState(() =>
        fetch('http://localhost:3030')
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
