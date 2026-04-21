import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fish, TrendingUp, Shield, Trophy, User, ArrowRight, RefreshCw, ChevronRight, PenTool, Clipboard, Map as MapIcon, Info, Sparkles, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "你流落荒岛，每天只能徒手抓1条鱼吃。你想做个渔网，但这需要你整整一天不产出且挨饿，你会：",
    options: ["每天吃饱最重要，不折腾", "忍饥挨饿一天，赌一把‘生产力’", "请求邻居救济（如果有的活）", "找借口说今天生病了不干活"],
    correct: 1
  },
  {
    id: 2,
    text: "渔网做成了！现在你每天能抓2条鱼，吃1条，剩1条。你会如何处理多出的鱼？",
    options: ["全部吃掉，提升生活质量", "存起来，作为未来的‘储备资本’", "扔回大海，保持自然平衡", "拿它去跟邻居换个赞"],
    correct: 1
  },
  {
    id: 3,
    text: "邻居贝克想借你的网去捕鱼，但他不打算付你报酬，你的回应是：",
    options: ["大方借给他，好哥们不计较", "拒绝借出，借出的风险需要补偿", "直接送给他，反正我还能再做", "让他自己也去悟出这个道理"],
    correct: 1
  },
  {
    id: 4,
    text: "由于你有了储蓄，贝克想借鱼去度假。这种‘消费贷款’对海岛的意义是：",
    options: ["让大家都开心，促进和谐", "纯粹浪费社会储蓄，不能产生新鱼", "带动了周边旅游业", "没关系，借钱的人总会还的"],
    correct: 1
  },
  {
    id: 5,
    text: "贝克生病无法捕鱼，你决定把存的鱼借给他。这种‘应急贷款’的深层逻辑是：",
    options: ["单纯的慈善行为", "维护劳动力不流失，对长远生存重要", "趁机要求他未来还双倍", "博取大家的好感"],
    correct: 1
  },
  {
    id: 6,
    text: "鱼老是被偷，迈克斯决定建个‘仓库’（银行）帮大家存鱼。他应该：",
    options: ["当免费志愿者", "收取保管费或通过放贷赚利息", "把鱼都换成贝壳发给大家", "把鱼做成罐头"],
    correct: 1
  },
  {
    id: 7,
    text: "仓库里鱼堆积如山，借钱的人却很少。作为仓库主管，你应该：",
    options: ["提高利息，吸引储户", "降低利息，鼓励有创业点子的人借钱", "把多余的鱼平分给所有人", "把仓库关了"],
    correct: 1
  },
  {
    id: 8,
    text: "海岛要修灯塔，这笔钱应该来自：",
    options: ["大家随缘捐献", "从未来储蓄（税收）中扣除，必须提升效率", "向外岛借钱，不还就行", "禁止夜间航行"],
    correct: 1
  },
  {
    id: 9,
    text: "风暴后，政客弗兰基承诺发‘免费鱼’。但他不产鱼，鱼从哪来？",
    options: ["他自己的私人积蓄", "从有钱的生产者身上征更高的税", "政府自带福利属性", "向海神借债"],
    correct: 1
  },
  {
    id: 10,
    text: "弗兰基印发了纸做的‘鱼票’代替真鱼。如果印发的比仓库里的真鱼多得多：",
    options: ["纸比鱼更值钱了", "纸币的购买力最终会下降（通胀）", "海岛进入金融时代", "再也不用捕鱼了"],
    correct: 1
  },
  {
    id: 11,
    text: "原来1张票买1条鱼，现在只能买半条。政府说是商人的错，你的见解是：",
    options: ["商人确实贪婪，应该限价", "本质是政府滥发纸币导致纸币‘注水’了", "这是经济繁荣的必经之路", "鱼变聪明了"],
    correct: 1
  },
  {
    id: 12,
    text: "邻居‘中岛帝国’每天辛苦抓鱼，换回你印的‘纸币’。对你而言：",
    options: ["可以不劳而获，享受他们的劳动成果", "这是一种长期的良性贸易", "中岛帝国的人肯定傻", "纸张是最高出口产品"],
    correct: 0
  },
  {
    id: 13,
    text: "如果中岛停止接受纸币，要求兑换真鱼，而你已经吃光了：",
    options: ["再印更漂亮的纸币", "信用体系面临毁灭性打击", "关闭国门", "说鱼已经煮熟了不还"],
    correct: 1
  },
  {
    id: 14,
    text: "岛民借贷购买‘全景火山房’，期望房价永涨。你认为：",
    options: ["这是靠谱的投资机会", "泡沫形成，房子并没有提高产鱼效率", "中介很专业", "我也该去买"],
    correct: 1
  },
  {
    id: 15,
    text: "棚屋市场崩盘，政府印了一大堆鱼票救助资不抵债的银行。你会：",
    options: ["欢呼经济有救了", "愤怒，这是拿全体人的储蓄为赌徒买单", "去银行门口领补贴", "学习当银行家"],
    correct: 1
  },
  {
    id: 16,
    text: "政府不断提高‘债务上限’填补财政空缺。作为岛民，你预感到：",
    options: ["政府真的无所不能", "这迟早要由所有纳税人偿还", "屋顶越高越稳", "那是下一代的事"],
    correct: 1
  },
  {
    id: 17,
    text: "专家说‘适度通胀’刺激消费，真相是：",
    options: ["消费带动经济腾飞", "掠夺储蓄财富，摧毁长期资本积累", "人们花钱多，生产越积极", "专家真懂经济"],
    correct: 1
  },
  {
    id: 18,
    text: "大部分岛民不再抓鱼，而是做冲浪教练等‘服务业’，依赖进口。你担心：",
    options: ["生活太单调", "如果外岛断供，‘繁荣’将瞬间蒸发", "冲浪技巧不够", "鱼味道变了"],
    correct: 1
  },
  {
    id: 19,
    text: "当‘金鱼’（货币）只剩鱼头盖骨时，信用彻底崩溃。这现象是：",
    options: ["返璞归真", "恶性通胀导致的货币死亡", "节食低碳生活", "新型艺术试验"],
    correct: 1
  },
  {
    id: 20,
    text: "测试结束，财富的终极来源是：",
    options: ["印刷机印刷的速度", "政府的救助承诺", "生产力提高、长期储蓄与合理风投", "忽悠别人接受债务"],
    correct: 2
  }
];

