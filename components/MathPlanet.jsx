import {useState} from 'react'
import {generateMath} from '../utils/questionGenerator'
import QuestionCard from './QuestionCard'
import RewardSummary from './RewardSummary'

export default function MathPlanet({state,onComplete,onHome}){
  const [round,setRound]=useState(0)
  const [score,setScore]=useState(0)
  const [question,setQuestion]=useState(()=>generateMath(state.selectedAge,state.difficulty))
  const [result,setResult]=useState(null)
  function next(right){const nextScore=score+(right?1:0);setScore(nextScore);if(round===4)setResult(onComplete(nextScore,5));else{setRound(round+1);setQuestion(generateMath(state.selectedAge,state.difficulty))}}
  if(result)return <RewardSummary score={score} total={5} result={result} onHome={onHome}/>
  return <><div className="page-intro blue-bg"><span>🪐</span><p className="eyebrow">数学星球</p><h1>数字探险开始啦</h1><p>完成 5 道题，就能带着星星回家。</p></div><QuestionCard key={round} item={question} index={round} total={5} onNext={next}/></>
}
