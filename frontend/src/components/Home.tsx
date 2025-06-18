import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export interface Result {
    avatar: string;
    city: string;
    contribution: number;
    country: string;
    firstName: string;
    friendOfCount: number;
    handle: string;
    lastName: string;
    lastOnlineTimeSeconds: number;
    maxRank: string;
    maxRating: number;
    organization: string;
    rank: string;
    rating: number;
    registrationTimeSeconds: number;
    titlePhoto: string;
}

function Home() {
    const [data, setData] = useState<Result[]>([]);
    useEffect( ()=> {
        

        const fetchData = async ()=> {
            const res = await axios.get("https://codeforces.com/api/user.info?handles=ksun48");
            setData(res.data.result); // Update to set the 'result' array from the API response
        }  
        fetchData();
        
    },[])
    console.log(data);
    
    return(
        <>
        <h1>Hii sameerr..</h1>
        {data.map((item, key) => (
            <ol key={key}>
                <li>{item.lastName}</li>
                <li>{item.city}</li>
                <li>{item.maxRating}</li>
                <li>{item.rating}</li>
            </ol>
        ))}
        </>
    )
}

export default Home;