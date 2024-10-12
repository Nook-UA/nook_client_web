import CredentialsProvider from "next-auth/providers/credentials";

const options = {
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials:{
                username:{label: "Username", type: "text"},
                password:{label: "Password", type: "password"}
            },
            async authorize(credentials,req){

                const dummyUser = {id:1, name: "admin", password: "admin2024"}

                if (credentials?.username === dummyUser.name && credentials?.password === dummyUser.password){
                    return dummyUser
                }else{
                    return null
                }
            }
        })
    ],

}

export default options;