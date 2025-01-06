import { UserType } from "./app/lib/definitions";
import type { User } from "next-auth";
import md5 from 'md5';
import { mssql } from "./app/lib/db";
import { z } from "zod";

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface User {
        username: string;
        nivel: number;
    }
}

-


async function getUser (username: string): Promise<UserType | undefined> {
    try {
        const myreq = `select 
             Ds_LoginAcessoUsuarioSistemaReuniao as username, 
             Nm_UsuarioSistemaReuniao as nome, 
             Nr_SenhaAcessoUsuarioSistemaReuniao as password ,
             Cd_NivelUsuarioSistema as nivel ,
             Cd_UsuarioSistemaReuniao as cpf
            from REUNIAO_T3100_UsuarioSistemaReuniao
            where Ds_LoginAcessoUsuarioSistemaReuniao = '${username}'`;
        const user  = await mssql(myreq) as UserType[];
        console.log ( "DBG: [", Date(),"] auth, getUser, db answer", user);
        if (user.length > 0) {return user[0]} else {throw new Error("No user");};
    } catch(error) {
        console.log ( "DBG: [", Date(),"] auth, getUser, Usuario nao existente", error);      
        throw new Error('Failed to fetch User');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    debug:true,
    providers: [
        Credentials({
            credentials: {usuario:{}, password:{}},
            async authorize (credentials) {
                const parsedCredentials = z
                    .object({usuario: z.string().min(4), password: z.string().min(6)})
                    .safeParse(credentials);

                if(parsedCredentials.success) {
                    const { password, usuario } = parsedCredentials.data;
                    const user = await getUser (usuario);
                    console.log ( "DBG: [", Date(),"] auth.ts NextAuth",user);
                    if (!user) return null;
                    const passwordsMatch = (md5(password).substr(0, 20) === user.password);
                    if (passwordsMatch) {
                        const niv = user.nivel;
                        const uname = user.username;
                        const myuser : User = {nivel: niv , username: uname};
                        console.log ( "DBG: [", Date(),"] auth.config, NextAuth, myuser=",myuser);                        
                        return (myuser) ;
                    }
                }
                console.log ( "DBG: [", Date(),"] auth.config, authConfig, final Credenciais invalidos");
                return null;
        }})],
});

