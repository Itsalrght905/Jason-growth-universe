export const defaults={selectedAge:'7',difficulty:'普通',sessionLength:'10',trainingFocus:'综合训练',totalStars:0,todayStars:0,todayDate:'',dailyStreak:0,completedSessions:0,lastCompletedDate:'',badges:[],readStoryIds:[],favoriteStoryIds:[],recentStoryIds:[],storyCategoryCounts:{},heardStoriesTotal:0,lastStoryDate:'',answerHistory:[],parentPin:'1234',growthFootprints:[]}
function parse(raw,fallback){try{return JSON.parse(raw)}catch{return fallback}}
export function load(){const data={};for(const [k,v] of Object.entries(defaults)){const raw=localStorage.getItem(k);if(raw===null){data[k]=v;continue}data[k]=typeof v==='number'?Number(raw):typeof v==='object'?parse(raw,v):raw}const today=new Date().toLocaleDateString('en-CA');if(data.todayDate!==today)data.todayStars=0;return data}
export function save(data){Object.entries(data).forEach(([k,v])=>localStorage.setItem(k,typeof v==='object'?JSON.stringify(v):String(v)))}
export function reset(){Object.keys(defaults).forEach(k=>localStorage.removeItem(k));return {...defaults}}

export function exportProgress(){return JSON.stringify(load(),null,2)}
export function importProgress(text){const parsed=JSON.parse(text);const safe={...defaults,...parsed};save(safe);return safe}

export function recordStory(state,story){const today=new Date().toLocaleDateString('en-CA');const isNew=!state.readStoryIds.includes(story.id);const counts={...state.storyCategoryCounts,[story.category]:(state.storyCategoryCounts[story.category]||0)+(isNew?1:0)};return {...state,readStoryIds:[...new Set([...state.readStoryIds,story.id])],recentStoryIds:[story.id,...state.recentStoryIds.filter(id=>id!==story.id)].slice(0,5),storyCategoryCounts:counts,heardStoriesTotal:state.heardStoriesTotal+(isNew?1:0),lastStoryDate:today,growthFootprints:[...state.growthFootprints,{date:today,text:`读完了《${story.title}》`}].slice(-20)} }

export function toggleFavorite(state,id){return {...state,favoriteStoryIds:state.favoriteStoryIds.includes(id)?state.favoriteStoryIds.filter(item=>item!==id):[...state.favoriteStoryIds,id]}}

export function recordAnswer(state,entry){return {...state,answerHistory:[...state.answerHistory,{...entry,at:new Date().toISOString()}].slice(-500)}}
