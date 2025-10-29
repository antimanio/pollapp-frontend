import { jwtDecode } from "jwt-decode";

export const getUsername = (token: string) => {
    if(token) {
      try {
        return jwtDecode(token)?.sub;
      } catch (error) {
        console.error("Failed to get username");
      }
    }
}