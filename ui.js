/* Shared shell, helpers and SAMPLE data for the dashboard v2.0 mockups. Nothing here comes from the database. */
/* Navigation (Mohamed, 2026-11-23: the flat strip, then grouped menus, were both rejected): a fixed side list where every
   page is always visible, grouped, and can fold to icons. Phones and tablets open the same list from one button.
   Each page: [file, title, what it is for, icon]. */
var NAV=[["index.html","نظرة عامة","","grid","الرئيسية"],
  {t:"الأشخاص",items:[["employees.html","الموظفون","الحسابات والبيانات والصلاحيات","users"],["reminders.html","تذكير الموظفين","كل ما ينتظر الموظفين في مكان واحد","clock","التذكير"],["alerts.html","التنبيهات","رسالة أو تذكير بإشعار أو واتساب","send"],["requests.html","الطلبات","الإجازات والسلف والانصراف المبكر","doc"],["acks.html","إقرارات القراءة","من قرأ المستندات ومن لم يقرأ","check","الإقرارات"],["honors.html","التكريم","موظف الشهر والأعلى مبيعًا","star"],["engagement.html","التفاعل","من يفتح الأخبار ويقرأ ويكمل حسابه","chart"],["complaints.html","الشكاوى والمقترحات","رسائل الموظفين المجهولة","mail"]]},
  {t:"المحتوى",items:[["homeset.html","إعدادات الرئيسية","أقسام الرئيسية وصورتها والدوام","image","الرئيسية"],["slides.html","تذكيرات الرئيسية","الشريط المتحرك في رئيسية البوابة","bell","التذكيرات"],["news.html","الأخبار والإعلانات","ما يُنشر في رئيسية البوابة","doc","الأخبار"],["library.html","المكتبة","ملفات PDF وإصداراتها","folder"],["training.html","التدريب","الملفات والفيديوهات والأسئلة في مركز التدريب","cap"],["systems.html","الأنظمة والروابط","روابط الأنظمة وتطبيقات الجوال","link","الأنظمة"]]}];
var ICONS={send:"M21 3L3 10.5l7 2.5 2.5 7zM10 13L21 3",image:"M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 5M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2",grid:"M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",folder:"M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",mail:"M3 6h18v12H3zM3 7l9 6 9-6",globe:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",star:"M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",chart:"M4 20V10M10 20V4M16 20v-8M21 20H3",pin:"M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",cap:"M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5",list:"M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",build:"M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3",bell:"M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0",users:"M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M21 20v-1a4 4 0 0 0-3-3.8M15.5 4.2a3.5 3.5 0 0 1 0 6.6",check:"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5",clock:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2",doc:"M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",sun:"M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19",moon:"M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z",plus:"M12 5v14M5 12h14",link:"M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",phone:"M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2"};
function $(id){return document.getElementById(id)}
function esc(s){var d=document.createElement("div");d.textContent=s==null?"":s;return d.innerHTML.replace(/"/g,"&quot;")}
function ltr(s){return '<span class="ltr">'+esc(s)+'</span>'}
function pc(a,b){return b?Math.round(a/b*100):0}
var ICON_MAP={"شبكة":"grid","قائمة":"list","مبنى":"build","مجلد":"folder","رسم بياني":"chart","موقع":"pin","تعليم":"cap","بريد":"mail","موقع ويب":"globe","موظفون":"users","ملف":"doc","ساعة":"clock","حماية":"check","نجمة":"star","رابط":"link","هاتف":"phone"};
function icName(n){return ICON_MAP[n]||"link"}
function ic(n,s){return '<svg width="'+(s||20)+'" height="'+(s||20)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ICONS[n]+'"/></svg>'}
function av(name){return '<span class="av" aria-hidden="true">'+esc(name.charAt(0))+'</span>'}
function toast(m){var t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove("on")},3200)}

/* ---------- sample data ---------- */
var D={
  stats:{emps:24,docs:82,news:4},
  depts:[
    {name:"العمليات",lead:"أحمد عدنان",read:22,pend:10,late:8,people:4},
    {name:"العذيبة",lead:"محمد نجيب",read:30,pend:12,late:6,people:5},
    {name:"صلالة",lead:"عمر صادق",read:15,pend:10,late:3,people:3},
    {name:"عبري",lead:"عماد درويش",read:10,pend:11,late:1,people:3},
    {name:"التسويق",lead:"مصطفى علاء",read:28,pend:4,late:0,people:2},
    {name:"الموارد البشرية",lead:"أحمد صالح",read:16,pend:0,late:0,people:0}
  ],
  reqs:[
    {name:"سالم الحارثي",meta:"العمليات · فرع صلالة"},
    {name:"ريم البلوشي",meta:"التسويق · المكتب الرئيسي"}
  ]
};
/* Employee requests: this dashboard follows them; the one decision taken here is HR's on advances (Mohamed, 2026-11-23).
   Path: the team leader decides in the portal; advances (سلف) then go to HR. lead / hr = that step's decision once taken. */
