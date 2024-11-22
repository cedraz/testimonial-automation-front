'use server'

import { z } from "zod";
import { registerFormSchema } from "./register-form";

const api_url = process.env.API_URL
const origin_url = process.env.ORIGIN_URL

export async function register(formData: z.infer<typeof registerFormSchema>) {
    const response = await fetch(`${api_url}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-Host': origin_url ? origin_url : 'localhost:3000',
        },
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        return false
    }

    const data = await response.json()

    return data
}