import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { mylog } from '@/app/lib/mylogger';
import { getUser } from '@/app/lib/data.ts';
import md5 from "md5";


export const {  auth,
                signIn,
                signOut,
                handlers:{GET,POST}
            } = NextAuth({
    providers:[
        Credentials({
            name:"credentials",
            async authorize(credential){
                const password = md5(credential.password).substr(0,20);
                credential.password=password;
                mylog("DBG","app/auth","authorize","credential=",credential);    
                const user = await getUser(credential.username);          
                // const user = {id:100, name:"loos",password:"asdf",role:"admin"};
                mylog("DBG","app/auth","authorize","user=",user);               
                if (
                    credential?.username == user.username && 
                    credential?.password == user.password
                    ){  
                        mylog("DBG","/app/auth","authorize","user=",user);
                        return user;
                    } else return null;
            }
        })
    ],
    secret:process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/logout"

    },
    callbacks:{
        jwt: async({token,user})=>{
            if(user) {
                token.role = user.role;
                token.username = user.username;
            }
            return token;
        },
        session: async({session,token})=>{
            if(session?.user){
                session.user.role = token.role;
                session.user.username = token.username;
            }
        }
    }
})