var TODAY="2026-11-22";
var REQS=[
  {no:"REQ-1048",name:"أحمد عدنان",type:"إجازة",at:"2026-11-22 08:12",st:"قيد الإجراء",d:{kind:"سنوية",from:"2026-11-29",to:"2026-12-03",days:5,bal:18},why:"سفر عائلي."},
  {no:"REQ-1047",name:"عمر صادق",type:"سلفة",at:"2026-11-21 15:40",st:"قيد الإجراء",d:{amount:300,months:3},why:"مصاريف طارئة لصيانة السيارة.",lead:{ok:true,at:"2026-11-21 17:10"}},
  {no:"REQ-1046",name:"مصطفى علاء",type:"انصراف مبكر",at:"2026-11-21 10:05",st:"قيد الإجراء",d:{date:"2026-11-24",time:"13:30"},why:"موعد في المستشفى."},
  {no:"REQ-1044",name:"أحمد صالح",type:"إجازة",at:"2026-11-17 09:30",st:"قيد الإجراء",d:{kind:"سنوية",from:"2026-12-06",to:"2026-12-17",days:10,bal:6},why:"زيارة الأهل خارج السلطنة."},
  {no:"REQ-1043",name:"محمد حسام",type:"إجازة",at:"2026-11-16 11:20",st:"معتمد",d:{kind:"سنوية",from:"2026-11-26",to:"2026-11-27",days:2,bal:14},why:"ظرف شخصي.",lead:{ok:true,at:"2026-11-16 14:02"}},
  {no:"REQ-1041",name:"خالد المعمري",type:"سلفة",at:"2026-11-12 13:15",st:"مرفوض",d:{amount:800,months:4},why:"التزامات مالية.",lead:{ok:true,at:"2026-11-12 16:30"},hr:{ok:false,at:"2026-11-13 09:10",note:"المبلغ يتجاوز الحد المسموح به، ويمكن تقديم طلب بمبلغ أقل."}},
  {no:"REQ-1039",name:"عمر صادق",type:"انصراف مبكر",at:"2026-11-10 08:50",st:"معتمد",d:{date:"2026-11-10",time:"14:00"},why:"مراجعة جهة حكومية.",lead:{ok:true,at:"2026-11-10 09:05"}},
  {no:"REQ-1036",name:"مصطفى علاء",type:"سلفة",at:"2026-11-05 12:00",st:"معتمد",d:{amount:200,months:2},why:"رسوم دراسية.",lead:{ok:true,at:"2026-11-05 15:20"},hr:{ok:true,at:"2026-11-06 10:30"}},
  {no:"REQ-1033",name:"أحمد عدنان",type:"إجازة",at:"2026-11-02 16:45",st:"ملغى",d:{kind:"مرضية",from:"2026-11-03",to:"2026-11-03",days:1,bal:18},why:"وعكة صحية."}
];
/* Anonymous complaints and suggestions (page name set by Mohamed 2026-11-23); kind is absent for a complaint. No sender field exists on purpose. code = the follow-up code the employee keeps. */
var COMPL=[
  {code:"SH-4821",cat:"بيئة العمل",at:"2026-11-22 07:55",st:"جديدة",x:"التكييف في مكتب العذيبة معطّل منذ أسبوعين، والحرارة تجعل العمل بعد الظهر صعبًا. بلّغنا المشرف أكثر من مرة ولم يتغيّر شيء."},
  {code:"SH-4817",cat:"الإدارة",at:"2026-11-20 14:10",st:"جديدة",x:"توزيع المناوبات في نهاية الأسبوع غير عادل، ونفس الأشخاص يأخذون المناوبة كل مرة."},
  {code:"SH-4812",kind:"مقترح",by:"هدى الكندي",cat:"بيئة العمل",at:"2026-11-19 11:05",st:"جديدة",x:"أقترح تخصيص ساعة أسبوعية لتدريب فريق المبيعات على منتجات OPPEIN الجديدة قبل وصولها للمعارض."},
  {code:"SH-4809",by:"عمر صادق",cat:"الرواتب والمستحقات",at:"2026-11-17 10:30",st:"قيد المراجعة",x:"عمولة شهر أكتوبر لم تُحتسب كاملة مع أن الهدف تحقق.",note:"تُراجع مع الحسابات."},
  {code:"SH-4796",cat:"الزملاء",at:"2026-11-11 16:45",st:"قيد المراجعة",x:"أحد الزملاء يتحدث مع العملاء بأسلوب غير لائق أمام بقية الفريق.",reply:"وصلت شكواك ونتابعها مع مدير الفرع. شكرًا لتنبيهك."},
  {code:"SH-4770",cat:"بيئة العمل",at:"2026-11-03 09:20",st:"مغلقة",x:"لا توجد مواقف كافية للموظفين في فرع صلالة.",reply:"تم الاتفاق مع إدارة المبنى على 6 مواقف إضافية تبدأ من 15 نوفمبر."}
];
/* Notifications for the person using the dashboard, newest first. tone: "" info, "ok" done, "bad" problem.
   Read state is kept per browser in localStorage "sb-read"; the first three start unread. */
var NOTES=[
  {id:"n9",ic:"folder",t:"رفع عمر صادق كتابًا إلى المكتبة",x:"«دليل القياسات القياسية للمطابخ». بانتظار مراجعتك.",at:"اليوم 09:12",go:"library.html"},
  {id:"n8",ic:"cap",tone:"bad",t:"ينتهي موعد تدريب «منتجات مطابخ OPPEIN 2026» بعد 4 أيام",x:"لم يُجب عن أسئلته نصف الموجَّه لهم.",at:"اليوم 08:50",go:"training.html"},
  {id:"n7",ic:"users",t:"سجّل سالم الحارثي حسابًا جديدًا",x:"العمليات، فرع صلالة. بانتظار اعتمادك.",at:"اليوم 08:41",go:"employees.html"},
  {id:"n6",ic:"doc",t:"وافق المدير المباشر على سلفة عمر صادق",x:"300 ر.ع على 3 أقساط. بانتظار قرارك.",at:"أمس 17:10",go:"requests.html"},
  {id:"n5",ic:"users",t:"سجّلت ريم البلوشي حسابًا جديدًا",x:"التسويق، المكتب الرئيسي. بانتظار اعتمادك.",at:"أمس 16:05",go:"employees.html"},
  {id:"n4",ic:"clock",tone:"bad",t:"8 إقرارات قراءة تجاوزت آخر موعد لها",x:"أكثرها في العمليات والعذيبة.",at:"أمس 09:00",go:"acks.html",read:1},
  {id:"n3",ic:"check",tone:"ok",t:"اكتملت إقرارات الموارد البشرية",x:"16 من 16 قرأوا المستندات المطلوبة.",at:"2026-11-20",go:"acks.html",read:1},
  {id:"n2",ic:"bell",t:"نُشر خبر «إجازة اليوم الوطني العماني»",x:"يظهر لجميع الموظفين ويتطلب تأكيد الاطلاع.",at:"2026-11-12",go:"news.html",read:1}
];
function noteRead(){var r={};try{r=JSON.parse(localStorage.getItem("sb-read")||"{}")}catch(e){}NOTES.forEach(function(n){if(n.read&&r[n.id]==null)r[n.id]=1});return r}
function markRead(ids){var r=noteRead();ids.forEach(function(i){r[i]=1});try{localStorage.setItem("sb-read",JSON.stringify(r))}catch(e){}}
/* Recognition shown on the portal home (Mohamed's vision 2026-11-22: موظف الشهر والتوب سيلز).
   top.amt is the sales figure in OMR; it reaches employees only when showAmt is on. */
