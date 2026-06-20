import {useState} from 'react'

export default function QuestionCard({item,onNext,index,total}){
  const [picked,setPicked]=useState('')
  const right=picked===item.answer
  function choose(value){if(!picked)setPicked(value)}
  return <section className="question-wrap"><div className="progress-row"><span>{item.icon} {item.type}</span><b>{index+1} / {total}</b></div><div className="progress"><i style={{width:`${(index+1)/total*100}%`}}/></div><article className="question-card"><div className="question-mascot">{item.icon}</div><h2>{item.question}</h2><div className="answers">{item.options.map((value,i)=><button key={value} onClick={()=>choose(value)} disabled={!!picked} className={picked?(value===item.answer?'correct':value===picked?'wrong':'muted'):''}><span>{String.fromCharCode(65+i)}</span>{value}</button>)}</div>{picked&&<div className={`feedback ${right?'yay':'retry'}`} role="status"><b>{right?'太棒啦！你答对啦！':'再试一次也没关系'}</b><p>{right?item.explanation:'你可以再想一想，或先去看看下一题。'}</p>{right?<button onClick={()=>onNext(true)}>{index===total-1?'看看奖励':'下一题'} →</button>:<div className="feedback-actions"><button onClick={()=>setPicked('')}>再试一次</button><button className="secondary" onClick={()=>onNext(false)}>下一题</button></div>}</div>}</article></section>
}
