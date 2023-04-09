// I honestly don't know if this is necessary but I'll keep it just for the sake of doing it
// I'll have to make more componets, format them and just render them there
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

function Body() {
    let textKey = useRef(0);
    const navigate = useNavigate();
    return(
        <div className='grid grid-rows-1 justify-items-center roll-out'>
            <h2 key={Math.random()} className="homeText roll-out">TEST YOUR MANGA SKILLS LIKE NEVER BEFORE</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/mangaguesser.appspot.com/o/narutosasuke.png?alt=media&token=ec9dbd36-7db6-426d-9249-57ef43f23cc9" alt="mangaguesser"
            className="rounded-xl shadow-xl max-w-[360px] sm:max-w-[480px] pt-6" />
            <div className='pt-2'>
                <div className="flex flex-col space-x-4 items-center justify-center roll-out">
                    <button className="align bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full justify-center" onClick={(e) => navigate("/play")}>Play Now!</button>
                </div>
            </div>

        </div>
    );
}

export default Body;