const WEALTH_LEVELS = [
  { range: [0, 20], title: "优质韭菜预备役", animal: "Hamster", icon: "🐹", desc: "你就是那个把鲜鱼交出去换废纸、还得对村长感恩戴德的人。建议重修‘生产力’。" },
  { range: [21, 40], title: "深陷轮班的打工人", animal: "Ox", icon: "🐂", desc: "你勤奋有余但见识不足，眼中的繁荣只是邻居透支的幻觉。退潮时你连网都保不住。" },
  { range: [41, 60], title: "精致利己的随风草", animal: "Parrot", icon: "🦜", desc: "风往哪吹你往哪倒。你在平庸中寻找安全感，却不知最大的风险就是平庸本身。" },
  { range: [61, 80], title: "局部觉醒的生产者", animal: "Beaver", icon: "🦫", desc: "开始懂得储蓄的价值了。你距离财务自由只差一次对‘鱼票’骗局的终极看破。" },
  { range: [81, 100], title: "操盘全局的掠夺者", animal: "Owl", icon: "🦉", desc: "洞若观火。你若不在岛上当地产大亨，真是屈才了。你是规则的利用着。" }
];

const CHARACTERS = [
  { score: 80, name: "艾伯 (The Builder)", animal: "海狸", trait: "延迟满足狂", slogan: "消费是浪费，生产是正义。", bio: "你在全岛吃刺身时挨饿织网，这种变态自律让你成了财富主人。" },
  { score: 60, name: "迈克斯 (The Guard)", animal: "老鹰", trait: "看穿幻觉者", slogan: "别给我画饼，拿真鱼出来。", bio: "守着仓库、冷眼看弗兰基印钱的狠角色。你深知泡沫终会被真实储蓄填平。" },
  { score: 40, name: "查理 (The Follower)", animal: "绵羊", trait: "后知后觉者", slogan: "等鱼多了，我也想买房。", bio: "你总是等等看，等你想入场时价格已翻十倍。财富全靠跑得快，可惜你慢了。" },
  { score: 0, name: "贝克 (The Consumer)", animal: "仓鼠", trait: "乐观主义韭菜", slogan: "只要补贴够，生活总变好。", bio: "你在吃自己的未来。你是弗兰基最喜欢的选民，因为你最好忽悠。" }
];

