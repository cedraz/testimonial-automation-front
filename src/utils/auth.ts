'use server'
import { cookies } from "next/headers"

export type Auth = {
    access_token: string
    refresh_token: string
    access_token_expires_in?: Date
    refresh_token_expires_in?: Date
}

const api_url = process.env.API_URL
const origin_url = process.env.ORIGIN_URL

export async function auth(): Promise<Auth | false> {
    const cookiesStore = cookies()

    const access_token = cookiesStore.get('access_token')?.value
    const refresh_token = cookiesStore.get('refresh_token')?.value

    // console.log(refresh_token);
    

    if (!access_token || !refresh_token) {
        console.log('chegou aqui');
        
        const data = await refresh()

        if (!data) {
            return false
        }

        return data
    }

    return {
        access_token,
        refresh_token,
    }
}

async function refresh(): Promise<Auth | false> {
    const cookieStore = cookies()

    console.log(cookieStore.get('refresh_token'));
    
    const response = await fetch(`${api_url}/auth/refresh`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-Host': origin_url ? origin_url : 'http://localhost:3000',
        },
        credentials: 'include'
    })
    
    const teste = await response.json()

    console.log(response.headers);
    

    if (!response.ok) {
        return false
    }

    const data: Auth = await response.json()

    cookieStore.set({
        name: 'access_token',
        value: data.access_token,
        path: '/',
        httpOnly: true,
        secure: true,
        expires: data.access_token_expires_in
    })
    cookieStore.set({
        name: 'refresh_token',
        value: data.refresh_token,
        path: '/',
        httpOnly: true,
        secure: true,
        expires: data.refresh_token_expires_in
    })

    return data
}

export async function logout() {
    const cookiesStore = cookies()

    cookiesStore.delete('access_token')
    cookiesStore.delete('refresh_token')
}