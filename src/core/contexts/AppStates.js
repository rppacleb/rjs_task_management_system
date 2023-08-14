import { useState } from "react"

export const AppStates = () => {
    const [prefetch, setPrefetch] = useState(false)
    const [db, setDb] = useState([])
    const [session, setSession] = useState(null)

    return {
        prefetch: {data: prefetch, set: setPrefetch},
        __DB: {data: db, set: setDb},
        __SESSION: {data: session, set: setSession},
    }
}