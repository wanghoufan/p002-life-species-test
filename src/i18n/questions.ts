import type { Locale } from './locale';

export type Question = {
  q: number;
  text: Record<Locale, string>;
  options: Record<Locale, string[]>;
  multi?: boolean;
  maxSelect?: number;
};

// 选项顺序即评分输入顺序，中英文必须一一对应，不得增删或调换
export const QUESTIONS: Question[] = [
  {
    q: 1,
    text: { zh: '终于到周末了，你通常怎么过？', en: 'It is finally the weekend. How do you usually spend it?' },
    options: {
      zh: ['约朋友出去玩', '宅家打游戏/追剧', '睡到自然醒，啥也不干', '出去探店/逛展打卡'],
      en: ['Going out with friends', 'Staying in, gaming or binge-watching', 'Sleeping until I wake up naturally, doing nothing', 'Café hopping or catching an exhibition'],
    },
  },
  {
    q: 2,
    text: { zh: '朋友突然约你今晚出去，你的第一反应是？', en: 'A friend suddenly asks you to go out tonight. What is your first reaction?' },
    options: {
      zh: ['好呀好呀！去哪？', '让我想想…', '不了，我已经安排好了', '随便，都可以'],
      en: ['Yes yes! Where?', 'Let me think...', 'No, I already have plans', 'Either way is fine'],
    },
  },
  {
    q: 3,
    text: { zh: '在聚会上，你通常？', en: 'At a party, you are usually?' },
    options: {
      zh: ['全场最活跃的那个', '和熟悉的人聊', '找个角落安静待着', '观察大家，偶尔插话'],
      en: ['The most active person in the room', 'Chatting with people you already know', 'Quietly parked in a corner', 'Watching everyone, chime in now and then'],
    },
  },
  {
    q: 4,
    text: { zh: '说到吃饭，你更在意？', en: 'When it comes to eating, you care more about?' },
    options: {
      zh: ['好不好吃', '和谁一起吃', '有没有仪式感', '快不快乐'],
      en: ['How tasty it is', 'Who you are eating with', 'Whether it feels like an occasion', 'Whether it makes you happy'],
    },
  },
  {
    q: 5,
    text: { zh: '你的社交媒体状态通常是？', en: 'What is your usual social media behaviour?' },
    options: {
      zh: ['天天发，分享生活', '偶尔发一下', '只看不发', '有多个小号'],
      en: ['Posting every day', 'Posting now and then', 'Only watching, never posting', 'I run several alt accounts'],
    },
  },
  {
    q: 6,
    text: { zh: '旅行时你更喜欢？', en: 'When travelling, you prefer?' },
    options: {
      zh: ['详细攻略安排到小时', '定个大方向，随性走', '跟着朋友走', '躺酒店就是度假'],
      en: ['A detailed plan scheduled by the hour', 'A rough direction, then wander', 'Following whatever friends decide', 'Rotting in the hotel is the holiday'],
    },
  },
  {
    q: 7,
    text: { zh: '朋友向你倾诉烦恼，你通常会？', en: 'A friend vents their troubles to you. What do you usually do?' },
    options: {
      zh: ['给建议和分析', '认真倾听', '讲个笑话缓和气氛', '分享自己的类似经历'],
      en: ['Give advice and analysis', 'Listen properly', 'Tell a joke to ease the mood', 'Share a similar thing that happened to you'],
    },
  },
  {
    q: 8,
    text: { zh: '你觉得自己更偏向？', en: 'You feel you lean more towards being?' },
    options: {
      zh: ['理性的', '感性的', '随性的', '佛系的'],
      en: ['Rational', 'Emotional', 'Spontaneous', 'Whatever-will-be-will-be'],
    },
  },
  {
    q: 9,
    text: { zh: '一个人在家时，你通常会？', en: 'Home alone, you usually?' },
    options: {
      zh: ['必须找点事做', '享受安静时光', '有点焦虑想找人聊', '睡觉！'],
      en: ['Find something to do, anything', 'Enjoy the quiet', 'Get a bit anxious and want to talk to someone', 'Sleep!'],
    },
  },
  {
    q: 10,
    text: { zh: '以下哪些场景让你感到舒适？（选 1-3 项）', en: 'Which of these scenes feel comfortable to you? (pick 1-3)' },
    options: {
      zh: ['热闹的聚餐', '安静的咖啡馆', '大自然的徒步', '家里的沙发', '深夜的便利店', '热闹的市集', '安静的图书馆', 'KTV 包厢'],
      en: ['A lively group dinner', 'A quiet café', 'Hiking in nature', 'Your own sofa', 'A convenience store at midnight', 'A busy market', 'A quiet library', 'A karaoke booth'],
    },
    multi: true,
    maxSelect: 3,
  },
  {
    q: 11,
    text: { zh: '你早上醒来的状态是？', en: 'How do you wake up in the morning?' },
    options: {
      zh: ['元气满满', '再睡五分钟', '被闹钟吵醒的怨气', '已经醒了但不起'],
      en: ['Full of energy', 'Five more minutes', 'Pure rage at the alarm', 'Awake, but refusing to get up'],
    },
  },
  {
    q: 12,
    text: { zh: '你更愿意在什么时间工作/学习？', en: 'When would you rather work or study?' },
    options: {
      zh: ['清晨', '上午', '下午', '深夜'],
      en: ['Early morning', 'Late morning', 'Afternoon', 'Late at night'],
    },
  },
  {
    q: 13,
    text: { zh: '周末的天气超好，你会？', en: 'The weekend weather is gorgeous. You?' },
    options: {
      zh: ['必须出门！', '看心情', '阳台算户外吗', '窗帘拉上继续宅'],
      en: ['Have to go out!', 'Depends on my mood', 'Does a balcony count as outdoors?', 'Curtains closed, staying in'],
    },
  },
  {
    q: 14,
    text: { zh: '你对待计划的态度是？', en: 'What is your attitude to planning?' },
    options: {
      zh: ['事事有计划', '有大计划就行', '计划赶不上变化', '从不计划'],
      en: ['Everything has a plan', 'A rough big picture is enough', 'Plans never survive reality', 'Never plan at all'],
    },
  },
  {
    q: 15,
    text: { zh: '以下哪些是你的真实写照？（选 1-5 项）', en: 'Which of these are honestly you? (pick 1-5)' },
    options: {
      zh: ['笑点低', '容易共情', '喜欢尝试新事物', '念旧', '容易焦虑', '随遇而安', '有点拖延', '完美主义'],
      en: ['Easy to laugh', 'Empathetic', 'Love trying new things', 'Nostalgic', 'Easily anxious', 'Go with the flow', 'A bit of a procrastinator', 'Perfectionist'],
    },
    multi: true,
    maxSelect: 5,
  },
  {
    q: 16,
    text: { zh: '遇到新鲜事物时，你首先？', en: 'When something new shows up, you first?' },
    options: {
      zh: ['想试试！', '先观察一下', '看别人试了再说', '不感兴趣'],
      en: ['Want to try it!', 'Observe from a distance', 'Wait and see how it goes for others', 'Not interested'],
    },
  },
  {
    q: 17,
    text: { zh: '你更喜欢哪种社交方式？', en: 'Which way of socialising do you prefer?' },
    options: {
      zh: ['线下面对面', '线上聊天', '都可以', '能免则免'],
      en: ['Meeting face to face', 'Chatting online', 'Both are fine', 'Skip it whenever possible'],
    },
  },
  {
    q: 18,
    text: { zh: '你对"一个人"的感觉是？', en: 'How does "being on your own" feel?' },
    options: {
      zh: ['很享受', '偶尔需要', '有点害怕', '看情况'],
      en: ['I enjoy it', 'I need it sometimes', 'A little frightening', 'It depends'],
    },
  },
  {
    q: 19,
    text: { zh: '你的手机相册里大多是？', en: 'Your phone gallery is mostly?' },
    options: {
      zh: ['美食', '风景', '自拍', '截图和表情包'],
      en: ['Food', 'Scenery', 'Selfies', 'Screenshots and memes'],
    },
  },
  {
    q: 20,
    text: { zh: '你更认同哪种生活态度？', en: 'Which attitude to life do you agree with more?' },
    options: {
      zh: ['及时行乐', '未雨绸缪', '随遇而安', '活出自我'],
      en: ['Enjoy the moment', 'Prepare for a rainy day', 'Go wherever life takes me', 'Live unapologetically as myself'],
    },
  },
  {
    q: 21,
    text: { zh: '朋友怎么形容你？', en: 'How do your friends describe you?' },
    options: {
      zh: ['开心果', '靠谱的人', '神秘的人', '温暖的人'],
      en: ['The fun one', 'The reliable one', 'The mysterious one', 'The warm one'],
    },
  },
  {
    q: 22,
    text: { zh: '你理想的周末是？', en: 'Your ideal weekend is?' },
    options: {
      zh: ['精彩充实的', '放松躺平的', '和朋友一起的', '完全属于自己的'],
      en: ['Packed with good things', 'Flat on the couch, recharging', 'Spent with friends', 'Entirely my own'],
    },
  },
  {
    q: 23,
    text: { zh: '你对"家"的感觉是？', en: 'What does "home" feel like to you?' },
    options: {
      zh: ['最温暖的地方', '就是个睡觉的地方', '想逃离的地方', '需要精心打理的空间'],
      en: ['The warmest place there is', 'Basically a place to sleep', 'A place I want to escape', 'A space that needs careful tending'],
    },
  },
  {
    q: 24,
    text: { zh: '最后，你觉得自己是个怎样的人？', en: 'Last one. What kind of person are you?' },
    options: {
      zh: ['复杂的人', '简单的人', '有趣的人', '正在探索的人'],
      en: ['A complicated one', 'A simple one', 'An interesting one', 'Still figuring it out'],
    },
  },
];
