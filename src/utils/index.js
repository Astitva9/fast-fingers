import { callApi } from "./utilityFunctions";
import {
  APIGetNewWord,
  APIStoreUserScore,
  APIGetUserScore,
  APIVerifyUserToken
} from './APIUrls'

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
