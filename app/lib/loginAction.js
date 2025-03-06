"use server";

import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";
export async function loginAction(formData) {
    console.log("In loginAction",formData);
    try {
        await signIn("credentials",{
            username:formData.username,
            password:formData.password,
            redirectTo:"/"
        });
    } catch(error) {
        if (error instanceof AuthError){
            console.log(error.type);
            switch(error.type) {
                case "CredentialsSignin":
                    return {error:"Credenciais invalidas"}
                default:
                    return {error:"Erro desconhecido"}
            }
        }
        console.log(error);
        throw(error);
    }
    ;
}