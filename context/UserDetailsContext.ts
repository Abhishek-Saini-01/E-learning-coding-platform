import { createContext } from "react";

export const UserDetailsContext = createContext<any>({
    userDetails: undefined,
    setUserDetails: () => { }
})