/* Drawer forms for the dashboard v2.0 mockups. Fields mirror the live dashboard forms (58284 p3, p6, p7, p8), read on Dev 2026-11-22. Loaded after ui.js. */
var BRANCHES=["المكتب الرئيسي","العذيبة","صلالة","عبري"],JOBS=["مدير التسويق","مصمم","مطور ويب","أخصائي تسويق","فني تركيب","مشرف توصيل","مبيعات"];
var CATS=["التدريب","اللوائح","المبيعات","المهام الوظيفية","النماذج","الهوية","كتب ومراجع"],BOOK="كتب ومراجع",ME="محمد حسام",NCATS=["التدريب","المبيعات","الموارد البشرية","عام"];
var ROLES=["بدون دور","الموارد البشرية","الإدارة","مدير النظام"];
var ICON_NAMES=["شبكة","قائمة","مبنى","مجلد","رسم بياني","موقع","تعليم","بريد","موقع ويب","بصمة","موظفون","ملف","تقويم","ساعة","حماية","نجمة","قلب","رابط","عملة","هاتف"];
var COLORS=["#0A8BA0","#70CDDD","#CFDD28","#383837"];
/* the 17 dashboard permissions, as listed in the live employee drawer; [name, granted by HR role, granted by management role] */
var PERMS=[["عرض النظرة العامة",1,1],["عرض الموظفين",1,1],["تعديل وتفعيل الموظفين",1,0],["اعتماد أو رفض التسجيل",1,0],["حذف حساب الدخول",0,0],["عرض مستندات الموظفين",1,0],["اعتماد أو رفض مستندات الموظفين",1,0],["عرض الحساب البنكي للموظفين",1,0],["عرض الطلبات",1,1],["اعتماد أو رفض الطلبات",1,0],["عرض تقرير إقرارات القراءة",1,1],["إدارة المستندات",1,0],["إدارة الأخبار",1,0],["إدارة الأنظمة والروابط",0,0],["عرض سجل النشاط",0,1],["دخول لوحة التحكم",1,1],["إدارة الأدوار والصلاحيات",0,0]];
var EMP_FILES=["شهادة المؤهل الدراسي","شهادة الميلاد","صحيفة الحالة الجنائية","الصور الشخصية","شهادات الخبرة والدورات","صورة الإقامة","صور جواز السفر","رقم الحساب البنكي (IBAN)"];
/* Profile completeness (Mohamed 2026-11-24: «نسبة اكتمال الملف الشخصي دا مهم جدا»): the two basic fields an employee
   fills in, one personal link, plus the eight required documents, each counted once. prof(e) = {done, all, miss:[labels], items}.
   shortcut: sample values per employee until real data exists; replace profSeed with the real columns and uploads. */
var PROF_BASIC=[["en","الاسم بالإنجليزي"],["phone","الرقم الشخصي"]];
function profSeed(e){if(e.files)return;var k=EMPS.indexOf(e),n=[8,8,5,6,2,0,7,3,8,4][k%10];e.files={};for(var i=0;i<n;i++)e.files[i]=1;
  if(e.en==null&&k%4!==3)e.en=String(e.mail||"").split("@")[0].split(".").map(function(w){return w.charAt(0).toUpperCase()+w.slice(1)}).join(" ");
  if(e.phone==null&&k%5!==4)e.phone="9"+String(2100000+k*7919);
  if(e.li==null&&e.site==null&&k%3!==2)e.li="https://www.linkedin.com/in/"+String(e.mail||"").split("@")[0].replace(/\./g,"-")}
function prof(e){profSeed(e);
  var items=PROF_BASIC.map(function(b){return {n:b[1],ok:!!String(e[b[0]]||"").trim(),kind:"بيان"}})
    /* one personal link is enough: LinkedIn or a portfolio / personal site (counted since Mohamed's «تتحسب», 2026-11-24) */
    .concat([{n:"رابط شخصي",ok:!!String(e.li||e.site||"").trim(),kind:"بيان"}]).concat(EMP_FILES.map(function(n,i){return {n:n,ok:!!e.files[i],kind:"مستند"}}));
  var miss=items.filter(function(x){return !x.ok}).map(function(x){return x.n});
  return {items:items,all:items.length,done:items.length-miss.length,miss:miss}}
function fld(label,html,hint){return '<label class="f"><span>'+label+'</span>'+html+(hint?'<small>'+hint+'</small>':'')+'</label>'}
function inp(name,val,attrs){return '<input class="in" name="'+name+'" value="'+esc(val)+'" '+(attrs||"")+'>'}
function txt(name,val,attrs){return '<textarea class="in" name="'+name+'" '+(attrs||"")+'>'+esc(val)+'</textarea>'}
function sel(name,opts,val){return '<select class="in" name="'+name+'">'+opts.map(function(o){return '<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>'}).join("")+'</select>'}
function sw(name,label,on,hint,attrs){return '<label class="sw"><input type="checkbox" name="'+name+'"'+(on?' checked':'')+' '+(attrs||"")+'><i></i><span><b>'+label+'</b>'+(hint?'<small>'+hint+'</small>':'')+'</span></label>'}
function req(msg){return 'data-req="'+msg+'"'}
/* file fields: dress every .drop once (icon tile or picture stage + our own button), then show what was picked.
   data-cur on the label = the picture already saved, shown from the start. */
var DZ_IMG='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ICONS.image+'"/></svg>',
    DZ_DOC='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V5M7 10l5-5 5 5M5 19h14"/></svg>';
