import {useState} from 'react'

export default function QuestionCard({item,onNext,onRecord,index,total}){
  const [picked,setPicked]=useState('')
  const [attempts,setAttempts]=useState(0)
  const right=picked===item.answer
  function choose(value){if(picked)return;setPicked(value);setAttempts(current=>current+1)}
  function finish(correct){onRecord?.({subject:item.subject||subjectKey(item.type),skill:item.skill||item.type||'综合练习',correct,attempts:Math.max(1,attempts)});onNext(correct)}
  const firstTry=!right&&attempts<2
  return <section className="question-wrap"><div className="progress-row"><span>{item.icon} {item.type}</span><b>{index+1} / {total}</b></div><div className="progress"><i style={{width:`${(index+1)/total*100}%`}}/></div><article className="question-card"><div className="question-mascot">{item.icon}</div>{item.skill&&<span className="skill-label">正在练习：{item.skill}</span>}<h2>{item.question}</h2><div className="answers">{item.options.map((value,i)=><button key={value} onClick={()=>choose(value)} disabled={!!picked} className={picked?(value===item.answer&&!firstTry?'correct':value===picked?'wrong':'muted'):''}><span>{String.fromCharCode(65+i)}</span>{value}</button>)}</div>{picked&&<div className={`feedback ${right?'yay':'retry'}`} role="status">{right?<><b>⭐ 太棒啦！你找到答案了</b><p>{item.explanation||`答案是 ${item.answer}。`}</p><button onClick={()=>finish(true)}>{index===total-1?'看看奖励':'下一题'} →</button></>:firstTry?<><b>慢慢来，再想一次</b><p>{item.wrongHint||'看看题目里最重要的词，再试着排除一个不合适的答案。'}</p><button onClick={()=>setPicked('')}>带着提示再试一次</button></>:<><b>这次我们一起把它学会</b><p>正确答案是：<strong>{item.answer}</strong>。{item.explanation||'看懂方法比马上答对更重要。'}</p><div className="parent-tip">👩 陪伴提示：{item.parentTip||'请孩子用自己的话再说一遍思路，不用急着做下一题。'}</div><button onClick={()=>finish(false)}>{index===total-1?'看看今天的成长':'我学会了，下一题'} →</button></>}</div>}</article></section>
}

function subjectKey(type){return {'数学':'math','英文':'english','阅读':'reading','脑力':'brain','生活':'life'}[type]||'brain'}
