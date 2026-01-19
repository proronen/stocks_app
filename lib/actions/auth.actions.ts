'use server';

import { auth } from '@/lib/auth';
import { inngest } from '../inngest/client';
import { headers } from 'next/headers';

export const sigInWithEmail = async ({email, password}: SignUpFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email, password
            }
        })

        if(response) {
            return {success: true, data: response};
        }
    } catch(err) {
        console.error('sign in failed', err);
        return {success: false, error: 'Sign in failed'}
    }
}

export const signUpWithEmail = async ({email, password, fullName, country, investmentGoals, preferredIndustry, riskTolerance}: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email, password, name: fullName
            }
        })

        if(response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    preferredIndustry,
                    riskTolerance
                }
            })

            return {success: true, data: response};
        }
    } catch(err) {
        console.error('sign up failed', err);
        return {success: false, error: 'Sign up failed'}
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers()});
    } catch (error) {
        console.log('Sign out failed', error);
        return { success: false, error: 'Sign out failed'};
    }
}