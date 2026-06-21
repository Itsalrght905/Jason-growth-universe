import {useState} from 'react'
import Layout from './components/Layout'
import Home from './components/Home'
import DailyTraining from './components/DailyTraining'
import BrainGames from './components/BrainGames'
import MathPlanet from './components/MathPlanet'
import EnglishWorld from './components/EnglishWorld'
import ReadingCastle from './components/ReadingCastle'
import LifeClassroom from './components/LifeClassroom'
import ParentSettings from './components/ParentSettings'
import PlanetMap from './components/PlanetMap'
import StoryHouse from './components/StoryHouse'
import GrowthPage from './components/GrowthPage'
import JokeCorner from './components/JokeCorner'
import {addCustomJoke,load,recordAnswer,recordJoke,recordStory,reset,save,toggleFavorite,toggleJokeFavorite} from './utils/storage'
import {finishSession} from './utils/rewards'

export default function App(){
  const [page,setPage]=useState('home')
  const [state,setState]=useState(load)
  function update(next){setState(next);save(next)}
  function navigate(next){setPage(next);window.scrollTo({top:0,behavior:'smooth'})}
  function complete(score,total,focus=state.trainingFocus){const base=load();const next=finishSession(base,score,total,focus);const today=new Date().toLocaleDateString('en-CA');const saved={...next,todayDate:today,todayStars:next.todayStars+next.earned,growthFootprints:[...next.growthFootprints,{date:today,text:'完成了今天的学习任务'}].slice(-20)};update(saved);return saved}
  function readStory(story){const next=recordStory(load(),story);const today=new Date().toLocaleDateString('en-CA');update({...next,todayDate:today,totalStars:next.totalStars+3,todayStars:next.todayStars+3});navigate('story')}
  function record(entry){setState(current=>{const next=recordAnswer(current,entry);save(next);return next})}
  function viewJoke(joke,options){const next=recordJoke(load(),joke,options);update(next)}
  let content
  if(page==='home')content=<Home state={state} navigate={navigate} onViewJoke={viewJoke}/>
  else if(page==='today')content=<DailyTraining state={state} onComplete={complete} onHome={()=>navigate('home')} onRecord={record}/>
  else if(page==='brain')content=<BrainGames age={state.selectedAge}/>
  else if(page==='math')content=<MathPlanet state={state} onComplete={(score,total)=>complete(score,total,'数学')} onHome={()=>navigate('home')} onRecord={record}/>
  else if(page==='english')content=<EnglishWorld age={state.selectedAge} navigate={navigate}/>
  else if(page==='reading')content=<ReadingCastle age={state.selectedAge}/>
  else if(page==='life')content=<LifeClassroom/>
  else if(page==='story')content=<StoryHouse state={state} onRead={readStory} onFavorite={id=>update(toggleFavorite(state,id))}/>
  else if(page==='jokes')content=<JokeCorner state={state} age={state.selectedAge} onView={viewJoke} onFavorite={id=>update(toggleJokeFavorite(state,id))} onCreate={text=>update(addCustomJoke(state,text))}/>
  else if(page==='growth')content=<GrowthPage state={state}/>
  else if(page==='map')content=<PlanetMap age={state.selectedAge} navigate={navigate}/>
  else content=<ParentSettings state={state} onUpdate={update} onSave={form=>{update({...state,...form});navigate('home')}} onReset={()=>{const fresh=reset();setState(fresh);navigate('home')}}/>
  return <Layout page={page} navigate={navigate}>{content}</Layout>
}