var MONTHS=["نوفمبر 2026","أكتوبر 2026","سبتمبر 2026","أغسطس 2026"];
var HONOR={
  eom:{name:"أحمد صالح",month:"نوفمبر 2026",why:"أنهى مراجعة ملفات جميع الموظفين قبل موعدها، ودعم الفروع في تسجيل الموظفين الجدد.",en:"",show:true},
  top:{month:"نوفمبر 2026",show:true,showAmt:false,list:[{name:"هدى الكندي",amt:18400},{name:"فهد الغافري",amt:15250},{name:"عمر صادق",amt:12900}]},
  hist:[
    {kind:"eom",month:"أكتوبر 2026",name:"عمر صادق",why:"افتتاح معرض صلالة الجديد في موعده."},
    {kind:"top",month:"أكتوبر 2026",list:[{name:"فهد الغافري",amt:16800},{name:"هدى الكندي",amt:14100},{name:"عمر صادق",amt:11300}]},
    {kind:"eom",month:"سبتمبر 2026",name:"مصطفى علاء",why:"حملة العودة للمدارس وأثرها على زيارات المعارض."},
    {kind:"top",month:"سبتمبر 2026",list:[{name:"هدى الكندي",amt:13900},{name:"عمر صادق",amt:12050}]}
  ]
};
/* the only decision taken in this dashboard: HR on an advance the team leader already approved (Mohamed, 2026-11-23) */
function hrQueue(){return REQS.filter(function(r){return r.type==="سلفة"&&r.st==="قيد الإجراء"&&r.lead&&r.lead.ok&&!r.hr}).length}
var EMPS=[
  {name:"محمد حسام",mail:"mohamed.hegazy@sindbad.om",no:142,dept:"التسويق",job:"مطور ويب",branch:"المكتب الرئيسي",role:"مدير النظام",st:"نشط",last:"2026-11-22 09:58"},
  {name:"مصطفى علاء",mail:"info@sindbad.om",no:21,dept:"التسويق",job:"مدير التسويق",branch:"المكتب الرئيسي",role:"مدير النظام",st:"نشط",last:"2026-11-15 18:01"},
  {name:"أحمد عدنان",mail:"ahmed.adnan@sindbad.om",no:179,dept:"العمليات",job:"مدير العمليات",branch:"المكتب الرئيسي",role:"الإدارة",lead:true,st:"نشط",last:"2026-11-21 11:32"},
  {name:"أحمد صالح",mail:"ahmed.saleh@sindbad.om",no:183,dept:"الموارد البشرية",job:"مدير الموارد البشرية",branch:"المكتب الرئيسي",role:"الموارد البشرية",st:"نشط",last:"2026-11-22 08:10"},
  {name:"عمر صادق",mail:"omar.sadek@sindbad.om",no:166,dept:"صلالة",job:"مدير الفرع",branch:"صلالة",role:"الإدارة",st:"نشط",last:"2026-11-21 18:20"},
  {name:"سالم الحارثي",mail:"salim.h@sindbad.om",no:201,dept:"العمليات",job:"فني تركيب",branch:"صلالة",role:"—",st:"بانتظار التفعيل",last:"—"},
  {name:"ريم البلوشي",mail:"reem.b@sindbad.om",no:202,dept:"التسويق",job:"مصممة",branch:"المكتب الرئيسي",role:"—",st:"بانتظار التفعيل",last:"—"},
  {name:"خالد المعمري",mail:"khalid.m@sindbad.om",no:158,dept:"العمليات",job:"مشرف توصيل",branch:"العذيبة",role:"—",st:"موقوف",last:"2026-10-30 14:02"},
  {name:"فهد الغافري",mail:"fahad.g@sindbad.om",no:203,dept:"عبري",job:"مبيعات",branch:"عبري",role:"—",st:"مرفوض",last:"—"},
  {name:"هدى الكندي",mail:"huda.k@sindbad.om",no:171,dept:"صلالة",job:"مبيعات",branch:"صلالة",role:"—",st:"نشط",last:"2026-11-20 09:12"}
];
var ACKS=[
  {name:"خالد المعمري",dept:"العمليات",done:1,all:5,late:3,rem:""},
  {name:"يوسف الرواحي",dept:"العذيبة",done:2,all:5,late:2,rem:""},
  {name:"هدى الكندي",dept:"صلالة",done:2,all:5,late:2,rem:""},
  {name:"ناصر السيابي",dept:"العمليات",done:3,all:5,late:0,rem:"منذ 5 ساعات"},
  {name:"مريم الشحي",dept:"عبري",done:3,all:5,late:1,rem:""},
  {name:"محمد حسام",dept:"التسويق",done:4,all:5,late:0,rem:""},
  {name:"مصطفى علاء",dept:"التسويق",done:5,all:5,late:0,rem:""}
];
/* home: the three "last 10" lists of the current dashboard */
var REG=[["سالم الحارثي","العمليات","بانتظار الاعتماد","2026-11-22 08:41"],["ريم البلوشي","التسويق","بانتظار الاعتماد","2026-11-21 16:05"],["محمد حسام","التسويق","معتمد","2026-11-12 10:09"],["مصطفى علاء","التسويق","معتمد","2026-11-03 18:59"]];
var READS=[["مصطفى علاء","دليل إجراءات المبيعات والتصميم","الإصدار 2","2026-11-22 09:58"],["عمر صادق","دليل الموظف العام","الإصدار 3","2026-11-21 18:20"],["أحمد عدنان","دليل استخدام البوابة","الإصدار 2","2026-11-21 11:32"]];
var UNREAD=[["خالد المعمري","دليل الموظف العام","الإصدار 3","2026-11-05"],["يوسف الرواحي","دليل إجراءات المبيعات والتصميم","الإصدار 2","2026-11-05"],["هدى الكندي","دليل استخدام البوابة","الإصدار 2","2026-11-05"],["مريم الشحي","برنامج تدريب فريق المبيعات","الإصدار 1","2026-11-16"]];
/* img = sample cover in 03-assets/news (demo photos from the portal design folder); a real cover is uploaded in the news form */
var NEWS=[
  {ack:true,seen:6,img:"team.webp",t:"إجازة اليوم الوطني العماني",x:"تقرر إعطاء كامل الشركة إجازة مدتها أسبوع كامل للاحتفال باليوم الوطني العماني.",cat:"عام",date:"2026-11-12",main:true,st:"منشور"},
  {u:"https://sindbadportal.com/requests",ub:"تقديم طلب إجازة",img:"onboarding.webp",t:"تحديث نظام الإجازات",x:"تغيّرت طريقة تقديم طلب الإجازة: أصبح الطلب من البوابة مباشرة ويصل إلى المدير.",cat:"الموارد البشرية",date:"2026-11-11",st:"منشور"},
  {img:"kitchen.jpg",t:"افتتاح معرض صلالة الجديد",x:"المعرض الجديد في صلالة فتح أبوابه بتشكيلة مطابخ OPPEIN الكاملة.",cat:"المبيعات",date:"2026-11-08",st:"منشور"},
  {img:"leadership.webp",t:"دورة تدريب فريق المبيعات",x:"البرنامج التدريبي للربع القادم: المواعيد وطريقة التسجيل.",cat:"التدريب",date:"2026-11-05",st:"مسودة"}
];
/* Reminders strip on the portal home (the "slides"), in portal order; texts copied from the live home 2026-11-23.
   tag = the small label above the title, n title, x the one line under it, u = where «التفاصيل» goes (none = no button). */
