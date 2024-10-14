import CredentialsProvider from "next-auth/providers/credentials";

const options = {
    providers: [
        CredentialsProvider({
            id:'credentials',
            name:'credentials',
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password"},
              },
            async authorize(credentials,req){
                console.log("chamei")

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
                return {
                    name: body.username
                };
                
            },
        })
    ],
    pages: {
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    debug:true,

}

export default options;