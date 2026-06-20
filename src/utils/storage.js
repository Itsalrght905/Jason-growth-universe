export const defaults={selectedAge:'7',difficulty:'普通',sessionLength:'10',trainingFocus:'综合训练',totalStars:0,dailyStreak:0,completedSessions:0,lastCompletedDate:'',badges:[]}
export function load(){const data={};for(const [k,v] of Object.entries(defaults)){const raw=localStorage.getItem(k);data[k]=raw===null?v:typeof v==='number'?Number(raw):Array.isArray(v)?JSON.parse(raw):raw}return data}
export function save(data){Object.entries(data).forEach(([k,v])=>localStorage.setItem(k,Array.isArray(v)?JSON.stringify(v):String(v)))}
export function reset(){Object.keys(defaults).forEach(k=>localStorage.removeItem(k));return {...defaults}}
