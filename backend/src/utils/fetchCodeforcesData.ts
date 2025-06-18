import axios from "axios";

export interface CodeforcesUserData {
  rating: number;
  maxRating: number;
}

export async function fetchCodeforcesUserData(handle: string): Promise<{ rating: number, maxRating: number } | null> {
  try {
    const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`)
    const user = res.data.result[0]
    return {
      rating: user.rating || 0,
      maxRating: user.maxRating || 0
    }
  } catch (error) {
    console.error("Failed to fetch CF data:", error)
    return null
  }
}

