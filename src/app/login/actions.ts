'use server'

import { z } from "zod"
import { loginFormSchema } from "./page"
import { cookies } from "next/headers"

const api_url = process.env.API_URL

export async function login(loginFormData: z.infer<typeof loginFormSchema>) {
    const cookieStore = cookies()

    console.log({
        cookieStore
    })

    const response = await fetch(`${api_url}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(loginFormData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    if (!response.ok) {
        return false
    }
    
    return data
}