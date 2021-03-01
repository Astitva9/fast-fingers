import { callApi } from "./utilityFunctions";
import {
  APIGetNewWord,
  APIStoreUserScore,
  APIGetUserScore,
  APIVerifyUserToken
} from './APIUrls'
import { MEDIUM, HARD,EASY } from "../constants";


export const getWordFromDictionary = async(minWordLength, maxWordLength) => {
 try{

  var config = {
    method: 'get',
    url: `${APIGetNewWord}${minWordLength}/${maxWordLength}`,
    headers: { 
      'Authorization': `Bearer ${localStorage.token}`
    }
  };
  
  const result = await callApi(config);

  if(result.status === 200){
    return result.data.newWord.toUpperCase();
  }

 }catch (err){
   console.error(`getWordFromDictionary Error: ${err}`)
 }
};

export const storeFinalUserScore = async(userId, finalScore) => {
  try{
 
   var config = {
     method: 'put',
     url: `${APIStoreUserScore}${userId}/${finalScore}`,
     headers: { 
       'Authorization': `Bearer ${localStorage.token}`
     }
   };
   
   const result = await callApi(config);
 
   if(result.status === 200){
     return true;
   }
 
  }catch (err){
    console.error(`storeFinalUserScore Error: ${err}`)
  }

 };

export const getAllFinalScore = async(userId) => {
  try{
 
   var config = {
     method: 'get',
     url: `${APIGetUserScore}${userId}`,
     headers: { 
       'Authorization': `Bearer ${localStorage.token}`
     }
   };
   
   const result = await callApi(config);
 
   if(result.status === 200){
     return result.data.message;
   }
 
  }catch (err){
    console.error(`storeFinalUserScore Error: ${err}`)
  }
};

export const verifyUserToken = async() => {
  try{
 
   var config = {
     method: 'get',
     url: `${APIVerifyUserToken}`,
     headers: { 
       'Authorization': `Bearer ${localStorage.token}`
     }
   };
   
   const result = await callApi(config);
 
   return result.status === 200;
 
  }catch (err){
    console.error(`verifyUserToken Error: ${err}`)
  }
};

export const formatTimeLeft = (time) =>{
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
export const getNewWordAndTime = async(difficultyFactor) =>{
  let newWord = null;
  let timeForWord = 0;
  if (localStorage.difficultyLevel === MEDIUM.VALUE) {
    newWord = await getWordFromDictionary(5,8);
    timeForWord = Math.round(newWord.length / difficultyFactor);
  } else if (localStorage.difficultyLevel === HARD.VALUE) {
    newWord = await getWordFromDictionary(8,25);
    timeForWord = Math.round(newWord.length / difficultyFactor);
  } else {
    newWord = await getWordFromDictionary(2,5);
    timeForWord = Math.round(newWord.length / difficultyFactor);
  }

  return {
    newWord,
    timeForWord
  }
}

export const getLevel = async(_difficultyFactor)=>{
  let level;
  if (_difficultyFactor >= EASY.DIFFICULTY_FACTOR && _difficultyFactor < MEDIUM.DIFFICULTY_FACTOR) level = EASY.VALUE;
  else if (_difficultyFactor >= MEDIUM.DIFFICULTY_FACTOR && _difficultyFactor < HARD.DIFFICULTY_FACTOR)
    level = MEDIUM.VALUE;
  else level = HARD.DIFFICULTY_FACTOR;

  return level;
}

export const setGameDifficultyFactor = async(setDifficultyFactor) => {
  if (localStorage.difficultyLevel === MEDIUM.VALUE) {
    setDifficultyFactor(MEDIUM.DIFFICULTY_FACTOR);
  } else if (localStorage.difficultyLevel === HARD.VALUE) {
    setDifficultyFactor(HARD.DIFFICULTY_FACTOR);
  } else {
    setDifficultyFactor(EASY.DIFFICULTY_FACTOR);
  }
}
