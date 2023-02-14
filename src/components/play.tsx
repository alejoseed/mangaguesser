import {
  useState,
  useEffect,
  useCallback,
} from "react";
import React from "react";
import NavBar from "./navBar";
import axios from "axios";
import HandleColors from "./SortColors";

export interface Root {
  result: string
  response: string
  data: Data
}
export interface Data {
  attributes: Attributes
}
export interface Attributes {
  title: Title
  altTitles: AltTitle[]
}
export interface AltTitle {
  ja?: string
  "ja-ro"?: string
}
export interface Title {
  en: string
}
export interface Chapter {
  hash: string
  data: string[]
  dataSaver: string[]
}
export interface playColors {
  colorOne: string
  colorTwo: string
  colorThree: string
  colorFour: string
}
let corsProxy = "https://black-fog-8967.fly.dev/";

let ImageParams = {
  correctNum: 0,
  mangaId : "",
  mangaName : "",
  atHome : corsProxy + "https://api.mangadex.org/at-home/server/",
  imageUrl : "",
  chapterId : "",
}

let correctNum : number = 0;

// call the api to get the manga title
const CallAPI = async () => {

  const mangadex =  corsProxy + "https://api.mangadex.org/manga/random?contentRating%5B%5D=safe&contentRating%5B%5D=suggestive"
  + "&contentRating%5B%5D=erotica&contentRating%5B%5D=pornographic&includedTagsMode=AND&excludedTagsMode=OR";
  const params = new URLSearchParams();
  params.append('contentRating[]', 'safe');
  params.append('contentRating[]', 'suggestive');
  params.append('contentRating[]', 'erotica');
  params.append('includedTagsMode', 'AND');
  params.append('excludedTagsMode', 'OR');
  correctNum = randomNumber();
  const mangaNames : string[] = ["","","",""];
  const apiCalls = [];
  
  for (let i = 0; i < 4; i++) {
    if (i !== correctNum) {
      apiCalls.push(
        axios.get(mangadex, {
          params: params,
          headers: {
              'X-Requested-With': 'application/xml'
          }
          }
          )
          .then((res) => {
            mangaNames[i] = res.data.data.attributes.title.en;
          })
          .catch((err) => {
            console.log(err);
          })
      );
    } else {
      apiCalls.push(
        axios.get(mangadex, {
          params: params,
          headers: {
              'X-Requested-With': 'application/xml'
          }
          }
          )
          .then((res) => {
            mangaNames[correctNum] = res.data.data.attributes.title.en;
            ImageParams.mangaId = res.data.data.id;
            ImageParams.mangaName = res.data.data.attributes.title.en;
            ImageParams.correctNum = correctNum;
          })
          .catch((err) => {
            console.log(err);
          })
      );
    }
  }
  console.log(mangaNames)
  await Promise.all(apiCalls);
  return mangaNames;
};

function randomNumber() {
  let random : number = 0;
  random = Math.floor(Math.random() * 4) ;
  return random;
}

function HandleAnswer(answer : number, manga : number) {
  if (answer === manga) {
    alert("correct");
    // reload the page
    window.location.reload();
  }
  else {
    alert("incorrect");
  }
}

async function GetImage() {
  try {
    const res1 = await axios.get(corsProxy + "https://api.mangadex.org/manga/" + ImageParams.mangaId + "/feed", {
      headers: {
          'X-Requested-With': 'application/xml'
      }
      }
      );
    if (res1.data.data.length === 0) {
      // change the correct answer to the next manga
      correctNum = randomNumber();
      console.log("No chapters found");
      // in this case reload the page
      window.location.reload();
      return;
    }

    ImageParams.chapterId = res1.data.data[Math.floor(Math.random() * res1.data.data.length)].id;
    console.log(ImageParams.chapterId);

    const res2 = await axios.get(corsProxy + ImageParams.atHome + ImageParams.chapterId, {
      headers: {
          'X-Requested-With': 'application/xml'
          }
        });
    
    ImageParams.imageUrl += res2.data.baseUrl + "/data-saver/" + res2.data.chapter.hash + "/" + res2.data.chapter.dataSaver[Math.floor(Math.random() * res2.data.chapter.dataSaver.length)];
  } catch (error) {
    console.log(error);
  }
}

function PlayGame(){
  const [isLoading, setIsLoading] = useState(true);
  const [allColors, setAllColors] = useState({
    colorOne: "",
    colorTwo: "",
    colorThree: "",
    colorFour: "",
  });
  const [mangaImageUrl, setMangaImageUrl] = useState("");

  const [manga, setManga] = useState({
    mangaOne: "",
    mangaTwo: "",
    mangaThree: "",
    mangaFour: "",
  });

  const handleManga = useCallback(
    (res: any[]) => {
      setManga({
        mangaOne: res[0],
        mangaTwo: res[1],
        mangaThree: res[2],
        mangaFour: res[3],
      });
    },
    [setManga]
  );
  
  const handleImage = useCallback(
    (res: string) => {
      setMangaImageUrl(res);
    },
    [setMangaImageUrl]
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await CallAPI();
      handleManga(res);
      await GetImage();
      handleImage(ImageParams.imageUrl);
      setIsLoading(false); // set isLoading to false when all the data has been fetched
    };
    fetchData();
  }, [handleManga, handleImage]);

  useEffect(() => {
    HandleColors(setAllColors);
  }, [HandleColors]);
  
  if (isLoading) {
    return <div>
      <NavBar />
      <div className="flex flex-row items-center justify-center h-screen">
        <img src="https://media.tenor.com/LaQN0TCpdawAAAAC/deku-mha.gif"></img>
      </div>
      <div>Loading</div>
    </div>
  }

  return ( 
    <div>
      <NavBar />
      <div className="flex flex-row space-x-4 items-center justify-center pt-4">
        <img className="rounded-xl shadow-xl max-w-full max-h-full md:w-[350px] md:h-[550px] scale-75 md:scale-100" src={mangaImageUrl} alt="NO MANGA FOUND"/>
        <div>{}</div>
      </div>

        <div className="flex flex-row space-x-3 pt-3">
          <button className="buttonManga w-full" onClick={() => HandleAnswer(correctNum, 0)} style={{ backgroundColor: allColors.colorOne }}>{manga.mangaOne}</button>
          <button className="buttonManga w-full" onClick={() => HandleAnswer(correctNum, 1)} style={{ backgroundColor: allColors.colorTwo }}>{manga.mangaTwo}</button>
        </div>
        <div className="flex flex-row space-x-3 pt-3">
          <button className="buttonManga w-full" onClick={() => HandleAnswer(correctNum, 2)} style={{ backgroundColor: allColors.colorThree }}>{manga.mangaThree}</button>
          <button className="buttonManga w-full" onClick={() => HandleAnswer(correctNum, 3)} style={{ backgroundColor: allColors.colorFour }}>{manga.mangaFour}</button>
        </div>
      </div>
  );
}

export default PlayGame;
