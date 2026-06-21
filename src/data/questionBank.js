const subjectMeta={math:['数学','🪐'],english:['英文','🦊'],reading:['阅读','🏰'],brain:['脑力','🧠'],life:['生活','🏡'],emotion:['情绪','💛']}
const englishWords=[['cat','小猫'],['dog','小狗'],['apple','苹果'],['book','书'],['friend','朋友'],['happy','开心'],['school','学校'],['water','水'],['family','家人'],['help','帮助']]
const lifeScenes=[['过马路前应该先做什么？',['看信号灯和车辆','马上跑过去','低头看玩具'],'看信号灯和车辆','交通安全'],['迷路时应该找谁帮助？',['警察或工作人员','随便一个陌生人','自己躲起来'],'警察或工作人员','安全求助'],['吃饭前要做什么？',['认真洗手','摸摸地面','马上开吃'],'认真洗手','清洁习惯'],['整理书包应该参考什么？',['课程表','动画片','零食袋'],'课程表','整理物品'],['合理使用零花钱的方法是？',['先计划再花钱','马上全部花掉','借给陌生人'],'先计划再花钱','金钱概念']]
const emotionScenes=[['生气时更合适怎么做？',['停下来呼吸并说出感受','推别人','摔东西'],'停下来呼吸并说出感受','表达生气'],['想妈妈时可以怎么做？',['告诉老师或可信的大人','假装没感觉','嘲笑别人'],'告诉老师或可信的大人','表达想念'],['担心做不好时可以？',['把任务分小一步步来','直接放弃','责怪朋友'],'把任务分小一步步来','面对害怕'],['朋友拒绝一起玩时可以？',['问问原因或找其他活动','抢走玩具','一直大喊'],'问问原因或找其他活动','面对拒绝'],['难过时可以？',['允许自己哭并寻求陪伴','伤害自己','把感受藏起来'],'允许自己哭并寻求陪伴','表达难过']]

function mathQuestion(age,index){const limit=age<=6?10:age<=7?20:age<=8?50:100;const a=2+(index*3)%limit;const b=1+(index*2)%Math.max(4,Math.floor(limit/2));const multiply=age>=8&&index%3===0;const answer=multiply?(a%9+1)*(b%9+1):a+b;const question=multiply?`${a%9+1} × ${b%9+1} = ?`:`${a} + ${b} = ?`;return {skill:multiply?'乘法运算':'加法运算',question,options:[answer,answer+1,Math.max(0,answer-2),answer+3].map(String),answer:String(answer),explanation:multiply?`把 ${a%9+1} 加 ${b%9+1} 次，可以得到 ${answer}。`:`把两个数合在一起，答案是 ${answer}。`}}
function englishQuestion(index){const [word,meaning]=englishWords[index%englishWords.length];return {skill:'主题单词',question:`“${word}” 是什么意思？`,options:[meaning,'月亮','跑步'],answer:meaning,explanation:`${word} 的意思是“${meaning}”。`,parentTip:`先读出 ${word}，再请孩子把它放进一句简单的话里。`}}
function readingQuestion(index){const scenes=[['小雨每天给花浇水，几天后花开了。花为什么会开？','因为得到水和照顾',['因为得到水和照顾','因为没有阳光','因为被忘记']],['乐乐把零花钱存起来，想买一本书。乐乐为什么存钱？','为了买书',['为了买书','为了丢掉','为了迟到']],['小熊看到朋友难过，安静地坐在旁边。小熊在做什么？','陪伴朋友',['陪伴朋友','嘲笑朋友','抢玩具']],['天上乌云很多，小明出门带了雨伞。他判断天气可能怎样？','可能会下雨',['可能会下雨','一定下雪','一定晴天']]];const [question,answer,options]=scenes[index%scenes.length];return {skill:index%2?'信息提取':'原因推断',question,options,answer,explanation:'从句子里的行为和结果，可以找到答案。'}}
function brainQuestion(index){const patterns=[['2、4、6、8，下一个是？',['10','9','12'],'10','数字规律'],['🌟 🌙 🌟 🌙，下一个是？',['🌟','🌙','☀️'],'🌟','图形规律'],['哪个不属于同一类？',['胡萝卜','苹果','香蕉'],'胡萝卜','分类能力'],['记住：🍎 🐶 🚗，哪个顺序正确？',['🍎 🐶 🚗','🐶 🍎 🚗','🚗 🐶 🍎'],'🍎 🐶 🚗','顺序记忆']];const [question,options,answer,skill]=patterns[index%patterns.length];return {skill,question,options,answer,explanation:'先观察相同点和变化顺序，再作判断。'}}

function make(age,subject,index,data){const [type,icon]=subjectMeta[subject];return {id:`${age}-${subject}-${index+1}`,age,subject,type,icon,skill:data.skill,difficulty:index%3===0?'轻松':index%3===1?'普通':'挑战',question:data.question,options:data.options,answer:data.answer,explanation:data.explanation,wrongHint:data.wrongHint||'先找出题目中最重要的线索，再排除一个不合适的选项。',secondHint:`正确答案是 ${data.answer}，请再读一次题目和解释。`,parentTip:data.parentTip||'请孩子说说为什么选择这个答案，重点是理解过程。'} }

export const questionBank=Object.fromEntries([5,6,7,8,9,10].map(age=>{
  const rows=[]
  for(let i=0;i<30;i++)rows.push(make(age,'math',i,mathQuestion(age,i)))
  for(let i=0;i<30;i++)rows.push(make(age,'english',i,englishQuestion(i)))
  for(let i=0;i<20;i++)rows.push(make(age,'reading',i,readingQuestion(i)))
  for(let i=0;i<20;i++)rows.push(make(age,'brain',i,brainQuestion(i)))
  for(let i=0;i<20;i++){const [question,options,answer,skill]=lifeScenes[i%lifeScenes.length];rows.push(make(age,'life',i,{question,options,answer,skill,explanation:'安全、健康和有条理的选择，会帮助我们照顾好自己。'}))}
  for(let i=0;i<20;i++){const [question,options,answer,skill]=emotionScenes[i%emotionScenes.length];rows.push(make(age,'emotion',i,{question,options,answer,skill,explanation:'感受没有好坏，重要的是用安全的方法表达和寻求帮助。'}))}
  return [age,rows]
}))

export const getBankForAge=age=>questionBank[Number(age)]||questionBank[7]
