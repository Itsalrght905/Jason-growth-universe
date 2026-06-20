import {useMemo,useState} from 'react'

const icons=['🦊','🐻','🚀','🌙','🐰','🦕']
const orders={3:[0,1,2,0,2,1],4:[0,1,2,3,1,0,3,2],6:[0,1,2,3,4,5,2,0,5,3,1,4]}
const patterns=[
  {question:'🌟 🌙 🌟 🌙 ？',options:['🌟','🌙','☀️'],answer:'🌟',tip:'星星和月亮轮流出现。'},
  {question:'🔴 🔵 🔵 🔴 🔵 🔵 ？',options:['🔴','🔵','🟡'],answer:'🔴',tip:'规律是一个红色、两个蓝色。'},
]

export default function BrainGames({age}){
  const pairCount=Number(age)<=6?3:Number(age)<=8?4:6
  const pairs=useMemo(()=>orders[pairCount].map(i=>icons[i]),[pairCount])
  const [mode,setMode]=useState('menu')
  const [open,setOpen]=useState([])
  const [done,setDone]=useState([])
  const [feedback,setFeedback]=useState('')
  const [sequenceHidden,setSequenceHidden]=useState(false)
  const [found,setFound]=useState([])
  const pattern=patterns[Number(age)>=9?1:0]

  function start(id){setMode(id);setOpen([]);setDone([]);setFeedback('');setSequenceHidden(false);setFound([])}
  function flip(i){if(open.length===2||open.includes(i)||done.includes(i))return;const next=[...open,i];setOpen(next);if(next.length===2)setTimeout(()=>{if(pairs[next[0]]===pairs[next[1]])setDone(d=>[...d,...next]);setOpen([])},650)}
  function choose(value,answer,success){setFeedback(value===answer?`🎉 ${success}`:'慢慢来，再观察一下吧！')}
  function back(){setMode('menu');setFeedback('')}

  if(mode==='memory')return <section className="game"><p className="eyebrow">记忆翻牌</p><h1>找出所有好朋友</h1><p>现在有 {pairCount} 对卡片，仔细记住它们的位置。</p><div className={`memory-grid pairs-${pairCount}`}>{pairs.map((v,i)=><button key={i} onClick={()=>flip(i)} className={open.includes(i)||done.includes(i)?'flipped':''}>{open.includes(i)||done.includes(i)?v:'⭐'}</button>)}</div>{done.length===pairs.length&&<div className="success">🎉 全部找到啦！脑力小侦探真厉害！</div>}<button className="text-btn" onClick={back}>换一个游戏</button></section>

  if(mode==='sequence')return <section className="game"><p className="eyebrow">顺序记忆</p><h1>{sequenceHidden?'哪个顺序是刚才看到的？':'请记住这个顺序'}</h1>{!sequenceHidden?<><div className="sequence-display">🍎 🐶 🚗</div><button className="big-btn" onClick={()=>setSequenceHidden(true)}>我记住了</button></>:<div className="game-choices">{['🍎 🐶 🚗','🐶 🍎 🚗','🚗 🐶 🍎'].map(v=><button key={v} onClick={()=>choose(v,'🍎 🐶 🚗','顺序完全正确！')}>{v}</button>)}</div>}{feedback&&<div className="success">{feedback}</div>}<button className="text-btn" onClick={back}>换一个游戏</button></section>

  if(mode==='pattern')return <section className="game"><p className="eyebrow">找规律</p><h1>下一个是什么？</h1><div className="sequence-display">{pattern.question}</div><div className="game-choices row">{pattern.options.map(v=><button key={v} onClick={()=>choose(v,pattern.answer,pattern.tip)}>{v}</button>)}</div>{feedback&&<div className="success">{feedback}</div>}<button className="text-btn" onClick={back}>换一个游戏</button></section>

  if(mode==='matching')return <section className="game"><p className="eyebrow">图形配对</p><h1>哪个图形和月亮一样是圆形？</h1><div className="sequence-display">🌕</div><div className="game-choices row">{['⚪','🔺','⬜'].map(v=><button key={v} onClick={()=>choose(v,'⚪','配对成功！它们都是圆形。')}>{v}</button>)}</div>{feedback&&<div className="success">{feedback}</div>}<button className="text-btn" onClick={back}>换一个游戏</button></section>

  if(mode==='attention'){
    const items=['🐱','🐶','🐱','🐰','🐻','🐱','🦊','🐶']
    function findCat(i){if(items[i]!=='🐱'){setFeedback('这不是小猫，再找找！');return}const next=[...new Set([...found,i])];setFound(next);setFeedback(next.length===3?'🎉 三只小猫都找到啦！':'找到一只小猫！')}
    return <section className="game"><p className="eyebrow">注意力挑战</p><h1>找出全部 3 只小猫</h1><div className="attention-grid">{items.map((v,i)=><button key={i} className={found.includes(i)?'found':''} onClick={()=>findCat(i)}>{v}</button>)}</div>{feedback&&<div className="success">{feedback}</div>}<button className="text-btn" onClick={back}>换一个游戏</button></section>
  }

  const games=[['memory','🃏','记忆翻牌','翻开卡片，找出相同图案'],['pattern','🔮','找规律','观察图案，猜猜下一个'],['sequence','🚂','顺序记忆','记住图案出现的顺序'],['matching','🔷','图形配对','找出形状相同的图形'],['attention','🔎','注意力挑战','仔细找出所有目标']]
  return <><div className="page-intro lavender-bg"><span>🧠</span><p className="eyebrow">脑力游戏</p><h1>让小脑袋热热身</h1></div><div className="game-list">{games.map(([id,icon,title,sub])=><button key={id} onClick={()=>start(id)}><span>{icon}</span><div><b>{title}</b><small>{sub}</small></div><i>›</i></button>)}</div></>
}