var SLIDES=[
  {tag:"تذكير من اللائحة",n:"سجّل حضورك بالبصمة أو تطبيق السندباد",x:"هما الوسيلتان الوحيدتان المعتمدتان لإثبات الحضور والانصراف.",u:"https://sindbadportal.com/policies",st:"ظاهر"},
  {tag:"تذكير من اللائحة",n:"فترة السماح 15 دقيقة، مرة واحدة في الأسبوع",x:"المرة الثانية في الأسبوع نفسه تُحسب تأخيرًا.",u:"https://sindbadportal.com/policies",st:"ظاهر"},
  {tag:"تذكير من اللائحة",n:"قدّم طلب الإجازة السنوية قبل شهرين",x:"بدون موافقة نهائية مسبقة تُحسب أيام الإجازة انقطاعًا عن العمل.",u:"https://sindbadportal.com/policies",st:"ظاهر"},
  {tag:"تذكير من اللائحة",n:"سجّل كل عميل في CRM خلال 30 دقيقة",x:"العميل غير المسجّل يُحسب للفرع الذي يبدأ معه المعاملة.",u:"https://sindbadportal.com/policies",st:"ظاهر"},
  {tag:"تذكير من اللائحة",n:"ردّ على العميل خلال 3 ساعات كحد أقصى",x:"الرد خلال أول 15 دقيقة يرفع فرصة تحويل العميل حتى 5 أضعاف.",u:"https://sindbadportal.com/policies",st:"ظاهر"}
];
/* Training shown in the portal «مركز التدريب» (Mohamed 2026-11-24): name, description, files and videos (mats),
   a deadline (due), multiple-choice questions (qs: q text, opts, ok = index of the right one) and who it is for (aud).
   done = sample count of employees who finished it. */
