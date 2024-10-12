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
        })
    ],

}

export default options;