export default function App() {
  const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setStep('quiz');
    setCurrentIndex(0);
    setScore(0);
  };

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === QUESTIONS[currentIndex].correct) {
      setScore(prev => prev + 5);
    }

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const getWealthLevel = (finalScore: number) => {
    return WEALTH_LEVELS.find(l => finalScore >= l.range[0] && finalScore <= l.range[1]) || WEALTH_LEVELS[0];
  };

  const getCharacterMatch = (finalScore: number) => {
    return CHARACTERS.find(c => finalScore >= c.score) || CHARACTERS[CHARACTERS.length - 1];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-paper shadow-[12px_12px_0px_0px_rgba(34,34,34,1)] border-[4px] border-ink relative flex flex-col overflow-hidden min-h-[780px]">
        
        {/* Header Poster Style */}
        <div className="bg-retro-red p-6 border-b-[4px] border-ink relative">
           <h1 className="font-display text-5xl text-paper tracking-tighter leading-none italic rotate-[-1deg]">
              ISLAND<br/>REPORT
           </h1>
           <div className="absolute bottom-2 right-4 label-tag rotate-[4deg]">FOR ILLUSTRATOR ONLY</div>
        </div>

        <main className="flex-1 flex flex-col p-6 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] no-scrollbar">
          <AnimatePresence mode="wait">
            {step === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full items-center text-center py-8"
              >
                <div className="relative mb-12">
                   <div className="w-32 h-32 bg-retro-blue border-[3px] border-ink shadow-[6px_6px_0px_0px_rgba(34,34,34,1)] flex items-center justify-center rotate-6">
                      <Fish size={64} className="text-paper p-2" />
                   </div>
                   <div className="absolute -top-4 -right-8 accent-box text-sm">TOP SECRET</div>
                </div>

                <h2 className="font-display text-3xl mb-4 tracking-tighter leading-tight">海岛财富<br/>生存报告分析</h2>
                
                <div className="space-y-4 mb-12 text-left w-full text-sm font-bold">
                   <div className="flex gap-2">
                       <span className="text-retro-red">→</span>
                       <p>20组真实宏观经济模型模拟</p>
                   </div>
                   <div className="flex gap-2">
                       <span className="text-retro-blue">→</span>
                       <p>揭示储蓄、通胀与债务的终极骗局</p>
                   </div>
                   <div className="flex gap-2">
                       <span className="text-retro-green">→</span>
                       <p>评估您的岛屿生存等级</p>
                   </div>
                </div>

                <button onClick={handleStart} className="btn-retro font-display text-xl flex items-center justify-center gap-3 w-full py-6 mt-auto">
                   START RECORD
                   <ArrowRight strokeWidth={4} />
                </button>
              </motion.div>
            )}

            {step === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, rotate: 2 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex flex-col h-full"
              >
                <div className="flex justify-between items-baseline mb-8">
                   <div>
                      <div className="label-tag bg-retro-blue mb-1">SCENARIO</div>
                      <div className="font-display text-4xl">0{currentIndex + 1}</div>
                   </div>
                   <div className="text-[10px] font-bold opacity-40">ITEM {QUESTIONS[currentIndex].id} / 20</div>
                </div>

                <div className="mb-10 text-lg font-bold leading-tight underline decoration-retro-red/30 decoration-2 underline-offset-4">
                  {QUESTIONS[currentIndex].text}
                </div>

                <div className="flex-1 space-y-4 pb-12">
                  {QUESTIONS[currentIndex].options.map((option, idx) => (
                    <button
                      key={`${currentIndex}-${idx}`}
                      onClick={() => handleAnswer(idx)}
                      className="btn-retro group"
                    >
                      <div className="flex gap-4 items-start">
                        <span className="font-display text-retro-red group-hover:scale-110 transition-transform">{String.fromCharCode(65 + idx)}</span>
                        <span className="text-xs font-bold leading-relaxed">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col h-full text-center py-6"
              >
                <div className="label-tag bg-retro-green mx-auto mb-6">FINAL ASSESSMENT</div>
                
                <div className="relative mb-12 inline-block mx-auto">
                   <div className="bg-white border-[4px] border-ink p-8 shadow-[8px_8px_0px_0px_rgba(34,34,34,1)]">
                      <div className="text-[100px] leading-none mb-4">{getWealthLevel(score).icon}</div>
                      <div className="font-display text-4xl text-retro-red tracking-tighter">{score} PTS</div>
                   </div>
                   <div className="absolute -bottom-4 -right-6 accent-box bg-ink text-paper">RANK A</div>
                </div>

                <div className="space-y-6 text-left mb-12">
                   <div className="bg-white border-[3px] border-ink p-4 shadow-[4px_4px_0px_0px_rgba(34,34,34,1)] relative">
                      <div className="label-tag absolute -top-3 left-4">等级鉴定</div>
                      <h3 className="font-display text-2xl mb-2">{getWealthLevel(score).title}</h3>
                      <p className="text-xs font-bold text-ink/70 italic leading-relaxed">
                        “{getWealthLevel(score).desc}”
                      </p>
                   </div>

                   <div className="bg-white border-[3px] border-ink p-4 shadow-[4px_4px_0px_0px_rgba(45,52,54,1)] relative overflow-hidden">
                      <div className="label-tag absolute -top-3 left-4 bg-retro-orange">动物人格</div>
                      <div className="flex gap-4 items-center mb-4 pt-2">
                         <div className="w-12 h-12 bg-retro-blue border-[2px] border-ink flex items-center justify-center font-display text-2xl text-paper">
                           {getCharacterMatch(score).animal[0]}
                         </div>
                         <div>
                            <h4 className="font-display text-lg leading-none">{getCharacterMatch(score).name}</h4>
                            <span className="text-[10px] font-bold opacity-60 uppercase">Animal Type: {getCharacterMatch(score).animal}</span>
                         </div>
                      </div>
                      <div className="bg-ink text-paper p-3 font-cartoon text-sm mb-4 rotate-[-1deg]">
                        「 {getCharacterMatch(score).slogan} 」
                      </div>
                      <p className="text-[11px] font-bold leading-relaxed pr-4">
                        {getCharacterMatch(score).bio}
                      </p>
                   </div>
                </div>

                <button onClick={handleStart} className="btn-retro font-display text-lg flex items-center justify-center gap-3 w-full py-5 bg-retro-orange text-paper border-ink mb-12">
                   RE-SCAN LIFE
                   <RefreshCw strokeWidth={4} />
                </button>

                <div className="flex justify-between items-center opacity-40 border-t-[3px] border-ink border-dashed pt-4">
                   <span className="text-[8px] font-black uppercase tracking-widest">Illustration by Applet</span>
                   <span className="text-[8px] font-black uppercase tracking-widest">2026 Edition</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      
      {/* Background Poster Labels */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden hidden md:block">
         <div className="absolute top-10 left-10 p-4 border-[2px] border-ink/10 flex flex-col gap-2">
            <div className="font-display text-8xl text-ink/5 tracking-tighter">ECONOMICS</div>
            <div className="font-display text-8xl text-ink/5 tracking-tighter">ILLUSTRATOR</div>
         </div>
      </div>
    </div>
  );
}
