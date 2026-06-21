import {useMemo,useState} from 'react'
import {fitsJokeAge,getJokeById,jokeCategories,jokes} from '../data/jokes'

export default function JokeCorner({state,age,onView,onFavorite,onCreate}){
  const today=new Date().toLocaleDateString('en-CA')
  const ageJokes=useMemo(()=>jokes.filter(joke=>fitsJokeAge(joke,age)),[age])
  const savedDaily=getJokeById(state.dailyJokeId)
  const daily=state.dailyJokeDate===today&&savedDaily&&fitsJokeAge(savedDaily,age)?savedDaily:ageJokes[dayNumber(today)%ageJokes.length]
  const [currentId,setCurrentId]=useState(daily.id)
  const [category,setCategory]=useState('all')
  const [revealed,setRevealed]=useState(false)
  const [explained,setExplained]=useState(false)
  const [customText,setCustomText]=useState('')
  const current=getJokeById(currentId)||daily
  const filtered=category==='favorites'?ageJokes.filter(joke=>state.favoriteJokes.includes(joke.id)):category==='all'?ageJokes:ageJokes.filter(joke=>joke.category===category)

  function choose(joke){setCurrentId(joke.id);setRevealed(false);setExplained(false);window.scrollTo({top:0,behavior:'smooth'})}
  function showAnswer(){setRevealed(true);onView(current,{daily:current.id===daily.id})}
  function another(){const choices=ageJokes.filter(joke=>joke.id!==current.id);choose(choices[Math.floor(Math.random()*choices.length)])}
  function submit(event){event.preventDefault();const text=customText.trim();if(!text)return;onCreate(text);setCustomText('')}

  return <section className="joke-page joke-icebox-theme"><header className="joke-hero"><div aria-hidden="true">🐧❄️</div><p className="eyebrow">轻松一下，也是在学习</p><h1>冷笑话冰箱</h1><p>打开小冰箱，拿出一个会让你哈哈笑的小笑话。</p></header><article className="daily-joke"><span className="joke-label">🧊 {current.id===daily.id?'今日冷笑话':'再来一个'}</span><button className={`joke-favorite-button ${state.favoriteJokes.includes(current.id)?'saved':''}`} onClick={()=>onFavorite(current.id)} aria-label={state.favoriteJokes.includes(current.id)?'取消收藏笑话':'收藏笑话'}>{state.favoriteJokes.includes(current.id)?'♥':'♡'}</button><h2>{current.setup}</h2>{!revealed?<button className="reveal-joke" onClick={showAnswer}>看答案</button>:<><div className="joke-answer" role="status">😄 {current.punchline}</div><button className="why-button" onClick={()=>setExplained(!explained)}>💡 为什么好笑？</button>{explained&&<div className="joke-explanation"><p>{current.whyFunny}</p><span>语文小发现：{current.languagePoint}</span></div>}<div className="tell-mom">👩 把这个笑话讲给妈妈听，看看妈妈会不会笑。</div><div className="parent-joke-prompt"><b>妈妈可以这样问：</b>{current.parentPrompt}</div></>}<div className="joke-main-actions"><button onClick={another}>🎲 再来一个</button><button onClick={()=>onFavorite(current.id)}>{state.favoriteJokes.includes(current.id)?'取消收藏':'⭐ 收藏笑话'}</button></div></article><section className="joke-stats"><div><b>{state.viewedJokes.length}</b><span>已经看过</span></div><div><b>{state.favoriteJokes.length}</b><span>收藏笑话</span></div><div><b>{state.customJokes.length}</b><span>自己创作</span></div></section><div className="joke-category-grid"><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>🧊 全部</button>{Object.entries(jokeCategories).map(([id,meta])=><button key={id} className={category===id?'active':''} onClick={()=>setCategory(id)}>{meta.icon} {meta.short}</button>)}<button className={category==='favorites'?'active':''} onClick={()=>setCategory('favorites')}>💛 收藏</button></div><section className="joke-list"><h2>{category==='favorites'?'我收藏的笑话':'冰箱里的更多笑话'}</h2>{filtered.length?filtered.slice(0,24).map(joke=><button className="joke-card" key={joke.id} onClick={()=>choose(joke)}><span>{jokeCategories[joke.category].icon}</span><div><small>{jokeCategories[joke.category].label} · {joke.ageRange} 岁</small><b>{joke.setup}</b></div><i>›</i></button>):<p className="empty-state">还没有收藏。遇到喜欢的笑话，点一下小爱心吧。</p>}</section><section className="joke-create-box"><span aria-hidden="true">✏️🐧</span><h2>我也来编一个</h2><p>{current.createPrompt}</p><form onSubmit={submit}><textarea value={customText} onChange={event=>setCustomText(event.target.value)} maxLength={180} placeholder="把你想到的小笑话写在这里……" aria-label="输入自创笑话"/><button type="submit">保存到我的小冰箱</button></form><small>只保存在这台设备上，不会上传到网络。</small>{state.customJokes.length>0&&<div className="custom-jokes"><h3>我的作品</h3>{state.customJokes.slice(0,5).map(joke=><p key={joke.id}>{joke.text}</p>)}</div>}</section></section>
}

function dayNumber(date){return [...date].reduce((sum,char)=>sum+char.charCodeAt(0),0)}