function dressDrop(l){
  if(l.querySelector(".dz-pv"))return;
  var img=/image/.test(l.querySelector("input[type=file]").accept)&&l.dataset.fit!=="thumb",cur=l.dataset.cur;
  l.classList.add(img?"img":"doc");if(cur)l.classList.add("has");
  l.insertAdjacentHTML("afterbegin",'<span class="dz-pv"'+(cur?' style="background-image:url(\''+cur+'\')"':'')+'>'+(img?DZ_IMG+'<i>اسحب الصورة إلى هنا أو اخترها</i>':DZ_DOC+'<i>اسحب الملف إلى هنا أو اختره</i>')+'</span>');
  l.insertAdjacentHTML("beforeend",'<span class="dz-btn">'+(cur?'تغيير الصورة':/image/.test(l.querySelector("input[type=file]").accept)?'اختيار صورة':'اختيار ملف')+'</span>');
  l.dataset.hint=l.querySelector("small").textContent;
  ["dragenter","dragover"].forEach(function(t){l.addEventListener(t,function(){l.classList.add("over")})});
  ["dragleave","drop"].forEach(function(t){l.addEventListener(t,function(){l.classList.remove("over")})});
}
function pickedFile(l,file){
  var pv=l.querySelector(".dz-pv"),img=l.classList.contains("img"),sm=l.querySelector("small");
  if(l._url){URL.revokeObjectURL(l._url);l._url=null}
  if(!file){if(!l.dataset.cur){l.classList.remove("has");pv.style.backgroundImage=""}else pv.style.backgroundImage="url('"+l.dataset.cur+"')";
    if(!img&&pv.querySelector("i"))pv.querySelector("i").textContent="اسحب الملف إلى هنا أو اختره";sm.textContent=l.dataset.hint;sm.removeAttribute("dir");l.querySelector(".dz-btn").textContent=l.dataset.cur?"تغيير الصورة":img?"اختيار صورة":"اختيار ملف";return}
  l.classList.add("has");if(!img){var st=pv.querySelector("i");if(st)st.textContent="تم اختيار الملف"}
  if(/^image\//.test(file.type)){l._url=URL.createObjectURL(file);pv.style.backgroundImage="url('"+l._url+"')"}
  var kb=file.size/1024;
  sm.innerHTML='<bdi dir="ltr">'+esc(file.name)+'</bdi> · '+(kb<1024?Math.max(1,Math.round(kb))+" كيلوبايت":(kb/1024).toFixed(1)+" ميغابايت");
  l.querySelector(".dz-btn").textContent=/^image/.test(file.type)?"تغيير الصورة":"تغيير الملف";
}
function two(a,b){return '<div class="row2">'+a+b+'</div>'}
function colorFld(val){val=val||COLORS[0];return '<div class="f"><span>اللون</span><div class="colors">'+COLORS.map(function(c){return '<label><input type="radio" name="color" value="'+c+'"'+(c===val?' checked':'')+'><i style="background:'+c+'"></i></label>'}).join("")+'<input type="color" name="colorX" value="'+(COLORS.indexOf(val)<0?val:"#0A8BA0")+'" aria-label="لون مخصص" title="لون مخصص"></div></div>'}
function pickColor(f){var r=f.querySelector("[name=color]:checked");return r?r.value:f.colorX.value}
function uniq(a){return a.filter(function(v,i){return v&&a.indexOf(v)===i})}
/* Audience picker (Mohamed, 2026-11-22: "زي الواتساب"): category buttons tick their members in one list;
   unticking someone inside a category is an exclusion, ticking someone outside is an individual addition.
   Categories stay dynamic (a new hire in the department is included); only additions and exclusions are stored by name.
   The mockup computes on the sample EMPS; in APEX this is SINDBAD_LIB.can_view. */
function audCats(){
  var c=[{id:"all",g:"عام",label:"جميع الموظفين",f:function(){return true}},
         {id:"lead",g:"عام",label:"المديرون المباشرون",f:function(e){return D.depts.some(function(d){return d.lead===e.name})}}];
  [["dept","الأقسام"],["branch","الفروع"],["job","الوظائف"]].forEach(function(k){
    uniq(EMPS.map(function(e){return e[k[0]]})).forEach(function(v){c.push({id:k[0]+":"+v,g:k[1],label:v,f:function(e){return e[k[0]]===v}})})});
  return c;
}
function audCalc(a){
  var cats=audCats().filter(function(c){return a.on[c.id]});
  var rows=EMPS.map(function(e){var hit=cats.filter(function(c){return c.f(e)}),inside=hit.length>0;
    return {e:e,inside:inside,cat:inside?hit[0].label:"",chk:inside?!a.minus[e.name]:!!a.plus[e.name]}});
  return {cats:cats,rows:rows,see:rows.filter(function(r){return r.chk}),
          add:rows.filter(function(r){return !r.inside&&r.chk}),exc:rows.filter(function(r){return r.inside&&!r.chk})};
}
function audState(v){var a={on:{},plus:{},minus:{}};v=v||{on:["all"]};
  ["on","plus","minus"].forEach(function(k){(v[k]||[]).forEach(function(x){a[k][x]=1})});return a}
function audCount(v){return audCalc(audState(v)).see.length}
function mkAudience(v){
  var a=audState(v),A={};
  A.html='<div class="aud"><div class="audside"><div id="audCats"></div><div class="sum" id="audSum" aria-live="polite"></div></div>'+
    '<div class="audmain"><div class="bar"><input class="field" name="audq" type="search" placeholder="ابحث بالاسم أو القسم أو الوظيفة" aria-label="بحث في الموظفين">'+
    '<label class="pick"><input type="checkbox" name="audonly"> عرض المختارين فقط</label></div><div class="audlist" id="audList"></div></div></div>';
  A.calc=function(){return audCalc(a)};
  A.value=function(){return {on:Object.keys(a.on),plus:Object.keys(a.plus),minus:Object.keys(a.minus)}};
  A.draw=function(f){
    var r=audCalc(a),groups={},order=[],q=f.audq.value.trim(),only=f.audonly.checked,last="";
    /* drop overrides that no longer mean anything after a category change */
    r.rows.forEach(function(x){if(x.inside)delete a.plus[x.e.name];else delete a.minus[x.e.name]});
    audCats().forEach(function(c){if(!groups[c.g]){groups[c.g]=[];order.push(c.g)}groups[c.g].push(c)});
    f.querySelector("#audCats").innerHTML=order.map(function(g){return '<div class="audg"><span>'+g+'</span><div class="picks">'+groups[g].map(function(c){
      return '<button type="button" class="catb" data-cat="'+esc(c.id)+'" aria-pressed="'+!!a.on[c.id]+'">'+esc(c.label)+'</button>'}).join("")+'</div></div>'}).join("");
    f.querySelector("#audSum").innerHTML='<div class="sumh"><div><small>سيظهر لـ</small><b><span class="n">'+r.see.length+'</span> من '+EMPS.length+' موظفين</b></div><span class="n sump">'+pc(r.see.length,EMPS.length)+'%</span></div>'+
      '<div class="track thin"><i style="width:'+pc(r.see.length,EMPS.length)+'%"></i></div>'+
      (r.see.length?'<div class="sumc">'+r.cats.map(function(c){return '<span class="chip s">'+esc(c.label)+'</span>'}).join("")+
        (r.add.length?'<span class="chip">+ '+r.add.length+' إضافة فردية</span>':'')+(r.exc.length?'<span class="chip k">− '+r.exc.length+' مستثنى</span>':'')+'</div>'
       :'<div class="err">اختر فئة واحدة على الأقل أو حدّد موظفين من القائمة.</div>');
    var list=r.rows.filter(function(x){return (!only||x.chk)&&(!q||(x.e.name+x.e.dept+x.e.job+x.e.branch).indexOf(q)>-1)})
      .sort(function(x,y){return x.e.dept<y.e.dept?-1:x.e.dept>y.e.dept?1:0});
    f.querySelector("#audList").innerHTML=list.length?list.map(function(x){
      var head=x.e.dept!==last?'<div class="audh">'+esc(x.e.dept)+'</div>':'';last=x.e.dept;
      var tag=x.inside?(x.chk?'<span class="chip d">'+esc(x.cat)+'</span>':'<span class="chip k">مستثنى</span>'):(x.chk?'<span class="chip">إضافة فردية</span>':'');
      return head+'<label class="audr'+(x.inside&&!x.chk?' out':'')+'"><input type="checkbox" data-emp="'+esc(x.e.name)+'"'+(x.chk?' checked':'')+'>'+av(x.e.name)+
        '<span class="audn"><b>'+esc(x.e.name)+'</b><small>'+esc(x.e.job)+' · '+esc(x.e.branch)+'</small></span>'+tag+'</label>'}).join(""):
      '<p class="empty">'+(only?'لم يُحدَّد أي موظف بعد.':'لا يوجد موظفون بهذا البحث.')+'</p>';
  };
  A.bind=function(f){
    f.addEventListener("click",function(ev){var b=ev.target.closest("[data-cat]");if(!b)return;
      var id=b.dataset.cat;if(a.on[id])delete a.on[id];else{a.on[id]=1;if(id==="all"){a.on={all:1}}else delete a.on.all}A.draw(f)});
    f.addEventListener("input",function(ev){var n=ev.target.dataset.emp;if(n==null)return;
      var x=audCalc(a).rows.filter(function(r){return r.e.name===n})[0];
      if(x.inside){if(ev.target.checked)delete a.minus[n];else a.minus[n]=1}else{if(ev.target.checked)a.plus[n]=1;else delete a.plus[n]}});
  };
  A.check=function(f){if(!audCalc(a).see.length){f.audq.focus();return "لن يظهر لأحد. اختر فئة أو حدّد موظفين."}};
  return A;
}
function docForm(d){
  d=d||{};var isNew=!d.n,A=mkAudience(d.aud);
  /* two equal columns whose rows line up (layout 1 of 3, chosen by Mohamed 2026-11-25). One description field for every
     document instead of «ما الجديد في الإصدار؟» (his call, same day); for a book it is the book's description and is required. */
  var lay='<div class="fs"><h3>بيانات المستند</h3>'+two(fld("اسم المستند بالعربي",inp("n",d.n,req("اكتب اسم المستند"))),fld("اسم المستند بالإنجليزي",inp("en",d.en,'dir="ltr"')))+
      /* books and references only (Mohamed 2026-11-24): who wrote it, and who uploaded it */
      '<div class="row2" id="catRow">'+fld("التصنيف",sel("c",CATS,d.c))+'<label class="f" id="bookRow"><span>مؤلف الكتاب</span>'+inp("author",d.author)+'</label></div>'+
      '<label class="f grow"><span id="bxL">الوصف</span>'+txt("bx",d.bx,'rows="2" maxlength="220" placeholder="سطران على الأكثر، يظهران للموظف تحت اسم المستند."')+'</label>'+
      '<p class="m" id="byL" style="font-size:var(--t-sm)">'+(isNew?'سيُسجَّل الكتاب باسم من رفعه: '+ME+'.':'رفعه: '+esc(d.by||ME)+' · '+ltr(d.up))+'</p></div>'+
    '<div class="fs"><h3>الإقرار والملف</h3>'+two(fld("إقرار القراءة",sel("ack",["مطلوب","غير مطلوب"],d.ack===false?"غير مطلوب":"مطلوب")),
        '<label class="f"><span id="dueL"></span><input class="in" type="date" name="due" value="'+esc(d.due||"")+'"></label>')+
      '<div class="row2 grow2"><div class="f grow"><span>صورة الغلاف</span><label class="drop"'+(d.cv?' data-cur="'+esc(d.cv)+'"':'')+'><b>صورة الغلاف</b><small>JPG أو PNG أو WEBP، أقل من 5 ميغابايت.</small><input type="file" name="cover" accept="image/jpeg,image/png,image/webp"'+(d.cv?'':' data-req="ارفع صورة الغلاف للمستند"')+'></label></div>'+
      (isNew?'<div class="f grow"><span>الملف</span><label class="drop"><b>ملف PDF</b><small>سيكون هذا الملف الإصدار 1.</small><input type="file" name="file" accept="application/pdf" data-req="اختر ملف PDF للمستند"></label></div>':
        /* the file as it stands, built like the upload box beside it: what it is on the stage, what you can do with it under */
        '<div class="f grow"><span>الملف</span><div class="vnow"><div class="vst">'+ic("doc",22)+'<bdi dir="ltr">'+esc(d.file)+'</bdi><small>'+String(d.size).replace(" MB"," ميغابايت")+' · '+d.pages+' صفحة</small></div>'+
          '<p class="vln"><b>الإصدار الحالي <span class="n">'+d.v+'</span></b><span>آخر تحديث '+dmy(d.up)+'</span></p>'+
          '<div class="vac"><button type="button" class="btn sm k" data-newver>رفع إصدار جديد</button><button type="button" class="btn sm" data-mock="تنزيل «'+esc(d.file)+'»">تنزيل</button></div></div></div>')+'</div></div>';
  return {title:isNew?"مستند جديد":"تعديل مستند",saveLabel:isNew?"إضافة كمستند جديد":"حفظ",html:
    lay+
    '<div class="fs wide" data-step="2">'+A.html+'</div>',
    steps:["بيانات المستند","لمن يظهر"],isNew:isNew,
    init:function(f){A.draw(f);var bk=f.c.value===BOOK;f.querySelector("#bookRow").style.display=f.querySelector("#byL").style.display=bk?"":"none";
      f.querySelector("#catRow").style.gridTemplateColumns=bk?"":"minmax(0,1fr)";f.querySelector("#bxL").textContent=bk?"وصف الكتاب":"الوصف";
      [["author","اكتب اسم مؤلف الكتاب"],["bx","اكتب وصفًا مختصرًا للكتاب"]].forEach(function(k){if(bk)f[k[0]].dataset.req=k[1];else delete f[k[0]].dataset.req})},
    bind:function(f){A.bind(f);function due(){var on=f.ack.value==="مطلوب";f.due.disabled=!on;f.querySelector("#dueL").textContent=on?"آخر موعد للإقرار":"آخر موعد (الإقرار غير مطلوب)";if(on)f.due.dataset.req="حدّد آخر موعد للإقرار";else delete f.due.dataset.req}
      due();f.ack.addEventListener("change",due);
      var nv=f.querySelector("[data-newver]");if(nv)nv.onclick=function(){if(!f.querySelector("#dirty").hidden){toast("احفظ التغييرات أولًا، ثم ارفع الإصدار الجديد.");return}openForm("docv",d)}},check:function(f){return A.check(f)},
    save:function(f){
      var r=A.calc(),ack=f.ack.value==="مطلوب",bk=f.c.value===BOOK,au=bk?f.author.value.trim():"",bx=f.bx.value.trim();
      if(!isNew){d.n=f.n.value;d.c=f.c.value;d.ack=ack;d.due=ack?f.due.value:"";d.aud=A.value();d.author=au;d.bx=bx;if(bk&&!d.by)d.by=ME;if(f.cover.files[0])d.cv=URL.createObjectURL(f.cover.files[0]);}
      else{var nm=pdfMeta(DOCS.length,1);DOCS.unshift({cv:URL.createObjectURL(f.cover.files[0]),due:ack?f.due.value:"",n:f.n.value,c:f.c.value,v:1,ack:ack,read:0,all:r.see.length,up:"2026-11-22",note:"",file:nm.file,size:nm.size,pages:nm.pages,hist:[],aud:A.value(),author:au,bx:bx,by:bk?ME:""})}
      return "تم الحفظ — المستند ظاهر الآن لـ "+r.see.length+" موظفين"+(r.exc.length?" (مستثنى "+r.exc.length+")":"")+".";
    }};
}
function newsForm(x){
  x=x||{};var A=mkAudience(x.aud);
  return {title:x.t?"تعديل خبر":"خبر جديد",saveLabel:"حفظ الخبر",html:
    '<div class="fs"><h3>الخبر</h3>'+fld("التصنيف",sel("cat",NCATS,x.cat||"عام"))+two(fld("العنوان بالعربي",inp("t",x.t,req("اكتب عنوان الخبر"))),fld("العنوان بالإنجليزي",inp("ten",x.ten,'dir="ltr"')))+
      fld("النص بالعربي",txt("x",x.x,req("اكتب نص الخبر")))+fld("النص بالإنجليزي",txt("xen",x.xen,'dir="ltr"'))+
      two(fld("رابط مع الخبر (اختياري)",inp("u",x.u,'dir="ltr" inputmode="url" placeholder="https://"'),"يظهر في الخبر زر يفتح هذا الرابط."),fld("نص زر الرابط",inp("ub",x.ub,'placeholder="فتح الرابط"'),"يُترك فارغًا فيُكتب «فتح الرابط»."))+'</div>'+
    '<div class="stackc"><div class="fs"><h3>النشر</h3>'+two(fld("حالة النشر",sel("pub",["مسودة","منشور"],x.st||"منشور"),"المسودة لا تظهر للموظفين."),fld("الخبر الرئيسي",sel("main",["لا","نعم — هذا هو الخبر الرئيسي"],x.main?"نعم — هذا هو الخبر الرئيسي":"لا"),"خبر واحد فقط في البوابة."))+
      fld("تأكيد الاطلاع",sel("ackn",["غير مطلوب","مطلوب"],x.ack?"مطلوب":"غير مطلوب"),"عند طلبه يضغط الموظف «اطّلعت» على الخبر، ويظهر في المتابعة من اطّلع ومن لم يطّلع.")+'</div>'+
    '<div class="fs grow"><h3>صورة الخبر</h3><label class="drop"'+(x.img?' data-cur="assets/news/'+esc(x.img)+'"':'')+'><b>صورة الغلاف</b><small>JPG أو PNG أو WEBP — أقل من 5 ميغابايت.'+(x.t?" اتركه فارغًا إن لم ترغب في تغيير الصورة الحالية.":"")+'</small><input type="file" name="img" accept="image/jpeg,image/png,image/webp"></label></div></div>'+
    '<div class="fs wide" data-step="2">'+A.html+'</div>',
    steps:["الخبر","لمن يظهر"],isNew:!x.t,
    init:function(f){A.draw(f)},bind:function(f){A.bind(f)},check:function(f){return A.check(f)},
    save:function(f){var o=x,r=A.calc();if(!x.t)NEWS.unshift(x);
      o.t=f.t.value;o.x=f.x.value;o.u=f.u.value.trim();o.ub=o.u?f.ub.value.trim():"";o.cat=f.cat.value;o.st=f.pub.value;o.date=o.date||"2026-11-22";o.aud=A.value();o.ack=f.ackn.value==="مطلوب";o.seen=o.seen||0;
      if(f.main.value!=="لا")NEWS.forEach(function(k){k.main=k===o});else o.main=false;
      return o.st==="منشور"?"تم الحفظ — الخبر منشور ويظهر لـ "+r.see.length+" موظفين.":"تم الحفظ كمسودة — غير ظاهر للموظفين."}};
}
/* shared by systems and extra links: same fields as the live form */
/* Browsing an employee's profile documents (Mohamed 2026-11-24: «اقدر استعرض ملفات الملف الشخصى»): a window over
   the employee window, list of the eight documents beside the one being looked at, previous / next between the
   uploaded ones. shortcut: the page shown is a placeholder and the file facts are sample values; in APEX the pane
   shows the real PDF or picture. */
var FILE_EN=["qualification","birth-certificate","police-clearance","photos","experience","residence","passport","iban"];
function fileMeta(e,i){var img=i===3||i===6,k=EMPS.indexOf(e)+i;
  return {file:(FILE_EN[i]||"document")+"-"+(EMPS.indexOf(e)+1)+(img?".jpg":".pdf"),type:img?"صورة JPG":"ملف PDF",size:[0.4,1.2,0.8,2.1,1.6,0.6,1.9,0.3][k%8]+" ميغابايت",up:"2026-"+(k%2?"10":"11")+"-"+("0"+(3+k%20)).slice(-2)}}
function openFiles(e,start){var d=dlg("drawer md fv"),cur=start,have=EMP_FILES.map(function(n,i){return i}).filter(function(i){return e.files[i]});
  function draw(){var m=fileMeta(e,cur),at=have.indexOf(cur);
    d.innerHTML='<div class="dr-h"><h2>ملفات '+esc(e.name)+'</h2><button type="button" class="xbtn" data-close aria-label="إغلاق" title="إغلاق">×</button></div><div class="dr-b">'+
      '<div class="fvl" role="group" aria-label="مستندات الملف الشخصي">'+EMP_FILES.map(function(n,i){var ok=!!e.files[i];return '<button type="button" data-fi="'+i+'"'+(ok?'':' disabled')+(i===cur?' aria-current="true"':'')+'><span>'+n+'</span><span class="st '+(ok?'done">مرفوع':'late">ناقص')+'</span></button>'}).join("")+'</div>'+
      '<div class="fvp"><div class="sheet"><div><b>'+EMP_FILES[cur]+'</b><br>معاينة المستند</div></div>'+
        '<p class="m"><bdi dir="ltr">'+m.file+'</bdi> · '+m.type+' · '+m.size+' · رُفع '+ltr(m.up)+'</p></div></div>'+
      '<div class="dr-f"><span class="m" style="margin-inline-end:auto">'+(at+1)+' من '+have.length+' مرفوعة</span><button type="button" class="btn" data-step="-1"'+(at<=0?' disabled':'')+'>السابق</button><button type="button" class="btn" data-step="1"'+(at>=have.length-1?' disabled':'')+'>التالي</button>'+
      '<button type="button" class="btn" data-mock="تنزيل «'+m.file+'»">تنزيل</button><button type="button" class="btn k" data-close>إغلاق</button></div>';
    d.querySelectorAll("[data-fi]").forEach(function(b){b.onclick=function(){cur=+b.dataset.fi;draw()}});
    d.querySelectorAll("[data-step]").forEach(function(b){b.onclick=function(){cur=have[at+(+b.dataset.step)];draw()}})}
  draw();d.showModal()}
/* a library document opened in place, with every version it ever had (Mohamed 2026-11-25: «الاصدارات السابقه و استعراض الملفات مش متاحه»).
   Same window as the employee files: the list on one side, the sheet on the other. */
function openDoc(doc){var d=dlg("drawer md di"),R=docRead(doc),A=audCalc(audState(doc.aud)),H=(doc.hist||[]).slice().reverse(),by=doc.by||ME,
    first=H.length?H[H.length-1].up:doc.up;
  function row(k,v){return v?'<dt>'+k+'</dt><dd>'+v+'</dd>':''}
  function ver(x,cur){return '<div class="dvr"><b>الإصدار <span class="n">'+x.v+'</span>'+(cur?' <span class="chip s">الحالي</span>':'')+'</b><span class="m">'+dmy(x.up)+' · '+esc(by)+'</span><span class="vn">'+esc(x.note||"بدون ملاحظات.")+'</span>'+
    '<span class="m"><bdi dir="ltr">'+esc(x.file)+'</bdi> · '+String(x.size).replace(" MB"," ميغابايت")+'</span><button type="button" class="btn sm" data-mock="تنزيل «'+esc(x.file)+'»">تنزيل</button></div>'}
  d.innerHTML='<div class="dr-h"><h2>بيانات المستند</h2><button type="button" class="xbtn" data-close aria-label="إغلاق" title="إغلاق">×</button></div><div class="dr-b">'+
    '<div class="dih wide">'+cover(doc.cv)+'<div><b>'+esc(doc.n)+'</b>'+(doc.en?'<span class="m" dir="ltr">'+esc(doc.en)+'</span>':'')+(doc.bx?'<p>'+esc(doc.bx)+'</p>':'')+'</div><span class="chip s">'+esc(doc.c)+'</span></div>'+
    '<div class="fs"><h3>الرفع</h3><dl class="dd">'+row("رفعه",esc(by))+row("تاريخ الرفع",dmy(first))+row("المؤلف",esc(doc.author))+row("آخر تحديث",dmy(doc.up))+
      row("الحالة",doc.st?esc(doc.st):"منشور في مكتبة البوابة")+'</dl></div>'+
    '<div class="fs"><h3>الملف</h3><dl class="dd">'+row("اسم الملف",'<bdi dir="ltr">'+esc(doc.file)+'</bdi>')+row("الحجم",String(doc.size).replace(" MB"," ميغابايت"))+row("الصفحات",doc.pages+" صفحة")+
      row("الإصدار الحالي",'<span class="n">'+doc.v+'</span>'+(H.length?' · قبله '+(H.length===1?"إصدار واحد":H.length===2?"إصداران":H.length+" إصدارات"):''))+row("صورة الغلاف",doc.cv?"مرفوعة":"غير مرفوعة")+'</dl></div>'+
    '<div class="fs"><h3>إقرار القراءة</h3><dl class="dd">'+row("الإقرار",doc.ack?"مطلوب":"غير مطلوب")+(doc.ack?row("آخر موعد",doc.due?dmy(doc.due)+' '+dueTxt(doc.due):"بدون موعد")+row("قرأوا وأقرّوا",'<span class="n">'+R.done+'</span> من <span class="n">'+R.all+'</span>'):'')+'</dl></div>'+
    '<div class="fs"><h3>لمن يظهر</h3><dl class="dd">'+row("الموجَّه إليهم",'<span class="n">'+A.see.length+'</span> من <span class="n">'+EMPS.length+'</span> موظفين')+row("الفئات",A.cats.map(function(c){return esc(c.label)}).join("، ")||"بالاختيار")+
      row("أُضيفوا بالاسم",A.add.length?A.add.length+" موظفين":"")+row("مستثنون",A.exc.length?A.exc.length+" موظفين":"")+'</dl></div>'+
    '<div class="fs wide"><h3>الإصدارات</h3>'+ver(doc,true)+H.map(function(x){return ver(x,false)}).join("")+'</div></div>'+
    '<div class="dr-f"><button type="button" class="btn" data-close>إغلاق</button><button type="button" class="btn" data-mock="تنزيل «'+esc(doc.file)+'»">تنزيل الملف</button>'+
    (doc.st?'':'<button type="button" class="btn k" data-edit>تعديل</button>')+'</div>';
  var e=d.querySelector("[data-edit]");if(e)e.onclick=function(){d.close();openForm("doc",doc)};
  d.showModal()}
function mgrOf(e,dept){var d=D.depts.filter(function(x){return x.name===dept})[0],l=d&&d.lead;return !l?"لا يوجد مدير مباشر لهذا القسم بعد":l===e.name?"هو المدير المباشر للقسم":l}
function linkForm(arr,kindNew,kindEdit,place){return function(s){s=s||{};return {title:s.n?kindEdit:kindNew,size:"sm",html:
  '<div class="fs"><h3>البيانات</h3>'+two(fld("الاسم بالعربي",inp("n",s.n,req("اكتب الاسم"))),fld("الاسم بالإنجليزي",inp("en",s.en,'dir="ltr"')))+
    two(fld("الوصف بالعربي",txt("x",s.x)),fld("الوصف بالإنجليزي",txt("xen",s.xen,'dir="ltr"')))+
    fld("الرابط",inp("u",s.u,'dir="ltr" inputmode="url" placeholder="https://"'),"بدون رابط سيظهر للموظف بشارة «الرابط قريبًا». رابط صفحة من البوابة يظهر بشارة «داخل البوابة».")+'</div>'+
  '<div class="fs"><h3>الشكل</h3>'+fld("الأيقونة",sel("icon",ICON_NAMES,s.icon||"رابط"))+colorFld(s.color)+'</div>',
  save:function(f){var o=s;if(!s.n)arr.push(s);
    o.n=f.n.value;o.en=f.en.value;o.x=f.x.value;o.xen=f.xen.value;o.u=f.u.value.trim();o.icon=f.icon.value;o.color=pickColor(f);
    if(o.st!=="مخفي")o.st=(o.u||o.inner)?"ظاهر":"الرابط قريبًا";
    return "تم الحفظ — «"+o.n+"» "+(o.st==="مخفي"?"مخفي من البوابة.":"ظاهر في "+place+".")}}}}
/* home reminder: text only (label, title, one line) and an optional link behind «التفاصيل» */
function slideForm(s){s=s||{};var isNew=!s.n;return {title:isNew?"تذكير جديد":"تعديل تذكير",size:"sm",html:
  '<div class="fs"><h3>التذكير</h3>'+fld("التسمية الصغيرة فوق العنوان",inp("tag",s.tag||"تذكير من اللائحة",req("اكتب التسمية")))+
    two(fld("العنوان بالعربي",inp("n",s.n,req("اكتب عنوان التذكير")+' maxlength="60"'),"سطر واحد قصير، حتى 60 حرفًا."),fld("العنوان بالإنجليزي",inp("en",s.en,'dir="ltr" maxlength="60"')))+
    two(fld("السطر التوضيحي بالعربي",inp("x",s.x,'maxlength="110"')),fld("السطر التوضيحي بالإنجليزي",inp("xen",s.xen,'dir="ltr" maxlength="110"')))+'</div>'+
  '<div class="fs"><h3>زر «التفاصيل»</h3>'+fld("الرابط (اختياري)",inp("u",s.u,'dir="ltr" inputmode="url" placeholder="https://"'),"بدون رابط لا يظهر زر «التفاصيل» في التذكير.")+'</div>',
  save:function(f){if(isNew){SLIDES.push(s);s.st="ظاهر"}
    s.tag=f.tag.value.trim();s.n=f.n.value;s.en=f.en.value;s.x=f.x.value;s.xen=f.xen.value;s.u=f.u.value.trim();
    return "تم الحفظ — «"+s.n+"» "+(s.st==="مخفي"?"مخفي من البوابة.":"ظاهر في رئيسية البوابة.")}}}
var FORMS={slide:slideForm,
  doc:docForm,
  news:newsForm,
  app:function(a){a=a||{};return {title:a.n?"تعديل تطبيق جوال":"تطبيق جوال جديد",size:"sm",html:
    '<div class="fs"><h3>التطبيق</h3>'+two(fld("الاسم بالعربي",inp("n",a.n,req("اكتب اسم التطبيق"))),fld("الاسم بالإنجليزي",inp("en",a.en,'dir="ltr"')))+
      two(fld("لمن؟ (عربي)",inp("who",a.who)),fld("لمن؟ (إنجليزي)",inp("whoEn",a.whoEn,'dir="ltr"')))+
      two(fld("الوصف بالعربي",txt("x",a.x)),fld("الوصف بالإنجليزي",txt("xen",a.xen,'dir="ltr"')))+'</div>'+
    '<div class="fs"><h3>روابط المتاجر</h3>'+fld("رابط Google Play",inp("gp",a.gp,'dir="ltr" inputmode="url" placeholder="https://play.google.com/..."'))+
      fld("رابط App Store",inp("as",a.as,'dir="ltr" inputmode="url" placeholder="https://apps.apple.com/..."'),"يظهر الزر للموظف للمتجر الذي له رابط فقط.")+'</div>'+
    '<div class="fs"><h3>الشكل</h3>'+colorFld(a.color)+'</div>',
    save:function(f){var o=a;if(!a.n)APPS.push(a);
      o.n=f.n.value;o.en=f.en.value;o.who=f.who.value;o.x=f.x.value;o.gp=f.gp.value.trim();o.as=f.as.value.trim();o.color=pickColor(f);o.st=o.st||"ظاهر";
      o.s=o.gp&&o.as?"Google Play + App Store":o.as?"App Store":o.gp?"Google Play":"بدون رابط";
      return "تم الحفظ — «"+o.n+"» "+(o.st==="مخفي"?"مخفي من البوابة.":"ظاهر في صفحة «الأنظمة».")}}},
  /* Employee window (Mohamed, 2026-11-22: no tabs, less detail, softer, permissions elsewhere): one calm screen.
     Fields on a plain surface, then three one-line rows: permissions (own window), employee file (opens in place), account. */
  emp:function(e){
    var on=e.st==="نشط",none=e.st==="بدون حساب",wait=e.st==="بانتظار التفعيل",P=prof(e),canLead=(on||e.st==="موقوف")&&e.role!=="مدير النظام";
    function roleLine(){var r=roleOf(e);return esc(r)+' — <span class="n">'+permCount(r,e.ov)+'</span> من '+PERMS.length+' صلاحية مفعّلة'}
    return {title:"تفاصيل الموظف",saveLabel:"حفظ التغييرات",cls:"emp",html:
    '<div class="ehead">'+av(e.name)+'<div class="eid"><b class="en">'+esc(e.name)+'</b><span class="m">'+ltr(e.mail)+'</span></div><span class="chip '+(on?'s':wait?'':'d')+'">'+esc(e.st)+'</span></div>'+
    '<div class="esec four"><h3>البيانات الأساسية</h3>'+two(fld("الاسم بالعربي",inp("name",e.name,req("اكتب اسم الموظف"))),fld("الاسم بالإنجليزي",inp("en",e.en,'dir="ltr"')))+
      two(fld("الرقم الشخصي",inp("phone",e.phone,'dir="ltr" inputmode="tel" placeholder="9XXXXXXX"')),fld("رقم الشركة (اختياري)",inp("cphone",e.cphone,'dir="ltr" inputmode="tel" placeholder="7XXXXXXX"')))+
      /* personal links (Mohamed 2026-11-24): LinkedIn, a portfolio or a personal site. Optional, not counted in completeness. */
      [fld("LinkedIn",inp("li",e.li,'dir="ltr" inputmode="url" placeholder="https://www.linkedin.com/in/"')),fld("معرض أعمال أو موقع شخصي",inp("site",e.site,'dir="ltr" inputmode="url" placeholder="https://"'),"يكفي رابط واحد من الاثنين ليُحسب في اكتمال الملف.")].map(function(h){return h.replace('<label class="f"','<label class="f wide2"')}).join("")+'</div>'+
    '<div class="esec '+(canLead?'four':'three')+'"><h3>العمل</h3>'+two(fld("القسم",sel("dept",D.depts.map(function(d){return d.name}),e.dept),"يُحدَّد الفرع من القسم."),fld("الوظيفة",sel("job",JOBS.indexOf(e.job)<0?[e.job].concat(JOBS):JOBS,e.job)))+
      /* direct manager = the leader of the employee's department, employees sit directly under him (Mohamed 2026-11-24).
         So it is shown, not chosen: it follows the department field. */
      two('<div class="f"><span>المدير المباشر</span><output class="in" id="mgrOut" style="display:block">'+esc(mgrOf(e,e.dept))+'</output><small>يتحدّد من القسم، ويتغيّر بتغييره.</small></div>',
        (canLead?sw("lead","مدير مباشر للقسم",e.lead||mgrOf(e,e.dept)==="هو المدير المباشر للقسم","يصبح هذا الموظف المدير المباشر لقسمه بدل المدير الحالي."):""))+'</div>'+
    '<div class="elist">'+
      '<div class="erow"><div><b>الدور والصلاحيات</b><span class="m" id="roleLine">'+roleLine()+'</span></div><button type="button" class="btn sm" data-perms>تعديل الصلاحيات</button></div>'+
      '<details class="edet"><summary class="erow"><div><b>اكتمال الملف الشخصي</b><span class="m">'+(P.miss.length?'ينقصه '+(P.miss.length===1?'بند واحد':P.miss.length===2?'بندان':P.miss.length+' بنود')+': '+esc(P.miss.slice(0,2).join("، "))+(P.miss.length>2?' …':''):'كل البنود مكتملة')+'</span></div>'+prog(P.done,P.all,"بنود مكتملة")+'<span class="btn sm"><span class="o">عرض</span><span class="c">إخفاء</span></span></summary>'+
        '<div class="efs">'+P.items.map(function(x){var fi=x.kind==="مستند"?EMP_FILES.indexOf(x.n):-1;return '<div class="ef"><span>'+x.n+'</span><span class="efa">'+(fi>-1&&x.ok?'<button type="button" class="btn sm" data-file="'+fi+'">عرض</button>':'')+'<span class="st '+(x.ok?'done">'+(x.kind==="مستند"?'مرفوع':'مكتمل'):'late">ناقص')+'</span></span></div>'}).join("")+'</div></details>'+
      '<div class="erow"><div><b>'+(wait?"طلب التسجيل":"الحساب")+'</b><span class="m">'+
        (wait?"سجّل الموظف وينتظر قرارك.":on?"نشط. آخر دخول: "+ltr(e.last||"—"):e.st==="موقوف"?"موقوف، ولا يستطيع الدخول إلى البوابة.":none?"لا يوجد حساب دخول.":"رُفض طلب التسجيل.")+'</span></div><div class="acts" id="accActs">'+
        (wait?'<button type="button" class="btn sm k" data-acc="approve">اعتماد التسجيل</button><button type="button" class="btn sm" data-acc="askReject">رفض التسجيل</button>':
         on?'<button type="button" class="btn sm" data-acc="stop">إيقاف الحساب</button>':
         e.st==="موقوف"?'<button type="button" class="btn sm" data-acc="start">تفعيل الحساب</button><button type="button" class="btn sm" data-acc="askPurge">حذف الموظف</button>':
         none?'<button type="button" class="btn sm" data-acc="askPurge">حذف الموظف نهائيًا</button>':
         '<button type="button" class="btn sm" data-acc="askPurge">حذف الموظف</button>')+'</div></div></div>',
    bind:function(f){f.addEventListener("click",function(ev){var fb=ev.target.closest("[data-file]");if(fb)openFiles(e,+fb.dataset.file)});
      f.dept.addEventListener("input",function(){f.querySelector("#mgrOut").textContent=mgrOf(e,f.dept.value)});
      f.addEventListener("click",function(ev){
      if(ev.target.closest("[data-perms]"))openPerms(e,function(){f.querySelector("#roleLine").innerHTML=roleLine()})})},
    save:function(f){e.name=f.name.value;e.en=f.en.value;e.phone=f.phone.value;e.cphone=f.cphone.value;e.li=f.li.value.trim();e.site=f.site.value.trim();e.dept=f.dept.value;e.job=f.job.value;if(f.lead)e.lead=f.lead.checked;
      return "تم حفظ بيانات "+e.name+"."}}}
};
FORMS.sys=linkForm(SYS,"نظام جديد","تعديل نظام","صفحة «الأنظمة»");
FORMS.link=linkForm(LINKS,"رابط جديد","تعديل رابط","أسفل صفحة «الأنظمة»");

/* Roles and permissions: a window of its own, saved by its own button. A role switches its permissions on;
   anything changed by hand is an exception for this employee and is kept when the role changes. */
var PERM_GROUPS=[["لوحة التحكم",[15,0,14]],["الموظفون",[1,2,3]],["محتوى البوابة",[11,12,13]],["ملفات الموظفين",[5,6,7]],["الطلبات والإقرارات",[8,9,10]],["الحسابات والأدوار",[4,16]]];
var ROLE_HINT={"بدون دور":"لا يدخل لوحة التحكم","الموارد البشرية":"الموظفون وملفاتهم والمحتوى","الإدارة":"المتابعة واعتماد الطلبات","مدير النظام":"جميع الصلاحيات"};
function roleOf(e){return ROLES.indexOf(e.role)<0?"بدون دور":e.role}
function permGranted(r,i){return r==="مدير النظام"||(r==="الموارد البشرية"&&!!PERMS[i][1])||(r==="الإدارة"&&!!PERMS[i][2])}
function permCount(r,ov){return PERMS.filter(function(p,i){return ov&&ov[i]!=null?ov[i]:permGranted(r,i)}).length}
function openPerms(e,done){
  var d=dlg("drawer md"),role=roleOf(e),ov={},k;for(k in (e.ov||{}))ov[k]=e.ov[k];
  function isOn(i){return ov[i]!=null?ov[i]:permGranted(role,i)}
  function box(){
    var exc=PERMS.filter(function(p,i){return isOn(i)!==permGranted(role,i)}).length;
    return '<div class="ph"><span><b>'+role+'</b> — '+ROLE_HINT[role]+'، <b class="n">'+permCount(role,ov)+'</b> من '+PERMS.length+' صلاحية مفعّلة'+(exc?'، منها <b class="n">'+exc+'</b> استثناء لهذا الموظف':'')+'</span>'+
      (exc?'<button type="button" class="btn sm" data-reset>إعادة إلى صلاحيات الدور</button>':'')+'</div><div class="pgs">'+
      PERM_GROUPS.map(function(g){return '<div class="pg"><h4>'+g[0]+'</h4>'+g[1].map(function(i){
        var o=isOn(i),x=o!==permGranted(role,i);
        return sw("perm"+i,PERMS[i][0],o,i===16?"تُمنح بالدور فقط":x?(o?"ممنوحة له بشكل خاص":"موقوفة له بشكل خاص"):"",'data-perm="'+i+'"'+(i===16?" disabled":""))}).join("")+'</div>'}).join("")+'</div>';
  }
  d.innerHTML='<form novalidate style="display:contents"><div class="dr-h"><h2>الدور والصلاحيات — '+esc(e.name)+'</h2><button type="button" class="xbtn" data-close aria-label="إغلاق" title="إغلاق">×</button></div>'+
    '<div class="dr-b pwin"><div class="roles" role="radiogroup" aria-label="دور لوحة التحكم">'+ROLES.map(function(r){
      return '<label class="rolec"><input type="radio" name="role" value="'+r+'"'+(r===role?' checked':'')+'><span><b>'+r+'</b><em class="n">'+permCount(r)+' / '+PERMS.length+'</em></span></label>'}).join("")+'</div>'+
    '<div id="permBox">'+box()+'</div></div>'+
    '<div class="dr-f"><button type="button" class="btn" data-close>إلغاء</button><button class="btn k">حفظ الصلاحيات</button></div></form>';
  var f=d.querySelector("form"),pb=f.querySelector("#permBox");
  f.addEventListener("input",function(ev){
    var t=ev.target,i=t.dataset.perm;
    if(t.name==="role"){role=t.value;pb.innerHTML=box()}
    if(i!=null){if(t.checked===permGranted(role,+i))delete ov[i];else ov[i]=t.checked;pb.innerHTML=box();f.querySelector('[data-perm="'+i+'"]').focus()}
  });
  f.addEventListener("click",function(ev){if(ev.target.closest("[data-reset]")){ov={};pb.innerHTML=box();f.querySelector("[data-perm]").focus()}});
  f.addEventListener("submit",function(ev){
    ev.preventDefault();e.role=role==="بدون دور"?"—":role;e.ov=ov;d.close();if(done)done();if(window.render)render();
    toast("تم حفظ صلاحيات "+e.name+" — "+permCount(role,ov)+" من "+PERMS.length+" مفعّلة.")});
  d.showModal();
}

function openForm(kind,data){
  var F=FORMS[kind](data),d=$("drawer");
  if(!d){d=document.createElement("dialog");d.id="drawer";document.body.appendChild(d)}
  d.className="drawer "+(F.size||"lg")+(F.cls?" "+F.cls:"");
  d.innerHTML='<form novalidate style="display:contents"><div class="dr-h"><h2>'+F.title+'</h2>'+(F.steps?'<div class="steps" role="group" aria-label="خطوات النافذة">'+F.steps.map(function(s,i){return '<button type="button" data-go="'+(i+1)+'"><i class="n">'+(i+1)+'</i>'+s+'</button>'}).join("")+'</div>':'')+'<button type="button" class="xbtn" data-close aria-label="إغلاق" title="إغلاق">×</button></div><div class="dr-b">'+F.html+'</div><div class="dr-f"><span class="dirty" id="dirty" hidden>تغييرات غير محفوظة</span><button type="button" class="btn" data-close>إلغاء</button>'+(F.steps?'<button type="button" class="btn" data-go="1" data-back>رجوع</button><button type="button" class="btn" data-go="2" data-next>'+F.steps[1]+'</button>':'')+'<button class="btn k" data-save>'+(F.saveLabel||"حفظ")+'</button></div></form>';
  var f=d.querySelector("form");
  /* required fields of the parts on screen; returns the first one that is empty */
  function missing(scope){var bad=null;
    scope.forEach(function(i){var l=i.closest(".f"),old=l.querySelector(".err");if(old)old.remove();
      var miss=!i.value.trim();i.setAttribute("aria-invalid",miss);
      if(miss){l.insertAdjacentHTML("beforeend",'<small class="err">'+i.dataset.req+'</small>');bad=bad||i}});
    return bad}
  /* stepped windows (Mohamed 2026-11-23: «لمن يظهر» as a second step; training has three). A new item goes Next
     until the last step, then Save; an existing one can be saved from any step. Step 1 = parts with no data-step. */
  function go(n){var last=F.steps.length;
    if(n>=2){var bad=missing(f.querySelectorAll('.dr-b > :not([data-step]) [data-req]'));if(bad){bad.focus();return}}
    f.querySelectorAll(".dr-b > *").forEach(function(c){c.hidden=(c.dataset.step||"1")!==String(n)});
    f.querySelectorAll(".steps button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.go===String(n))});
    var bk=f.querySelector("[data-back]"),nx=f.querySelector("[data-next]"),sv=f.querySelector("[data-save]");
    bk.hidden=n===1;bk.dataset.go=n-1;
    nx.hidden=n===last;nx.dataset.go=n+1;nx.textContent=F.steps[n]?"التالي: "+F.steps[n]:"";nx.className="btn"+(F.isNew?" k":"");sv.hidden=n<last&&F.isNew;
    f.querySelector(".dr-b").scrollTop=0;d.dataset.step=n}
  f.querySelectorAll(".drop").forEach(dressDrop);
  if(F.init)F.init(f);
  if(F.bind)F.bind(f);
  if(F.steps)go(1);
  f.addEventListener("input",function(ev){
    if(F.init)F.init(f);
    if(ev.target.type==="file"){var dl=ev.target.closest(".drop");if(dl)pickedFile(dl,ev.target.files[0])}
    if(ev.target.type!=="search"&&ev.target.name!=="audonly")f.querySelector("#dirty").hidden=false;
    if(ev.target.name==="colorX")f.querySelectorAll("[name=color]").forEach(function(r){r.checked=false});
  });
  f.addEventListener("click",function(ev){
    var b=ev.target.closest("button");if(!b)return;
    if(b.hasAttribute("data-close")){leave();return}
    if(b.dataset.go){go(+b.dataset.go);return}
    var a=b.dataset.acc;if(!a)return;
    var box=f.querySelector("#accActs");
    if(a==="ask")box.innerHTML='<p class="err" style="width:100%">لا يمكن التراجع عن الحذف: سيبقى الموظف في القائمة «بدون حساب» وعليه التسجيل من جديد.</p><button type="button" class="btn sm r" data-acc="del">حذف الحساب</button><button type="button" class="btn sm" data-acc="back">إلغاء</button>';
    if(a==="askPurge")box.innerHTML='<p class="err" style="width:100%">لا يمكن التراجع عن الحذف: سيُحذف الموظف وحسابه وبياناته من القائمة، وعليه التسجيل من جديد إن عاد.</p><button type="button" class="btn sm r" data-acc="purge">حذف الموظف نهائيًا</button><button type="button" class="btn sm" data-acc="back">إلغاء</button>';
    if(a==="askReject"){box.innerHTML='<label class="f" style="width:100%"><span>سبب الرفض (يُرسل للموظف)</span><input class="in" name="why" aria-label="سبب الرفض"></label><button type="button" class="btn sm r" data-acc="reject">رفض التسجيل</button><button type="button" class="btn sm" data-acc="back">إلغاء</button>';f.why.focus()}
    if(a==="approve"||a==="reject"){data.st=a==="approve"?"نشط":"مرفوض";if(D.reqs.length){D.reqs.pop();shell()}d.close();if(window.render)render();toast(a==="approve"?"تم اعتماد حساب "+data.name+".":"تم رفض تسجيل "+data.name+".")}
    if(a==="back"){d.close();openForm(kind,data)}
    if(a==="del"){data.st="بدون حساب";data.last="—";d.close();if(window.render)render();toast("تم حذف حساب "+data.name+".")}
    if(a==="purge"){EMPS.splice(EMPS.indexOf(data),1);d.close();if(window.render)render();toast("تم حذف "+data.name+" نهائيًا.")}
    if(a==="stop"||a==="start"){data.st=a==="stop"?"موقوف":"نشط";d.close();if(window.render)render();toast(a==="stop"?"تم إيقاف حساب "+data.name+".":"تم تفعيل حساب "+data.name+".")}
  });
  /* closing with unsaved changes asks first (UX review 2026-11-25: ×, «إلغاء» and Esc used to drop the work silently) */
  function leave(){if(f.querySelector("#dirty").hidden){d.close();return}
    var a=dlg("ask");a.innerHTML='<h2>تجاهل التغييرات؟</h2><p>لم تُحفظ التغييرات في هذه النافذة، وسيضيع ما كتبته إن أغلقتها.</p><div class="acts"><button class="btn r" data-yes>تجاهل التغييرات</button><button class="btn" data-close>متابعة التعديل</button></div>';
    a.querySelector("[data-yes]").onclick=function(){a.close();d.close()};a.showModal();a.querySelector("[data-close]").focus()}
  d.oncancel=function(ev){ev.preventDefault();leave()};
  f.addEventListener("submit",function(ev){
    ev.preventDefault();var bad=missing(f.querySelectorAll("[data-req]"));
    if(bad){if(F.steps)go(1);if(F.reveal)F.reveal(bad,f);bad.focus();return}
    if(F.check){var stop=F.check(f);if(stop){if(F.steps)go(F.checkStep||2);toast(stop);return}}
    var msg=F.save(f);d.close();if(window.render)render();toast(msg);
  });
  d.showModal();
  /* start in the first field on desktop; on touch screens that would pop the keyboard over the form */
  var first=f.querySelector(".dr-b .in");if(first&&window.matchMedia("(hover:hover)").matches)first.focus();
}
function dlg(cls){
  var d=$("panel");if(!d){d=document.createElement("dialog");d.id="panel";document.body.appendChild(d);
    d.addEventListener("click",function(ev){if(ev.target.closest("[data-close]"))d.close()})}
  d.className=cls;return d;
}
/* one panel for "who has / has not" lists: document readers and news confirmations. item.sent marks the reminder as sent. */
/* The one window for "who did it and who did not" (documents, news, training). o: title, name of the item,
   doneLabel / restLabel, done / rest (employees), item (keeps .sent). Not-yet comes first because that is who needs
   a reminder. The shell is the same everywhere; what a page knows beyond done / not-done goes into two slots instead
   of a window of its own (Mohamed 2026-11-24: unifying must not delete features):
   - extra(e): html at the end of a person's row (training: score, attempts, the leader's decision);
   - chips: [{label,test(e)}] = states inside "done". They show as counted filters under the counter, so they are both
     the summary and a way to list only those people. Also optional: size, note. */
function peoplePanel(o){
  var d=dlg("drawer "+(o.size||"md")),flt=-1;
  function who(e){return '<div class="pp"><div class="who">'+av(e.name)+'<div><b>'+esc(e.name)+'</b><div class="m">'+esc(e.dept)+'</div></div></div>'+(o.extra?'<span class="ppx">'+o.extra(e)+'</span>':'')+'</div>'}
  function draw(){
    var all=o.done.length+o.rest.length,ch=o.chips||[],shown=flt<0?o.done:o.done.filter(ch[flt].test);
    d.innerHTML='<div class="dr-h"><h2>'+o.title+'</h2><button type="button" class="xbtn" data-close aria-label="إغلاق" title="إغلاق">×</button></div><div class="dr-b">'+
      '<div class="fs wide"><h3>'+esc(o.name)+'</h3>'+prog(o.done.length,all,o.doneLabel)+
        (ch.length?'<div class="seg ppc" role="group" aria-label="تصفية من '+o.doneLabel+'"><button type="button" data-chip="-1" aria-pressed="'+(flt<0)+'">الكل<b>'+o.done.length+'</b></button>'+ch.map(function(c,i){return '<button type="button" data-chip="'+i+'" aria-pressed="'+(flt===i)+'">'+c.label+'<b>'+o.done.filter(c.test).length+'</b></button>'}).join("")+'</div>':'')+'</div>'+
      '<div class="fs"><h3>'+o.restLabel+' ('+o.rest.length+')</h3>'+(o.rest.length?o.rest.map(who).join(""):'<p class="m">'+o.noRest+'</p>')+'</div>'+
      '<div class="fs"><h3>'+(flt<0?o.doneLabel:ch[flt].label)+' ('+shown.length+')</h3>'+(shown.length?shown.map(who).join(""):'<p class="m">'+(o.done.length?'لا أحد في هذه الحالة.':o.noDone)+'</p>')+'</div>'+
      '<p class="note">'+(o.note?o.note+' ':'')+'يُرسل تذكير واحد لكل موظف يضم جميع ما ينتظره. القائمة عيّنة من بيانات النموذج.</p></div>'+
      '<div class="dr-f"><button type="button" class="btn" data-close>إغلاق</button>'+(o.rest.length?(o.item.sent?'<button class="btn k" disabled>أُرسل التذكير</button>':'<button class="btn k" data-rem>إرسال تذكير لـ '+o.rest.length+' موظفين</button>'):'')+'</div>';
    d.querySelectorAll("[data-chip]").forEach(function(c){c.onclick=function(){flt=+c.dataset.chip;draw()}});
    var b=d.querySelector("[data-rem]");if(b)b.onclick=function(){o.item.sent=true;draw();toast("تم إرسال تذكير لـ "+o.rest.length+" موظفين.")};
  }
  draw();d.showModal();
}
/* shortcut: both lists are cut from the sample EMPS by the stored counts, replace with DOCUMENT_READ_CONFIRMATIONS (and its news equivalent) when built in APEX */
/* who a document is directed to and how many of them acknowledged it: one source for the library row and the «من قرأ» window
   shortcut: the sample read/all ratio is applied to the audience; in APEX both come from the confirmations table */
function docRead(doc){var P=audCalc(audState(doc.aud)).see.map(function(r){return r.e});return {people:P,all:P.length,done:Math.min(P.length,Math.round(P.length*doc.read/(doc.all||1)))}}
function openReaders(doc){
  var R=docRead(doc),n=R.done;
  peoplePanel({title:"من قرأ المستند",name:doc.n+" · الإصدار "+doc.v,item:doc,done:R.people.slice(0,n),rest:R.people.slice(n),
    restLabel:"لم يقرأوا بعد",doneLabel:"قرأوا وأقرّوا",noRest:"الجميع قرأ هذا المستند.",noDone:"لم يقرأ أحد بعد."});
}
/* who saw a news item, for every published item (Mohamed 2026-11-24: «مين اطلع على الخبر»). With «تأكيد الاطلاع» on,
   seen = pressed «اطّلعت»; without it, seen = opened the item.
   shortcut: sample counts when the item has none; replace with the real open/confirm records in APEX. */
function seenOf(x){if(x.seen==null)x.seen=[4,7,2,5,3][NEWS.indexOf(x)%5];return x.seen}
function openSeen(x){
  var aud=audCalc(audState(x.aud)).see.map(function(r){return r.e}),n=Math.min(seenOf(x),aud.length);
  peoplePanel({title:"من اطّلع على الخبر",name:x.t,item:x,done:aud.slice(0,n),rest:aud.slice(n),
    restLabel:x.ack?"لم يؤكّدوا الاطلاع بعد":"لم يطّلعوا بعد",doneLabel:x.ack?"اطّلعوا وأكّدوا":"اطّلعوا",noRest:"الجميع اطّلع على هذا الخبر.",noDone:"لم يطّلع أحد بعد."});
}
function confirmDel(what,name,after,yes){
  var d=dlg("ask");
  d.innerHTML='<h2>حذف '+what+'؟</h2><p>«'+esc(name)+'» سيُحذف نهائيًا. '+after+' لا يمكن التراجع عن الحذف.</p><div class="acts"><button class="btn r" data-yes>حذف</button><button class="btn" data-close>إلغاء</button></div>';
  d.querySelector("[data-yes]").onclick=function(){d.close();yes();if(window.render)render();toast("تم حذف «"+name+"».")};
  d.showModal();d.querySelector("[data-close]").focus();
}
var SETS={docv:function(){return DOCS},slide:function(){return SLIDES},doc:function(){return DOCS},news:function(){return NEWS},sys:function(){return SYS},emp:function(){return EMPS},app:function(){return APPS},link:function(){return LINKS}};
/* a new version of a document: the new file, what changed, and whether everyone acknowledges again */
FORMS.docv=function(d){return {title:"رفع إصدار جديد",size:"sm",saveLabel:"رفع الإصدار "+(d.v+1),html:
  '<div class="fs"><h3>'+esc(d.n)+'</h3><p class="m" style="font-size:var(--t-sm)">الإصدار الحالي <span class="n">'+d.v+'</span> · '+dmy(d.up)+' · <bdi dir="ltr">'+esc(d.file)+'</bdi>. يبقى محفوظًا في الإصدارات السابقة.</p>'+
    '<div class="f"><span>ملف الإصدار <span class="n">'+(d.v+1)+'</span></span><label class="drop"><b>ملف PDF</b><small>يراه الموظفون بدل الإصدار الحالي فور الرفع.</small><input type="file" name="file" accept="application/pdf" data-req="اختر ملف PDF للإصدار الجديد"></label></div>'+
    fld("ما الجديد في هذا الإصدار؟",txt("note","",'rows="2" '+req("اكتب ما تغيّر في هذا الإصدار")),"يظهر للموظف مع الإصدار الجديد.")+
    (d.ack?sw("reack","طلب الإقرار من جديد",true,"يُطلب من كل من وُجِّه إليه المستند أن يقرأ الإصدار الجديد ويُقرّ به."):'')+'</div>',
  save:function(f){d.hist=(d.hist||[]).concat([{v:d.v,up:d.up,note:d.note||"",file:d.file,size:d.size,pages:d.pages}]);d.v++;d.note=f.note.value.trim();d.up=TODAY;
    var um=pdfMeta(DOCS.indexOf(d),d.v);d.file=um.file;d.size=um.size;d.pages=um.pages;var re=d.ack&&f.reack.checked;if(re)d.read=0;
    return "تم رفع الإصدار "+d.v+" من «"+d.n+"»"+(re?"، وطُلب الإقرار به من جديد.":".")}}};
var DEL={doc:["المستند","يُزال من مكتبة البوابة بكل إصداراته وإقرارات قراءته."],slide:["التذكير","سيُزال من رئيسية البوابة."],news:["الخبر","سيُزال من رئيسية البوابة."],sys:["النظام","سيُزال من صفحة «الأنظمة» بالبوابة."],app:["التطبيق","سيُزال من صفحة «الأنظمة» بالبوابة."],link:["الرابط","سيُزال من أسفل صفحة «الأنظمة» بالبوابة."]};
/* buttons: data-form / data-del / data-hide / data-move = set name, data-i = index in that set; data-readers = index in DOCS, data-seen = index in NEWS */
document.addEventListener("click",function(e){
  var b=e.target.closest("button");if(!b)return;
  var k=b.dataset,i=k.i==null?null:+k.i;
  if(k.form)openForm(k.form,i==null?undefined:SETS[k.form]()[i]);
  if(k.readers)openReaders(DOCS[k.readers]);
  if(k.seen)openSeen(NEWS[k.seen]);
  if(k.del){var a=SETS[k.del](),x=a[i];confirmDel(DEL[k.del][0],x.t||x.n,DEL[k.del][1],function(){a.splice(i,1)})}
  if(k.hide){var h=SETS[k.hide]()[i],off=h.st==="مخفي";h.st=off?((h.u||h.inner||h.s||k.hide==="slide")?"ظاهر":"الرابط قريبًا"):"مخفي";render();toast(off?"تم إظهار "+h.n+" في البوابة.":"تم إخفاء "+h.n+" من البوابة.")}
  if(k.move){var m=SETS[k.move](),j=i+(+k.by);if(j<0||j>=m.length)return;var t=m[i];m[i]=m[j];m[j]=t;render();toast("تم تغيير ترتيب "+t.n+".")}
});

/* training results, shared by the training page and the reminders page */
/* shortcut: sample results built from the employee's place in the audience; replace with the real attempts in APEX */
var LEAD=["اعتمد النتيجة","بانتظار المدير المباشر","طلب إعادة الاختبار"];
function results(p){var see=audCalc(audState(p.aud)).see,q=p.qs.length;
  return see.map(function(e,i){var fin=i<p.done,sc=fin?Math.max(0,q-[0,1,0,2,1,0][i%6]):null,ld=fin?(sc<q/2?LEAD[2]:LEAD[i%2]):"";
    return {e:e.e||e,sc:sc,ld:ld,tries:fin&&i%4===3?2:fin?1:0}})}

/* ---- alerts (alerts.html): one window, two steps: what is sent and how, then who gets it ---- */
var ATPL={"تذكير بمستند":["تذكير بقراءة مستند","نذكّركم بقراءة «#» والإقرار به من مكتبة البوابة."],"تذكير بخبر":["تذكير بالاطلاع على خبر","نذكّركم بالاطلاع على خبر «#» وتأكيد الاطلاع عليه."],
  "تذكير بتدريب":["تذكير بإتمام تدريب","نذكّركم بإتمام تدريب «#» والإجابة عن أسئلته قبل موعده."],"تذكير باستكمال الملف الشخصي":["استكمال الملف الشخصي","نرجو استكمال بيانات ومستندات ملفكم الشخصي من صفحة «حسابي» في البوابة."]};
function alertRefs(kind){return kind===AKINDS[1]?DOCS.filter(function(d){return !d.st}).map(function(d){return d.n}):kind===AKINDS[2]?NEWS.filter(function(n){return n.st!=="مسودة"}).map(function(n){return n.t}):kind===AKINDS[3]?TRAIN.filter(function(p){return p.st==="منشور"}).map(function(p){return p.n}):[]}
var AWHEN=["الآن","في موعد محدد","حفظ كمسودة"];
function alertForm(x){
  var isNew=!x;x=x||{kind:AKINDS[0],ch:{push:true,wa:false}};var A=mkAudience(x.aud);
  return {title:isNew?"تنبيه جديد":"تعديل تنبيه",saveLabel:"إرسال التنبيه",isNew:isNew,steps:["التنبيه","لمن يُرسل"],html:
    '<div class="fs"><h3>التنبيه</h3>'+two(fld("النوع",sel("kind",AKINDS,x.kind),"الرسالة نص حر، والتذكير يرتبط بمستند أو خبر أو تدريب."),'<label class="f" id="refF"><span>المرتبط به</span><select class="in" name="ref"></select></label>')+
      two(fld("العنوان بالعربي",inp("t",x.t,req("اكتب عنوان التنبيه"))),fld("العنوان بالإنجليزي",inp("ten",x.ten,'dir="ltr"')))+
      fld("النص بالعربي",txt("x",x.x,req("اكتب نص التنبيه")))+fld("النص بالإنجليزي",txt("xen",x.xen,'dir="ltr"'),"في رسالة الواتساب يُكتب النص العربي أولًا ثم الإنجليزي تحته.")+'</div>'+
    '<div class="stackc"><div class="fs"><h3>طريقة الإرسال</h3>'+sw("push","إشعار في البوابة",x.ch.push,"يظهر في جرس البوابة ويصل إشعارًا على الجوال.")+sw("wa","واتساب",x.ch.wa,"رسالة على رقم الموظف المسجَّل.")+
      two(fld("موعد الإرسال",sel("when",AWHEN,x.st==="مجدول"?AWHEN[1]:x.st==="مسودة"?AWHEN[2]:AWHEN[0])),'<label class="f" id="atF"><span>التاريخ والوقت</span><input class="in" type="datetime-local" name="at" value="'+esc((x.st==="مجدول"&&x.at||"").replace(" ","T"))+'"></label>')+'</div>'+
    '<div class="fs grow"><h3>المعاينة</h3><div class="apv" id="apv"></div></div></div>'+
    '<div class="fs wide" data-step="2">'+A.html+'</div>',
    init:function(f){A.draw(f)},
    bind:function(f){A.bind(f);var sv=f.querySelector("[data-save]");
      function refs(keep){var L=alertRefs(f.kind.value);f.querySelector("#refF").style.display=L.length?"":"none";
        f.ref.innerHTML=L.map(function(n){return '<option'+(n===keep?' selected':'')+'>'+esc(n)+'</option>'}).join("")}
      /* a reminder starts from ready wording; it is replaced only while the person has not typed their own */
      function tpl(){var p=ATPL[f.kind.value];if(!p)return;
        if(!f.t.value||f.t.dataset.auto){f.t.value=p[0];f.t.dataset.auto=1}
        if(!f.x.value||f.x.dataset.auto){f.x.value=p[1].replace("#",f.ref.value||"");f.x.dataset.auto=1}}
      function draw(){var w=f.when.value;f.querySelector("#atF").style.display=w===AWHEN[1]?"":"none";
        sv.textContent=w===AWHEN[0]?"إرسال التنبيه":w===AWHEN[1]?"جدولة التنبيه":"حفظ كمسودة";
        var t=esc(f.t.value||"عنوان التنبيه"),b=esc(f.x.value||"نص التنبيه يظهر هنا."),en=esc(f.xen.value);
        f.querySelector("#apv").innerHTML=(f.push.checked?'<div class="apb"><small>إشعار في البوابة</small><div class="apn"><em>'+ic("bell",16)+'</em><div><b>'+t+'</b><span>'+b+'</span></div></div></div>':'')+
          (f.wa.checked?'<div class="apb"><small>واتساب</small><div class="apw"><b>'+t+'</b><span>'+b+'</span>'+(en?'<span dir="ltr">'+en+'</span>':'')+'</div></div>':'')||'<p class="m">اختر طريقة إرسال واحدة على الأقل.</p>'}
      refs(x.ref);draw();
      f.addEventListener("input",function(e){var n=e.target.name;
        if(n==="t"||n==="x")delete e.target.dataset.auto;
        if(n==="kind"){refs();tpl()}
        if(n==="ref")tpl();
        draw()})},
    check:function(f){
      if(!f.push.checked&&!f.wa.checked){this.checkStep=1;return "اختر طريقة إرسال واحدة على الأقل: إشعار في البوابة أو واتساب."}
      if(f.when.value===AWHEN[1]&&!f.at.value){this.checkStep=1;return "حدّد تاريخ ووقت الإرسال."}
      this.checkStep=2;return A.check(f)},
    save:function(f){var o=x,n=A.calc().see.length,w=f.when.value;if(isNew)ALERTS.unshift(o);
      o.kind=f.kind.value;o.ref=alertRefs(o.kind).length?f.ref.value:"";o.t=f.t.value;o.ten=f.ten.value;o.x=f.x.value;o.xen=f.xen.value;o.ch={push:f.push.checked,wa:f.wa.checked};o.aud=A.value();
      o.st=w===AWHEN[0]?"أُرسل":w===AWHEN[1]?"مجدول":"مسودة";o.at=w===AWHEN[0]?TODAY+" 09:00":w===AWHEN[1]?f.at.value.replace("T"," "):"";o.seen=0;
      return w===AWHEN[0]?"تم إرسال التنبيه إلى "+n+" موظفين.":w===AWHEN[1]?"تمت جدولة التنبيه لـ "+n+" موظفين في "+o.at+".":"تم الحفظ كمسودة — لم يُرسل لأحد."}};
}
FORMS.alert=alertForm;SETS.alert=function(){return ALERTS};DEL.alert=["التنبيه","لن يُرسل، ويُزال من القائمة."];

/* ---- portal home settings (homeset.html): three small windows over HOME ---- */
var HIMGS=["kitchen.jpg","team.webp","living.jpg","workspace.webp","leadership.webp","onboarding.webp"],MOSTMAX=6,MMODE=["تلقائي حسب الاستخدام","اختيار يدوي"];
FORMS.hero=function(){return {title:"صورة الواجهة",size:"sm",saveLabel:"حفظ الصورة",html:
  '<div class="fs"><label class="drop" data-cur="assets/news/'+HOME.img+'"><b>صورة الواجهة</b><small>JPG أو PNG أو WEBP، عرضية، أقل من 5 ميغابايت. تظهر خلف التحية والتذكيرات.</small><input type="file" name="img" accept="image/jpeg,image/png,image/webp"></label></div>',
  /* shortcut: the mockup has no real upload, a picked file just moves to the next sample picture */
  save:function(f){if(f.img.value)HOME.img=HIMGS[(HIMGS.indexOf(HOME.img)+1)%HIMGS.length];return f.img.value?"تم الحفظ — صورة الواجهة الجديدة ظاهرة في رئيسية البوابة.":"لم تتغيّر الصورة."}}};
FORMS.hours=function(){return {title:"دوام اليوم",size:"sm",saveLabel:"حفظ الدوام",html:
  '<div class="fs"><h3>ساعات العمل</h3><div class="hrs">'+HOME.hours.map(function(h,i){return '<label class="sw"><input type="checkbox" name="on'+i+'"'+(h.on?' checked':'')+'><i></i><span><b>'+h.d+'</b></span></label>'+
    '<input class="in" type="time" name="from'+i+'" value="'+h.from+'" aria-label="بداية دوام '+h.d+'"><input class="in" type="time" name="to'+i+'" value="'+h.to+'" aria-label="نهاية دوام '+h.d+'">'}).join("")+'</div>'+
    '<p class="m" style="font-size:var(--t-sm)">اليوم غير المفعَّل يظهر في البوابة «عطلة».</p></div>',
  bind:function(f){function dis(){HOME.hours.forEach(function(h,i){f["from"+i].disabled=f["to"+i].disabled=!f["on"+i].checked})}dis();f.addEventListener("change",dis)},
  check:function(f){var bad="";HOME.hours.forEach(function(h,i){if(f["on"+i].checked&&(!f["from"+i].value||!f["to"+i].value||f["from"+i].value>=f["to"+i].value))bad=bad||h.d});
    return bad?"راجع ساعات يوم "+bad+": البداية يجب أن تسبق النهاية.":""},
  save:function(f){HOME.hours.forEach(function(h,i){h.on=f["on"+i].checked;if(h.on){h.from=f["from"+i].value;h.to=f["to"+i].value}});return "تم الحفظ — ساعات الدوام محدَّثة في رئيسية البوابة."}}};
FORMS.most=function(){var L=SYS.filter(function(s){return s.st==="ظاهر"}).map(function(s){return s.n});
  return {title:"الأكثر استخدامًا",size:"sm",saveLabel:"حفظ",html:
  '<div class="fs">'+fld("طريقة الاختيار",sel("mode",MMODE,MMODE[HOME.most.auto?0:1]),"التلقائي يعرض الأنظمة التي فتحها الموظفون أكثر خلال آخر 30 يومًا.")+
    '<div id="mostP"><span style="font-size:var(--t-sm);color:var(--m)">الأنظمة المعروضة (حتى '+MOSTMAX+')</span><div class="picks" style="margin-top:6px">'+L.map(function(n){return '<label><input type="checkbox" name="m" value="'+esc(n)+'"'+(HOME.most.list.indexOf(n)>-1?' checked':'')+'><span>'+esc(n)+'</span></label>'}).join("")+'</div></div></div>',
  bind:function(f){function d(){f.querySelector("#mostP").style.display=f.mode.value===MMODE[1]?"":"none"}d();f.mode.addEventListener("change",d)},
  check:function(f){var n=f.querySelectorAll("[name=m]:checked").length;return f.mode.value===MMODE[0]?"":!n?"اختر نظامًا واحدًا على الأقل.":n>MOSTMAX?"اختر "+MOSTMAX+" أنظمة على الأكثر.":""},
  save:function(f){HOME.most.auto=f.mode.value===MMODE[0];if(!HOME.most.auto)HOME.most.list=[].map.call(f.querySelectorAll("[name=m]:checked"),function(c){return c.value});return "تم الحفظ — قسم «الأكثر استخدامًا» محدَّث في رئيسية البوابة."}}};
SETS.hsec=function(){return HOME.secs};
