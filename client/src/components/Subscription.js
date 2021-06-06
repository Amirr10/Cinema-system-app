import React from 'react'
import { getSubscriptions } from '../utils/utils'
import { useState, useEffect } from 'react'

export default function Subscription() {

const [subs, setSubs] = useState('')

useEffect(() => {

    const getData = async () => {
        let resp = await getSubscriptions()
        setSubs(resp.data)
    }
    getData()
}, [])

    return (
        <div>
            <h1>Movies - Subscription Website</h1>

            { subs && subs.map(sub => {
                    return <div>Member ID: {sub.memberId}</div>
                })
            }
        </div>
    )
}
