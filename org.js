/* Departments, branches and jobs: one list per page (depts.html, branches.html, jobs.html), same table and same row
   actions in each. The page sets ONLY to the list it shows. What is in use cannot be deleted, and the button says why. */
function pl(n,one,two,many,sing){return n===0?"لا "+many:n===1?one:n===2?two:n+" "+(n<=10?many:sing)}
function emps(n){return n?pl(n,"موظف واحد","موظفان","موظفين","موظفًا"):'<span class="m">لا موظفين</span>'}
function cnt(n){return pl(n,"موظف واحد","موظفان","موظفين","موظفًا")}
var ORGP={
  odept:{kind:"القسم",cols:["القسم","النوع","الفرع","المدير المباشر","الموظفون",""],none:"أقسام",
    row:function(d){var n=inDept(d.name).length;return ['<span class="chip s">'+esc(d.type)+'</span>',esc(d.branch),
      d.lead?'<div class="who">'+av(d.lead)+'<b style="font-weight:500">'+esc(d.lead)+'</b></div>':'<span class="st late">بلا مدير مباشر</span>',emps(n),
      n?"لا يُحذف: فيه "+cnt(n)+". انقلهم إلى قسم آخر أولًا.":""]}},
  obr:{kind:"الفرع",cols:["الفرع","المدينة والعنوان","الهاتف","الأقسام","الموظفون",""],none:"فروع",
    row:function(b){var ds=D.depts.filter(function(d){return d.branch===b.n}),n=EMPS.filter(function(e){return e.branch===b.n}).length;
      return [esc(b.city)+(b.addr?'<small>'+esc(b.addr)+'</small>':''),b.phone?ltr(b.phone):'<span class="m">—</span>',
        ds.length?ds.map(function(d){return '<span class="chip d">'+esc(d.name)+'</span>'}).join(" "):'<span class="m">لا أقسام</span>',emps(n),
        ds.length?"لا يُحذف: يتبعه "+pl(ds.length,"قسم واحد","قسمان","أقسام","قسمًا")+". انقلها إلى فرع آخر أولًا.":n?"لا يُحذف: فيه "+cnt(n)+".":""]}},
  ojob:{kind:"الوظيفة",cols:["الوظيفة","نوع القسم","الموظفون",""],none:"وظائف",
    row:function(j){var n=EMPS.filter(function(e){return e.job===j.n}).length;return ['<span class="chip s">'+esc(j.type)+'</span>',emps(n),n?"لا تُحذف: يشغلها "+cnt(n)+".":""]}}
};
document.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;
  if(b.id==="add")openForm(ONLY);
  if(b.dataset.odel){var L=SETS[ONLY](),x=L[b.dataset.odel];
    confirmDel(ORGP[ONLY].kind,x.name||x.n,"يُزال من قوائم الاختيار في البوابة ولوحة التحكم.",function(){L.splice(L.indexOf(x),1);syncOrg()})}});
document.addEventListener("input",function(e){if(e.target.id==="q")render()});
function render(){
  var P=ORGP[ONLY],L=SETS[ONLY](),q=$("q").value.trim().toLowerCase(),
      list=L.filter(function(x){return !q||((x.name||x.n)+" "+(x.en||"")).toLowerCase().indexOf(q)>-1}),w=$("warn");
  if(w){var nl=D.depts.filter(function(d){return !d.lead});
    w.innerHTML=nl.length?'<div class="warn"><span class="st late"></span>'+pl(nl.length,"قسم واحد بلا مدير مباشر","قسمان بلا مدير مباشر","أقسام بلا مدير مباشر","قسمًا بلا مدير مباشر")+': '+esc(nl.map(function(d){return d.name}).join("، "))+'. طلبات موظفيها لا تصل إلى أحد.</div>':''}
  $("head").innerHTML='<tr>'+P.cols.map(function(c){return '<th>'+c+'</th>'}).join("")+'</tr>';
  $("rows").innerHTML=list.length?list.map(function(x){var c=P.row(x),why=c.pop(),i=L.indexOf(x);
    return '<tr><td class="full"><b>'+esc(x.name||x.n)+'</b>'+(x.en?'<small dir="ltr" style="text-align:right">'+esc(x.en)+'</small>':'')+'</td>'+c.map(function(h){return '<td>'+h+'</td>'}).join("")+
      '<td class="end full"><button class="btn sm" data-form="'+ONLY+'" data-i="'+i+'">تعديل</button> '+(why?'<button class="btn sm" disabled title="'+why+'">حذف</button>':'<button class="btn sm" data-odel="'+i+'">حذف</button>')+'</td></tr>'}).join(""):
    '<tr><td colspan="'+P.cols.length+'" class="empty">'+(L.length?'لا توجد '+P.none+' بهذا الاسم. جرّب بحثًا آخر.':'لا توجد '+P.none+' بعد.')+'</td></tr>';
  $("count").textContent=list.length+" من "+L.length+" · ما هو مستخدم لا يُحذف، وزر الحذف يوضّح السبب عند الوقوف عليه · بيانات تجريبية";
}