var TRAIN=[
  {tab:"تدريبات السندباد",st:"منشور",n:"تهيئة الموظفين الجدد",x:"ما يحتاجه الموظف الجديد في أسبوعه الأول: الشركة، اللوائح، وأنظمة العمل.",due:"2026-12-15",done:6,
   cats:["اللوائح والأدلة","أنظمة العمل"],
   mats:[{g:0,k:"ملف من المكتبة",t:"دليل الموظف العام",f:"دليل الموظف العام"},{g:1,k:"فيديو يوتيوب",t:"جولة في أنظمة العمل: Sindflow و Odoo",src:"https://youtu.be/aqz-KE-bpKQ"},{g:1,k:"ملف من المكتبة",t:"دليل استخدام البوابة",f:"دليل استخدام البوابة"}],
   qs:[{g:0,q:"ما الوسيلة المعتمدة لإثبات الحضور والانصراف؟",opts:["التوقيع الورقي","البصمة أو تطبيق السندباد","إبلاغ المدير شفهيًا"],ok:1},
       {g:0,q:"كم مدة فترة السماح في الحضور؟",opts:["5 دقائق","15 دقيقة","30 دقيقة","ساعة"],ok:1},
       {g:1,q:"متى يُقدَّم طلب الإجازة السنوية؟",opts:["قبل أسبوع","قبل شهر","قبل شهرين"],ok:2}]},
  {tab:"تدريب OPPEIN",st:"منشور",n:"منتجات مطابخ OPPEIN 2026",x:"الخامات والتشطيبات والملحقات الجديدة قبل وصولها إلى المعارض.",due:"2026-11-26",done:3,aud:{on:["dept:التسويق","dept:العمليات"],plus:[],minus:[]},
   cats:["التصميم","المبيعات"],
   mats:[{g:0,k:"فيديو مرفوع",t:"خامات الأبواب والأسطح",vf:"oppein-materials.mp4"},{g:0,k:"فيديو مرفوع",t:"الألوان والتشطيبات",vf:"oppein-finishes.mp4"},{g:1,k:"ملف من المكتبة",t:"دليل إجراءات المبيعات والتصميم",f:"دليل إجراءات المبيعات والتصميم"}],
   qs:[{g:0,q:"أي خامة تُستخدم لأسطح المطابخ المقاومة للحرارة؟",opts:["الكوارتز","الخشب المضغوط","البلاستيك"],ok:0},
       {g:1,q:"ما أول خطوة في بناء عرض السعر؟",opts:["تحديد الخصم","أخذ قياسات المطبخ","اختيار الإكسسوارات"],ok:1}]},
  {tab:"تدريبات خارجية",st:"مسودة",n:"مهارات خدمة العملاء",x:"دورة خارجية لفريق المبيعات وخدمة العملاء.",due:"",done:0,
   cats:["خدمة العملاء"],
   mats:[{g:0,k:"فيديو يوتيوب",t:"الاستماع والتعامل مع الاعتراض",src:"https://www.youtube.com/watch?v=aqz-KE-bpKQ"}],qs:[]}
];
var SYS=[
  {n:"Sindflow",x:"تنظيم مهام موظفي الشركة وتوزيعها ومتابعة تنفيذها.",u:"https://oracleapex.com/ords/r/sindbad_sal",icon:"قائمة",color:"#0A8BA0",st:"ظاهر"},
  {n:"Ayun",x:"متابعة سيارات النقل وحركة أسطول الشركة.",u:"https://server.ayunts.com/",icon:"موقع",color:"#383837",st:"ظاهر"},
  {n:"Dashboard",x:"نظام الإدارة الداخلية للشركة.",u:"https://www.sindbadom.work/admin/login",icon:"مبنى",color:"#0A8BA0",st:"ظاهر"},
  {n:"Project Manager",x:"إدارة مشاريع الشركة ومتابعة سير العمل.",u:"https://sindbadom.work/pm/login",icon:"مجلد",color:"#383837",st:"ظاهر"},
  {n:"Odoo",x:"تسجيل العملاء ومتابعتهم وإدارة المحاسبة.",u:"https://sindbad-home.odoo.com/odoo",icon:"رسم بياني",color:"#0A8BA0",st:"ظاهر"},
  {n:"مركز التدريب",x:"المنصات والأدلة وأخبار التدريب والمساعدة.",u:"",inner:true,icon:"تعليم",color:"#70CDDD",st:"ظاهر"}
];
var APPS=[{n:"Sindbad Care",who:"للعملاء والفنيين",x:"",gp:"https://play.google.com/",s:"Google Play",color:"#0A8BA0",st:"ظاهر"}];
var LINKS=[
  {n:"بريد السندباد",x:"بريدك الرسمي @sindbad.om داخل البوابة.",u:"",inner:true,icon:"بريد",color:"#0A8BA0",st:"ظاهر"},
  {n:"موقع السندباد",x:"الموقع الرسمي للعملاء والمنتجات.",u:"https://sindbadom.com/",icon:"موقع ويب",color:"#383837",st:"ظاهر"},
  {n:"خريطة الفروع",x:"مواقع الفروع لمشاركتها مع العملاء.",u:"https://www.google.com/maps/d/viewer",icon:"موقع",color:"#70CDDD",st:"ظاهر"}
];
var DOCS=[
  {n:"دليل الموظف العام",due:"2026-11-19",c:"اللوائح",v:3,ack:true,read:19,all:24,up:"2026-11-05"},
  {n:"دليل إجراءات المبيعات والتصميم",due:"2026-11-19",c:"المبيعات",v:2,ack:true,read:9,all:14,up:"2026-11-05"},
  {n:"دليل استخدام البوابة",due:"2026-11-26",c:"اللوائح",v:2,ack:true,read:4,all:6,up:"2026-11-05"},
  {n:"برنامج تدريب فريق المبيعات",due:"2026-11-30",c:"التدريب",v:1,ack:true,read:6,all:14,up:"2026-11-16"},
  {n:"دليل تطبيق OPPEIN Delivery Manager",due:"2026-12-07",c:"التدريب",v:1,ack:true,read:3,all:9,up:"2026-11-16"},
  {n:"سياسة الإجازات",c:"اللوائح",v:4,ack:false,read:0,all:0,up:"2026-10-20"},
  {n:"نموذج طلب عهدة",c:"النماذج",v:1,ack:false,read:0,all:0,up:"2026-09-14"},
  {n:"أساسيات تصميم المطابخ الحديثة",c:"كتب ومراجع",v:1,ack:false,read:0,all:24,up:"2026-11-18",author:"م. خالد الرواحي",bx:"مرجع عملي في توزيع المساحات واختيار الخامات، مع أمثلة مصوّرة لمطابخ منفّذة.",by:"أحمد صالح"},
  {n:"دليل القياسات القياسية للمطابخ",c:"كتب ومراجع",v:1,ack:false,read:0,all:24,up:"2026-11-23",author:"فريق OPPEIN الفني",bx:"جداول الارتفاعات والأعماق المعتمدة للخزائن والأسطح والأجهزة.",by:"عمر صادق",st:"بانتظار المراجعة"}
];
/* sample version history for the mockup */
var VNOTES=["أول إصدار.","تحديث سياسة الحضور والانصراف.","إضافة قسم البوابة الداخلية وتعديل أرقام التواصل.","مراجعة سنوية."];
function pdfMeta(k,v){return {file:"sindbad-doc-"+(k+1)+"-v"+v+".pdf",size:((k*37+v*53)%40/10+0.6).toFixed(1)+" MB",pages:(k*7+v*5)%28+4}}
function pdfChip(m){return '<span class="pdfrow"><span class="pdf" aria-hidden="true">PDF</span><span><span class="ltr">'+esc(m.file)+'</span><small>'+m.size.replace(" MB"," ميغابايت")+' · '+m.pages+' صفحة</small></span></span>'}
DOCS.forEach(function(d,k){d.note=VNOTES[Math.min(d.v,VNOTES.length)-1];var m=pdfMeta(k,d.v);d.file=m.file;d.size=m.size;d.pages=m.pages;d.hist=[];
  for(var i=1;i<d.v;i++){var h=pdfMeta(k,i);d.hist.push({v:i,up:"2026-0"+(5+i)+"-1"+i,note:VNOTES[i-1],file:h.file,size:h.size,pages:h.pages})}});
