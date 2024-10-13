import CredentialsProvider from "next-auth/providers/credentials";

const options = {
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label: "Username", type: "text"},
                password:{label: "Password", type: "password"}
            },
            async authorize(credentials,req){

                const dummyUser = {id:1, name: "admin", password: "admin2024"}

                const response = await fetch(
                    `http://localhost:8000/api/auth/login?username=${credentials.username}&password=${credentials.password}`,
                    {
                        method:"POST"
                    }
                )
                if(!response.ok){
                    return null
                }

                const body = await response.json()
                console.log(body)
                return {
                    name: body.username
                };
                
            },
            pages: {
                signIn: '/signin',
                // signOut: '/auth/signout',
                // error: '/auth/error', // Error code passed in query string as ?error=
                // verifyRequest: '/auth/verify-request', // (used for check email message)
                // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
              }
        })
    ],

}

export default options;