import {jwtDecode} from "jwt-decode";

export const getUsername = (token: string) => {
    if(!token) return undefined

    const raw = token.trim();
    const cleaned = raw.replace(/^"(.*)"$/, "$1");

    if (cleaned.startsWith("{")) {
        try {
            const obj = JSON.parse(cleaned);
            console.warn("Server returned JSON instead of a token:", obj);
        } catch {
            console.warn("Received non-JWT token-like string:", cleaned);
        }
        return undefined;
    }

    if (cleaned.split(".").length !== 3) {
        console.warn("Token does not look like a JWT:", cleaned);
        return undefined;
    }


    try {
        const decoded: any = jwtDecode(cleaned);
        return decoded?.sub ?? decoded?.username;
    } catch (error) {
        console.error("Failed to get username");
        return undefined;
    }
}

export interface Vote {
  id: number;
  publishedAt: string;
}

export interface VoteOption {
  id: number;
  caption: string;
  presentationOrder: number;
  vote: Vote[];
}

export interface Poll {
  id: number;
  question: string;
  publishedAt: string;
  validUntil: string;
  voteoption: VoteOption[];
}