function totals(){
  var t={read:0,pend:0,late:0,people:0};
  D.depts.forEach(function(d){t.read+=d.read;t.pend+=d.pend;t.late+=d.late;if(!d.sent)t.people+=d.people});
  t.all=t.read+t.pend;t.pct=pc(t.read,t.all);
  console.assert(D.depts.every(function(d){return d.late<=d.pend}),"late must be part of pending");
  return t;
}

/* ---------- shell ---------- */
function setTheme(dark){
  if(dark)document.documentElement.setAttribute("data-theme","dark");else document.documentElement.removeAttribute("data-theme");
  try{localStorage.setItem("sb-theme",dark?"dark":"light")}catch(e){}
  var b=$("themeBtn");if(b){b.innerHTML=ic(dark?"sun":"moon");b.setAttribute("aria-label",dark?"المظهر الفاتح":"المظهر الغامق");b.title=b.getAttribute("aria-label")}
  var ti=$("themeItem");if(ti)ti.textContent=dark?"الوضع الفاتح":"الوضع الداكن";
}
try{if(localStorage.getItem("sb-theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}
function shell(){
  var here=location.pathname.split("/").pop()||"index.html",CHEV='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  /* what waits for the person using the dashboard, shown next to the page that holds it */
  function count(f){return f==="library.html"?DOCS.filter(function(d){return d.st==="بانتظار المراجعة"}).length:f==="employees.html"?D.reqs.length:f==="requests.html"?hrQueue():f==="complaints.html"?COMPL.filter(function(c){return c.st==="جديدة"}).length:0}
  function link(p){return '<a class="navl" href="'+p[0]+'"'+(p[0]===here?' aria-current="page"':'')+'><span><b>'+p[1]+'</b>'+(p[2]?'<small>'+p[2]+'</small>':'')+'</span>'+(count(p[0])?'<i>'+count(p[0])+'</i>':'')+'</a>'}
  function sideLink(p){return '<a href="'+p[0]+'" title="'+p[1]+'"'+(p[0]===here?' aria-current="page"':'')+'><em>'+ic(p[3],18)+'</em><span>'+p[1]+'</span>'+(count(p[0])?'<i>'+count(p[0])+'</i>':'')+'</a>'}
  var all=NAV.reduce(function(a,g){return a.concat(g.items||[g])},[]),title=(all.filter(function(p){return p[0]===here})[0]||all[0])[1],total=all.reduce(function(t,p){return t+count(p[0])},0);
  var grp=NAV.filter(function(g){return g.items&&g.items.some(function(p){return p[0]===here})})[0];
  var rd=noteRead(),unread=NOTES.filter(function(n){return !rd[n.id]}).length;
  $("top").className="top";
  $("top").innerHTML='<a class="pill brand" href="index.html" aria-label="السندباد — نظرة عامة"><span class="logo"></span></a>'+
    '<button class="pill navbtn" type="button" data-navsheet aria-haspopup="dialog">'+ic("list",18)+'<span>'+title+'</span>'+(total?'<b>'+total+'</b>':'')+CHEV+'</button>'+
    '<div class="crumb">'+(grp?'<span>'+grp.t+'</span><i>/</i>':'')+'<b>'+title+'</b></div>'+
    '<div class="pop-w gsw"><label class="gs"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="gq" type="search" autocomplete="off" placeholder="ابحث عن موظف أو مستند أو طلب أو خبر" aria-label="بحث في لوحة التحكم"></label><div class="pop gres" id="gres" hidden></div></div>'+
    '<button class="pill tool" id="themeBtn" type="button"></button>'+
    '<div class="pop-w"><button class="pill tool" type="button" data-pop="bellPop" aria-label="التنبيهات'+(unread?"، "+unread+" غير مقروءة":"")+'" title="التنبيهات">'+ic("bell")+(unread?'<i class="dot n">'+unread+'</i>':'')+'</button>'+
      '<div class="pop bell" id="bellPop" hidden><header><h3>التنبيهات</h3>'+(unread?'<span class="unc"><span class="n">'+unread+'</span> غير مقروءة</span><button type="button" class="lnk" data-readall>تعليم الكل كمقروء</button>':'<span class="unc">كلها مقروءة</span>')+'</header>'+
      '<div class="nlist">'+NOTES.map(function(n){var u=!rd[n.id];return '<a class="al'+(u?' un':'')+(n.tone?' '+n.tone:'')+'" href="'+n.go+'" data-note="'+n.id+'"><em>'+ic(n.ic,17)+'</em><span><b>'+n.t+'</b><small>'+n.x+'</small><time>'+n.at+'</time></span>'+(u?'<i class="und" title="غير مقروء"></i>':'')+'</a>'}).join("")+'</div></div></div>'+
    '<div class="pop-w"><button class="pill user" type="button" data-pop="userPop" aria-label="حسابي"><span class="av" aria-hidden="true">م</span><div><b>محمد حسام</b><small>مدير النظام</small></div></button>'+
      '<div class="pop" id="userPop" hidden><b>محمد حسام</b><div class="m">'+ltr("mohamed.hegazy@sindbad.om")+'</div><div class="menu"><a href="https://sindbadportal.com/" target="_blank" rel="noopener">عرض البوابة <span class="ltr m">sindbadportal.com</span></a><button type="button" id="themeItem">الوضع الداكن</button><button type="button" data-mock="تسجيل الخروج من لوحة التحكم">تسجيل الخروج</button></div></div></div>';
  /* Side navigation, fifth pass (checked in Mohamed's own Chrome, 1536x826 at 125%): the icon rail was cut off at the
     bottom and its 11px names were hard to read. Full names again; only the list of pages scrolls, the foot stays in view. */
  var sd=$("side");if(!sd){sd=document.createElement("aside");sd.id="side";sd.className="side";document.body.insertBefore(sd,document.body.firstChild)}
  function raw(d,n){return '<svg width="'+n+'" height="'+n+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d+'"/></svg>'}
  function sideLink(p){return '<a href="'+p[0]+'"'+(p[0]===here?' aria-current="page"':'')+'>'+ic(p[3],20)+'<span>'+p[1]+'</span>'+(count(p[0])?'<i>'+count(p[0])+'</i>':'')+'</a>'}
  sd.innerHTML='<a class="sbrand" href="index.html" aria-label="السندباد — نظرة عامة"><span class="logo"></span><small>لوحة التحكم</small></a>'+
    '<nav aria-label="الأقسام">'+NAV.map(function(g){return g.items?'<h3>'+g.t+'</h3>'+g.items.map(sideLink).join(""):sideLink(g)}).join("")+'</nav>'+
    '<div class="sfoot"><a class="sportal" href="https://sindbadportal.com/" target="_blank" rel="noopener">'+raw("M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4",18)+'<span>عرض البوابة</span></a>'+
      '<div class="sme"><span class="av" aria-hidden="true">م</span><div><b>محمد حسام</b><small>مدير النظام</small></div>'+
      '<button type="button" data-mock="تسجيل الخروج من لوحة التحكم" aria-label="تسجيل الخروج" title="تسجيل الخروج">'+raw("M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H4",18)+'</button></div></div>';
  var cur=sd.querySelector("[aria-current]");if(cur)cur.scrollIntoView({block:"nearest"});
  var old=$("navPick");if(old)old.remove();
  var oldT=$("tilePick");if(oldT)oldT.remove();delete document.body.dataset.tiles;
  var sh=$("navSheet");if(!sh){sh=document.createElement("dialog");sh.id="navSheet";sh.className="navsheet";document.body.appendChild(sh);
    sh.addEventListener("click",function(e){if(e.target===sh||e.target.closest("[data-close]"))sh.close()})}
  sh.innerHTML='<header><b>القائمة</b><button type="button" class="pill tool" data-close aria-label="إغلاق">×</button></header>'+
    NAV.map(function(g){return g.items?'<h3>'+g.t+'</h3>'+g.items.map(link).join(""):link(g)}).join("");
  $("top").querySelector("[data-navsheet]").onclick=function(){sh.showModal()};
  /* search across what the dashboard holds; a result opens the page that lists it */
  $("gq").oninput=function(){
    var q=this.value.trim().toLowerCase(),box=$("gres");if(q.length<2){box.hidden=true;return}
    var hit=[];function add(list,text,sub,page,kind){list.forEach(function(x){if(hit.length<8&&text(x).toLowerCase().indexOf(q)>-1)hit.push('<a class="navl" href="'+page+'"><span><b>'+esc(text(x))+'</b><small>'+esc(sub(x))+'</small></span><i>'+kind+'</i></a>')})}
    add(all,function(p){return p[1]},function(p){return p[2]||"الصفحة الرئيسية للوحة"},"","صفحة");
    hit=hit.map(function(h,i){return h.replace('href=""','href="'+all.filter(function(p){return p[1].toLowerCase().indexOf(q)>-1})[i][0]+'"')});
    add(EMPS,function(e){return e.name},function(e){return e.dept+" — "+e.job},"employees.html","موظف");
    add(DOCS,function(d){return d.n},function(d){return d.c},"library.html","مستند");
    add(COMPL,function(c){return c.code},function(c){return (c.kind||"شكوى")+" — "+c.cat+" — "+c.st},"complaints.html","رسالة");
    add(REQS,function(r){return r.no+" "+r.name},function(r){return r.type+" — "+r.st},"requests.html","طلب");
    add(NEWS,function(n){return n.t},function(n){return n.cat||"خبر"},"news.html","خبر");
    add(TRAIN,function(p){return p.n},function(p){return p.tab+" — "+p.st},"training.html","تدريب");
    add(SLIDES,function(x){return x.n},function(x){return x.tag},"slides.html","تذكير");
    box.innerHTML=hit.length?hit.join(""):'<p class="m" style="padding:10px 14px">لا توجد نتائج لهذا البحث.</p>';box.hidden=false};
  /* opening a notification marks it read; "mark all" keeps the menu open so the change is seen */
  $("bellPop").addEventListener("click",function(e){
    var n=e.target.closest("[data-note]");if(n)markRead([n.dataset.note]);
    if(e.target.closest("[data-readall]")){markRead(NOTES.map(function(x){return x.id}));shell();$("bellPop").hidden=false}});
  setTheme(document.documentElement.getAttribute("data-theme")==="dark");
  $("themeBtn").addEventListener("click",function(){setTheme(document.documentElement.getAttribute("data-theme")!=="dark")});
  $("themeItem").addEventListener("click",function(){setTheme(document.documentElement.getAttribute("data-theme")!=="dark")});
}
document.addEventListener("click",function(e){
  var pb=e.target.closest("[data-pop]"),inside=e.target.closest(".pop");
  document.querySelectorAll(".pop").forEach(function(p){if(pb&&p.id===pb.dataset.pop)p.hidden=!p.hidden;else if(!inside)p.hidden=true});
  var m=e.target.closest("[data-mock]");if(m){e.preventDefault();toast("في النموذج فقط: "+m.dataset.mock)}
});
document.addEventListener("DOMContentLoaded",function(){
  var t=document.createElement("div");t.className="toast";t.id="toast";t.setAttribute("role","status");document.body.appendChild(t);
  shell();if(window.render)render();
});

/* the one counter (see .pgx in ui.css): done of all, what is counted, percentage, bar */
function prog(done,all,label){var p=pc(done,all);
  return '<div class="pgx" title="'+done+' من '+all+' '+label+'"><div class="t"><span><b class="n">'+done+'</b> من <b class="n">'+all+'</b></span><small>'+label+'</small></div><span class="pcx">'+p+'%</span><div class="track thin"><i style="width:'+p+'%"></i></div></div>'}

/* the empty state (see .nil in ui.css) */
function nil(title,sub,icon){return '<div class="nil"><i>'+ic(icon||"check",20)+'</i><b>'+title+'</b>'+(sub?'<span>'+sub+'</span>':'')+'</div>'}

/* alerts sent from the dashboard (Mohamed 2026-11-25): anything, to anyone, by portal notification and/or WhatsApp.
   kind = one of AKINDS, ref = the linked document / news item / training when the kind has one, ch = channels, seen = how many opened it */
var AKINDS=["رسالة","تذكير بمستند","تذكير بخبر","تذكير بتدريب","تذكير باستكمال الملف الشخصي"];
var ALERTS=[
  {t:"اجتماع عام يوم الخميس",x:"ندعوكم لحضور الاجتماع العام يوم الخميس الساعة 10 صباحًا في المكتب الرئيسي.",xen:"You are invited to the general meeting on Thursday at 10 AM in the head office.",kind:"رسالة",ch:{push:true,wa:true},st:"مجدول",at:"2026-11-25 08:00"},
  {t:"تذكير بقراءة مستند",x:"نذكّركم بقراءة «دليل الموظف العام» والإقرار به من مكتبة البوابة.",kind:"تذكير بمستند",ref:"دليل الموظف العام",ch:{push:true,wa:true},st:"أُرسل",at:"2026-11-21 09:30",seen:7},
  {t:"صيانة البوابة مساء الجمعة",x:"ستتوقف البوابة للصيانة يوم الجمعة من 10 إلى 11 مساءً.",xen:"The portal will be down for maintenance on Friday from 10 to 11 PM.",kind:"رسالة",ch:{push:true,wa:false},st:"أُرسل",at:"2026-11-19 14:05",seen:9},
  {t:"تذكير بإتمام تدريب",x:"نذكّركم بإتمام تدريب «منتجات مطابخ OPPEIN 2026» والإجابة عن أسئلته قبل موعده.",kind:"تذكير بتدريب",ref:"منتجات مطابخ OPPEIN 2026",ch:{push:false,wa:true},st:"أُرسل",at:"2026-11-18 11:00",seen:4,aud:{on:["dept:العذيبة","dept:صلالة"]}},
  {t:"استكمال الملف الشخصي",x:"نرجو استكمال بيانات ومستندات ملفكم الشخصي من صفحة «حسابي» في البوابة.",kind:"تذكير باستكمال الملف الشخصي",ch:{push:true,wa:true},st:"مسودة"}
];

/* every document that needs an acknowledgement carries its own deadline (Mohamed 2026-11-25), instead of one fixed 14 days */
function dueTxt(due){var d=Math.round((new Date(due)-new Date(TODAY))/864e5);
  return d<0?'<span class="chip bad">انتهى الموعد</span>':'<span class="chip s">'+(d===0?'ينتهي اليوم':d===1?'باقٍ يوم واحد':d===2?'باقٍ يومان':'باقٍ '+d+(d<=10?' أيام':' يومًا'))+'</span>'}

/* portal home settings (Mohamed 2026-11-25): the parts of the home that had no control in the dashboard.
   secs = the home sections in their order (st ظاهر/مخفي, go = the page that manages the content); hours = one row per day */
var HOME={img:"kitchen.jpg",
  secs:[{n:"الواجهة والتذكيرات",x:"الصورة والتحية وشريط التذكيرات المتحرك.",go:"slides.html",gl:"التذكيرات",st:"ظاهر",s:1,fix:1},
    {n:"دوام اليوم",x:"بطاقة تعرض ساعات العمل اليوم.",st:"ظاهر",s:1},
    {n:"مطلوب منك",x:"المستندات التي تنتظر إقرار الموظف.",go:"acks.html",gl:"إقرارات القراءة",st:"ظاهر",s:1},
    {n:"آخر الأخبار",x:"الخبر الرئيسي وأحدث الأخبار.",go:"news.html",gl:"الأخبار",st:"ظاهر",s:1},
    {n:"الأكثر استخدامًا",x:"اختصارات الأنظمة التي يفتحها الموظفون كثيرًا.",go:"systems.html",gl:"الأنظمة",st:"ظاهر",s:1},
    {n:"أهم المستندات",x:"أحدث مستندات المكتبة الموجَّهة للموظف.",go:"library.html",gl:"المكتبة",st:"ظاهر",s:1},
    {n:"موظف الشهر",x:"بطاقة موظف الشهر والأعلى مبيعًا.",go:"honors.html",gl:"التكريم",st:"ظاهر",s:1},
    {n:"مسارات الأدوار",x:"بطاقات تختصر الطريق لكل دور: مبيعات، تصميم، تركيب.",st:"مخفي",s:1}],
  hours:[["السبت",1,"08:00","17:00"],["الأحد",1,"08:00","17:00"],["الاثنين",1,"08:00","17:00"],["الثلاثاء",1,"08:00","17:00"],["الأربعاء",1,"08:00","17:00"],["الخميس",1,"08:00","14:00"],["الجمعة",0,"",""]].map(function(d){return {d:d[0],on:!!d[1],from:d[2],to:d[3]}}),
  most:{auto:false,list:["Sindflow","Ayun","Dashboard","Project Manager"]}};

var MON=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
function dmy(s){var p=String(s).slice(0,10).split("-");return (+p[2])+" "+MON[p[1]-1]+" "+p[0]}
console.assert(dmy("2026-11-06")==="6 نوفمبر 2026");
