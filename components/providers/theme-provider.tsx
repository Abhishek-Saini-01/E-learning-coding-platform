"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useUser } from "@clerk/nextjs"
import axios from "axios";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Header from "@/app/_components/Header";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const { user } = useUser();
    const [userDetails, setUserDetails] = React.useState();
    React.useEffect(() => {
        const createNewUser = async () => {
            const result = await axios.post('/api/user', {});
            console.log(result.data);
            setUserDetails(result.data);
        }

        user && createNewUser();

    }, [user])
    return (
        <NextThemesProvider {...props}>
            <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
                <div className="flex flex-col items-center">
                    <Header />
                </div>
                {children}
            </UserDetailsContext.Provider>
        </NextThemesProvider>
    )
}