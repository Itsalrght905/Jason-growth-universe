const domains={
  math:['数数与数量','比较大小','形状与空间','加减运算','乘除概念','规律推理','时间与金钱','分数与小数'],
  english:['主题单词','自然拼读','听音辨词','简单句型','日常表达','短句阅读','段落理解','勇敢开口'],
  reading:['词语理解','句子理解','信息提取','故事顺序','人物心情','主要内容','原因推断','亲子表达'],
  brain:['短时记忆','顺序记忆','视觉注意','图形配对','分类能力','规律发现','方向空间','逻辑推理'],
  life:['清洁习惯','整理物品','交通安全','寻求帮助','健康作息','时间管理','金钱概念','完成责任'],
  emotion:['认识开心','认识生气','认识害怕','表达难过','想妈妈时表达','被拒绝时应对','学会等待','请求帮助'],
}

export const curriculum=Object.fromEntries([5,6,7,8,9,10].map(age=>[age,Object.fromEntries(Object.entries(domains).map(([domain,skills])=>[domain,skills.map((skill,index)=>({id:`${age}-${domain}-${index+1}`,skill,stage:index<Math.max(2,age-4)?'正在学习':'即将探索'}))]))]))

export const domainLabels={math:'数学技能',english:'英文技能',reading:'阅读技能',brain:'脑力技能',life:'生活能力',emotion:'情绪能力'}
export const getAgeCurriculum=age=>curriculum[Number(age)]||curriculum[7]
