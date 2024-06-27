import { useEffect, useState } from "react";
import horde from '../assets/icon/horde_icon.png';

interface GuildStatus {
    howManyOfficers: string;
    howManyMembers: string;
    faction: string;
}

export function GuildStatus() {
    const [GuildStatus, setGuildStatus] = useState<GuildStatus[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/guildStatus", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setGuildStatus(data)
        })
        .catch((err) => console.log(err))
      }, [])

    if (GuildStatus && GuildStatus.length > 0) {
        return (
            <div>
            <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                Information - Guild Status
            </h1>
            <div className="h-px bg-pink-100"></div>
        
            <h3 className="text-pink-200 text-md py-6 px-20">
                <span className='inline-flex items-center gap-2'>
                <p>Faction: {GuildStatus[0].faction}</p>
                <img src={horde} className="size-10" alt="" />
                </span>
                <p className="my-1">Active members: {GuildStatus[0].howManyMembers}</p>
                <p className="my-1">Active officers: {GuildStatus[0].howManyOfficers}</p>
            </h3>
            </div>
        );
        } else {
        // Handle the case when GuildStatus is empty or undefined
        return (
            <div>
            <h1 className="flex justify-center items-center text-pink-300 text-[26px] font-semibold py-6 px-20">
                Information - Guild Status
            </h1>
            <div className="h-px bg-pink-100"></div>
        
            <h3 className="text-pink-200 md:text-[20px] sm:text-[18px] text-[16px] md:py-6 md:px-20 py-3 px-8">
                Guild status not available
            </h3>
            </div>
        );
    }
    
}