'use server'

import {signOut} from '@/app/auth';

export default async function mylogout() {
    await signOut ({redirectTo:"/login"}); 
}