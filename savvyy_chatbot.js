(function(){
var _open=false,_greeted=false,_lang='en';
var _flow=null,_step=0,_answers=[];
var _awaitOrder=false;
var _points=0,_postPurchase=false,_flashTimer=null;
var IMGDIR="Savvyy \u2013 India\u2019s Best Lingerie Brand for Comfort & Style_files/";

// === IMAGE DETECTION via OpenAI Vision ===
var OPENAI_KEY = 'YOUR_OPENAI_API_KEY_HERE';
var CUPS=['AA','A','B','C','D','DD','E','F'];

var CAT=[
  {n:'Comfort Bra - Cashmere Rose',     pr:599, type:'bra',       fab:'Cotton',       img:'BRA75301CASHMEREROSE1.png',                                sz:'30B-40DD',tags:['daily','comfort','cotton','breathable','sensitive','soft','everyday']},
  {n:'Seamless Bra - Soft Grey',        pr:699, type:'bra',       fab:'Microfibre',   img:'BRA78001-SOFTGREY-0329.jpg',                              sz:'30A-40D', tags:['seamless','invisible','daily','office','t-shirt','nude','grey']},
  {n:'Pure White Minimalist Bra',       pr:749, type:'bra',       fab:'Cotton',       img:'BRA78801_WHITE1_4fb837fd-3993-41e8-ab17-ad0ac72c6afa.jpg', sz:'32B-38D', tags:['white','minimal','daily','office','cotton','clean']},
  {n:'Lace Bralette - Black',           pr:799, type:'bra',       fab:'Lace',         img:'071A0356.jpg',                                            sz:'32B-38C', tags:['party','date','romantic','lace','style','evening','fashion']},
  {n:'Push-Up Bra - Rosewood',          pr:849, type:'bra',       fab:'Lace',         img:'071A0364.jpg',                                            sz:'32B-38D', tags:['push-up','party','date','style','enhance','evening']},
  {n:'Plunge Neck Bra',                 pr:899, type:'bra',       fab:'Microfibre',   img:'071A0845_21fc2ddd-a785-43ca-8960-1c2f564b4d47.jpg',       sz:'32B-38D', tags:['plunge','party','date','v-neck','style','evening']},
  {n:'Strapless Bra - Nude',            pr:899, type:'bra',       fab:'Microfibre',   img:'071A0865.jpg',                                            sz:'32B-38D', tags:['strapless','party','wedding','off-shoulder','backless','special']},
  {n:'Padded T-Shirt Bra - Skin',       pr:649, type:'bra',       fab:'Microfibre',   img:'071A0882_e1e7b405-6f0b-478a-b946-61da101a529b.jpg',      sz:'30B-40DD',tags:['padded','t-shirt','daily','comfortable','skin','office','invisible']},
  {n:'Full Coverage Bra - Beige',       pr:699, type:'bra',       fab:'Cotton',       img:'071A0899.jpg',                                            sz:'32C-42DD',tags:['full coverage','daily','comfort','cotton','beige','everyday']},
  {n:'Wired Bra - Dusty Rose',          pr:849, type:'bra',       fab:'Lace',         img:'071A0920.jpg',                                            sz:'32B-38D', tags:['wired','style','support','evening','special']},
  {n:'T-Shirt Bra - Charcoal',          pr:799, type:'bra',       fab:'Microfibre',   img:'071A1046.jpg',                                            sz:'30A-40D', tags:['t-shirt','daily','office','formal','seamless','invisible']},
  {n:'Everyday Bra - Navy Blue',        pr:599, type:'bra',       fab:'Cotton',       img:'110I458_EP_1.jpg',                                        sz:'30B-40DD',tags:['daily','comfort','cotton','navy','breathable','everyday']},
  {n:'Sports Bra - Lavender',           pr:799, type:'bra',       fab:'Cotton Blend', img:'110I458_EP_2.jpg',                                        sz:'30A-42DD',tags:['sports','workout','gym','active','comfort','daily']},
  {n:'High-Impact Sports Bra',          pr:899, type:'bra',       fab:'Spandex',      img:'110I458_HK_01.jpg',                                       sz:'32B-40D', tags:['sports','gym','workout','high impact','running','active']},
  {n:'Wire-Free Bralette - Sage',       pr:749, type:'bra',       fab:'Cotton',       img:'110I783_04_1_626bd326-2025-43a5-a436-a87524dab672.jpg',   sz:'32A-38D', tags:['wire-free','comfort','daily','bralette','soft','casual']},
  {n:'Padded Lace Bra - Coral',         pr:849, type:'bra',       fab:'Lace',         img:'110I783_04_4.jpg',                                        sz:'32B-38D', tags:['lace','padded','coral','style','party','date']},
  {n:'Cotton Non-Padded Bra',           pr:549, type:'bra',       fab:'Cotton',       img:'123I583_NN_2_be161010-f414-4d2c-b48c-2bf6ee60a954.jpg',  sz:'30A-40D', tags:['cotton','non-padded','daily','breathable','sensitive','comfort']},
  {n:'Bridal Lingerie Set - Ivory',     pr:2499,type:'set',       fab:'Satin',        img:'DSC06658_ef6990f1-a62e-4790-8f16-04f7d1f28b0a.jpg',      sz:'32B-38D', tags:['bridal','wedding','special','satin','luxury','ivory']},
  {n:'Honeymoon Set - Scarlet Red',     pr:1799,type:'set',       fab:'Lace',         img:'DSC06630-2_dcdc83b1-2b8d-4e11-b59b-3419c7f11fbf.jpg',    sz:'32B-38C', tags:['honeymoon','romantic','special','lace','red','night']},
  {n:'Floral Lingerie Set - Pink',      pr:1499,type:'set',       fab:'Lace',         img:'DSC06635_3be02142-fd41-408d-b87c-ade7a43acb23.jpg',       sz:'32B-38D', tags:['romantic','party','date','lace','pink','floral','special']},
  {n:'Luxury Satin Set - Champagne',    pr:2199,type:'set',       fab:'Satin',        img:'DSC06583_89348aed-0012-481f-81f6-3df39d852300.jpg',       sz:'32B-38D', tags:['luxury','satin','champagne','bridal','honeymoon','special']},
  {n:'Lace and Mesh Set - Black',       pr:1699,type:'set',       fab:'Lace',         img:'DSC06593_6f9738f2-e4db-467d-91b9-718419f8cfff.jpg',       sz:'32B-38C', tags:['black','lace','mesh','party','date','evening','style']},
  {n:'Romantic Set - Blush',            pr:1599,type:'set',       fab:'Lace',         img:'DSC05884_995947d7-cf9f-4f1f-9f45-59133cc5621f.jpg',       sz:'32B-38D', tags:['romantic','blush','lace','honeymoon','date','special']},
  {n:'Everyday Comfort Set',            pr:999, type:'set',       fab:'Cotton',       img:'DSC05891.jpg',                                            sz:'S-XXL',   tags:['daily','comfort','cotton','everyday','set','simple']},
  {n:'Elegant Bridal Set - White',      pr:2799,type:'set',       fab:'Satin',        img:'ENAMORDAY-1_1115_Details.jpg',                            sz:'32B-40D', tags:['bridal','wedding','white','satin','elegant','luxury']},
  {n:'Plunge Push-Up Set - Black',      pr:1599,type:'set',       fab:'Lace',         img:'1_3d78b616-fb41-4b69-8f16-b50bce66f773.jpg',             sz:'32B-38D', tags:['plunge','push-up','black','lace','party','date','set']},
  {n:'Cotton Brief Set 3-pack',         pr:399, type:'panty',     fab:'Cotton',       img:'DSC06575_45fbe97f-b8d1-4bb0-ad27-fbd5ddafc53f.jpg',      sz:'S-3XL',   tags:['daily','comfort','cotton','breathable','sensitive','pack','brief']},
  {n:'Seamless Hipster Panty',          pr:299, type:'panty',     fab:'Microfibre',   img:'1_6f0efda2-98a0-4c1d-b568-637637e5139b.jpg',             sz:'S-3XL',   tags:['seamless','daily','invisible','nude','hipster','office']},
  {n:'Lace Thong - Black',              pr:349, type:'panty',     fab:'Lace',         img:'1_71788d7a-2019-4c09-9778-ceff7458b327.jpg',             sz:'XS-XL',   tags:['thong','lace','black','party','date','style','evening']},
  {n:'High-Waist Cotton Brief',         pr:449, type:'panty',     fab:'Cotton',       img:'1_908f09b1-b66f-4900-aebb-f7a7cba22cae.jpg',             sz:'S-3XL',   tags:['high-waist','cotton','daily','comfort','tummy','breathable']},
  {n:'Boyshort Panty Pack',             pr:499, type:'panty',     fab:'Cotton',       img:'1_517efd4e-e2bc-4dcf-af86-e422b5099e5f.jpg',             sz:'S-3XL',   tags:['boyshort','daily','comfort','pack','cotton','breathable']},
  {n:'Satin Bikini Panty - Rose',       pr:399, type:'panty',     fab:'Satin',        img:'1_be1c40e5-89f4-4033-9346-da26611aa32d_1.jpg',           sz:'XS-XL',   tags:['satin','romantic','rose','bikini','special','honeymoon']},
  {n:'Satin Slip Nightwear - Ivory',    pr:1299,type:'nightwear', fab:'Satin',        img:'Lay_42484_61c9b8b8-efc2-4053-a238-490123fc9bfa.jpg',     sz:'S-XXL',   tags:['nightwear','sleep','satin','ivory','honeymoon','romantic','night']},
  {n:'Lace-Trim Chemise - Nude',        pr:1099,type:'nightwear', fab:'Satin',        img:'Lay_43378.jpg',                                           sz:'S-XXL',   tags:['nightwear','chemise','nude','satin','romantic','sleep']},
  {n:'Babydoll Set - Black',            pr:1499,type:'nightwear', fab:'Lace',         img:'Lay_43414_d84a376e-5370-4be6-9580-513d91959f6f.jpg',     sz:'S-XXL',   tags:['babydoll','nightwear','lace','black','romantic','honeymoon']},
  {n:'Cotton Night Suit Set',           pr:899, type:'nightwear', fab:'Cotton',       img:'PHOTO-2025-11-25-15-49-14.jpg',                           sz:'S-XXL',   tags:['nightwear','cotton','comfortable','sleep','daily','cozy']},
  {n:'Satin Robe and Slip Set',         pr:1799,type:'nightwear', fab:'Satin',        img:'PHOTO-2025-11-25-15-49-14_2.jpg',                         sz:'S-XXL',   tags:['robe','satin','romantic','honeymoon','bridal','set','night']},
  {n:'High-Waist Shapewear - Nude',     pr:999, type:'shapewear', fab:'Spandex',      img:'shapewear_58dfca8f-cdd8-4bc7-ada9-5d931f15b7d8.jpg',     sz:'S-4XL',   tags:['shapewear','slimming','tummy','formal','smooth','party','nude']},
  {n:'Full Body Shaper',                pr:1299,type:'shapewear', fab:'Spandex',      img:'1_3607f442-502a-48ba-93b9-d61124ea73a3.jpg',             sz:'S-3XL',   tags:['shapewear','full body','slimming','formal','party','smooth']},
  {n:'Minimalist Bralette - Beige',     pr:699, type:'bra',       fab:'Cotton',       img:'IMG_2278.jpg',                                            sz:'32A-38C', tags:['bralette','beige','minimal','daily','comfort','cotton','casual']},
  {n:'Padded Bra - Dusty Mauve',        pr:799, type:'bra',       fab:'Microfibre',   img:'IMG_2312.jpg',                                            sz:'30B-40D', tags:['padded','mauve','daily','style','office','microfibre']},
  {n:'Convertible Multi-Way Bra',       pr:999, type:'bra',       fab:'Microfibre',   img:'IMG_2315.jpg',                                            sz:'32B-38D', tags:['convertible','multi-way','strapless','party','wedding','versatile']},
  {n:'Balconette Bra - Terracotta',     pr:849, type:'bra',       fab:'Lace',         img:'IMG_2351.jpg',                                            sz:'32B-38D', tags:['balconette','terracotta','style','date','party','lace']},
  {n:'Halter Neck Bralette',            pr:799, type:'bra',       fab:'Cotton',       img:'IMG_2367_459630c4-252a-4228-96ee-725b603870a3.jpg',       sz:'32A-38C', tags:['halter','bralette','party','beach','style','casual']},
  {n:'Racerback Sports Bra',            pr:849, type:'bra',       fab:'Cotton Blend', img:'1_6ec16fcf-8143-4526-99bb-a6bd4243082a.jpg',             sz:'30A-42DD',tags:['sports','racerback','workout','gym','active','comfort']},
  {n:'Bridal Underwire Bra - Pearl',    pr:1499,type:'bra',       fab:'Lace',         img:'20I319_7V_1_f782573e-756f-4ea9-a5f2-aeffb7719a1c.jpg',   sz:'32B-38D', tags:['bridal','wedding','underwire','pearl','white','lace','special']},
  {n:'Strapless Longline Bra',          pr:1099,type:'bra',       fab:'Microfibre',   img:'A_0b036289-592f-432e-a8c0-838ef744e027.jpg',             sz:'32B-38D', tags:['strapless','longline','formal','party','smooth','backless']},
  {n:'Cage Back Bralette',              pr:899, type:'bra',       fab:'Lace',         img:'A_2cd03a34-5594-4c6d-8bbf-0cb92eb90fa4.jpg',             sz:'32A-38C', tags:['cage','bralette','fashion','party','style','backless','trendy']},
  {n:'Signature Cotton T-Shirt Bra',    pr:649, type:'bra',       fab:'Cotton',       img:'B_29384671-1527-4006-9b12-904fc1dbf3de.jpg',             sz:'30B-40DD',tags:['cotton','t-shirt','daily','office','comfortable','everyday']},
  {n:'Lace Underwire Bralette - Mauve', pr:849, type:'bra',       fab:'Lace',         img:'1_fea2d1be-bc0b-4876-b2b6-70c937ee6b86.jpg',             sz:'32B-38C', tags:['underwire','bralette','lace','mauve','style','party','date']},
];

function search(kw,n){
  var sc=CAT.map(function(p){
    var s=0;kw.forEach(function(k){if(p.tags.indexOf(k)>-1)s+=2;if(p.fab.toLowerCase().indexOf(k)>-1)s+=1;if(p.type===k)s+=3;if(p.n.toLowerCase().indexOf(k)>-1)s+=1;});
    return{p:p,s:s};
  });
  sc.sort(function(a,b){return b.s-a.s;});
  return sc.slice(0,n||6).filter(function(x){return x.s>0;}).map(function(x){return x.p;});
}

function showCards(intro,products,qrs){
  var t=showTyping();
  setTimeout(function(){
    t.remove();
    var box=document.getElementById('sv-msgs');
    var w=document.createElement('div');w.className='sv-m bot';
    var wrap=document.createElement('div');wrap.className='sv-cards-wrap';
    if(intro){var ip=document.createElement('div');ip.className='sv-cards-intro';ip.textContent=intro;wrap.appendChild(ip);}
    if(!products||!products.length){
      var nb=document.createElement('div');nb.className='sv-cards-intro';
      nb.textContent='No exact matches found. Tell me more and I will help!';wrap.appendChild(nb);
    }else{
      var sc=document.createElement('div');sc.className='sv-cards-scroll';
      products.forEach(function(p){
        var card=document.createElement('div');card.className='sv-card';
        var img=document.createElement('img');img.src=IMGDIR+p.img;img.alt=p.n;img.loading='lazy';
        img.onerror=function(){this.style.background='linear-gradient(135deg,#fce8eb,#fff9fa)';this.style.minHeight='132px';this.removeAttribute('src');};
        card.appendChild(img);
        var info=document.createElement('div');info.className='sv-card-info';
        var nm=document.createElement('div');nm.className='sv-card-name';nm.textContent=p.n;info.appendChild(nm);
        var pr=document.createElement('div');pr.className='sv-card-price';pr.textContent='\u20b9'+p.pr.toLocaleString('en-IN');info.appendChild(pr);
        var fb=document.createElement('div');fb.className='sv-card-fab';fb.textContent=p.fab+' | '+p.sz;info.appendChild(fb);
        var btn=document.createElement('button');btn.className='sv-card-btn';btn.textContent='Add to Cart';
        (function(prod){btn.onclick=function(){handle('add '+prod.n+' to cart');};})(p);
        info.appendChild(btn);card.appendChild(info);sc.appendChild(card);
      });wrap.appendChild(sc);
    }
    w.appendChild(wrap);
    var tm=document.createElement('div');tm.className='sv-t';tm.textContent=ts();w.appendChild(tm);
    if(qrs&&qrs.length){
      var qw=document.createElement('div');qw.className='sv-qrs';
      qrs.forEach(function(label){
        var btn=document.createElement('button');btn.className='sv-qr';btn.textContent=label;
        btn.onclick=function(){try{qw.remove();}catch(e){}handle(label);};qw.appendChild(btn);
      });w.appendChild(qw);
    }
    box.appendChild(w);box.scrollTop=box.scrollHeight;
  },700+Math.random()*350);
}

var FLOWS={
  size:{
    steps:[
      {q:'Step 1 of 2 - BAND SIZE\n\nWrap a tape measure firmly around your ribcage, just BELOW the bust. Keep it snug.\n\nEnter your measurement in inches:',qrs:['28','30','32','34','36','38','40']},
      {q:'Step 2 of 2 - BUST SIZE\n\nMeasure around the FULLEST part of your chest. Keep the tape relaxed, not tight.\n\nEnter this measurement in inches:',qrs:['32','33','34','35','36','37','38','40']}
    ],
    done:function(ans){
      var band=parseInt(ans[0])||32,bust=parseInt(ans[1])||35;
      if(band%2!==0)band=band+1;
      var d=Math.max(0,Math.min(7,Math.round(bust-band)));
      var sz=band+CUPS[d];
      return{t:'Your Perfect Size: '+sz+'\n\nBand: '+band+'" | Bust difference: '+(bust-parseInt(ans[0]))+'" | Cup: '+CUPS[d]+'\n\nWant me to find products for size '+sz+'?',
       q:['Yes! Show me products','Size Exchange Policy']}
    }
  },
  recommend:{
    steps:[
      {q:"Let's find your perfect match!\n\nWhat's the occasion?",qrs:['Daily Wear','Party / Date Night','Bridal / Wedding','Honeymoon','Workout / Sports','Office / Formal']},
      {q:'What matters more to you?',qrs:['Maximum Comfort','Maximum Style','Best of Both']},
      {q:'Any fabric preference?',qrs:['Soft Cotton','Elegant Lace','Smooth Satin','Sensitive Skin','No preference']}
    ],
    done:function(ans){
      var tags=[],occ=(ans[0]||'').toLowerCase();
      if(/daily/.test(occ))tags.push('daily');
      if(/party|date/.test(occ)){tags.push('party');tags.push('date');}
      if(/bridal|wedding/.test(occ)){tags.push('bridal');tags.push('wedding');}
      if(/honeymoon/.test(occ)){tags.push('honeymoon');tags.push('romantic');}
      if(/workout|sports/.test(occ)){tags.push('sports');tags.push('workout');}
      if(/office|formal/.test(occ)){tags.push('formal');tags.push('office');}
      var pref=(ans[1]||'').toLowerCase();
      if(/comfort/.test(pref))tags.push('comfort');
      if(/style/.test(pref))tags.push('style');
      var fab=(ans[2]||'').toLowerCase();
      if(/cotton/.test(fab))tags.push('cotton');
      if(/lace/.test(fab))tags.push('lace');
      if(/satin/.test(fab))tags.push('satin');
      if(/sensitive/.test(fab))tags.push('sensitive');
      return{cards:search(tags,6),intro:'Based on your preferences:',q:['Complete the Set','Different Style','Offers']}
    }
  },
  occasion:{
    steps:[{q:"What's the occasion?\n\nI'll suggest the perfect style for you!",qrs:['Daily Wear','Party / Date Night','Bridal / Wedding','Honeymoon','Workout / Sports','Office / Formal']}],
    done:function(ans){
      var tags=[],occ=(ans[0]||'').toLowerCase();
      if(/daily/.test(occ))tags.push('daily');
      if(/party|date/.test(occ)){tags.push('party');tags.push('date');}
      if(/bridal|wedding/.test(occ)){tags.push('bridal');tags.push('wedding');}
      if(/honeymoon/.test(occ)){tags.push('honeymoon');tags.push('romantic');}
      if(/workout|sports/.test(occ)){tags.push('sports');tags.push('workout');}
      if(/office|formal/.test(occ)){tags.push('formal');tags.push('office');}
      return{cards:search(tags,6),intro:'Perfect! For '+ans[0]+':',q:['Complete the Set','Find My Size','Offers']}
    }
  },
  gift:{
    steps:[
      {q:"How sweet! Who are you gifting?\n\nI'll curate the perfect set!",qrs:['Wife','Girlfriend','Sister / Friend','Mother']},
      {q:'What is her approximate age?',qrs:['18-25','26-35','36-45','45+']},
      {q:'What is your budget?',qrs:['Under \u20b9999','\u20b9999-\u20b91999','\u20b92000-\u20b93000','\u20b93000+']}
    ],
    done:function(ans){
      var tags=[],rel=(ans[0]||'').toLowerCase(),budget=(ans[2]||'');
      if(/girlfriend/.test(rel)){tags.push('romantic');tags.push('lace');tags.push('date');}
      else if(/wife/.test(rel)){tags.push('bridal');tags.push('satin');tags.push('romantic');}
      else if(/sister|friend/.test(rel)){tags.push('daily');tags.push('comfort');tags.push('cotton');}
      else if(/mother/.test(rel)){tags.push('comfort');tags.push('cotton');tags.push('daily');}
      var maxPr=budget.indexOf('999-')===-1&&budget.indexOf('999')>-1?999:budget.indexOf('1999')>-1?1999:budget.indexOf('3000')>-1?3000:9999;
      var prods=search(tags,8).filter(function(p){return p.pr<=maxPr;});
      // If too few results, broaden search with affordable options
      if(prods.length<3){var extras=search(['daily','comfort','romantic','lace'],8).filter(function(p){return p.pr<=maxPr&&prods.indexOf(p)===-1;});prods=prods.concat(extras).slice(0,6);}
      else{prods=prods.slice(0,6);}
      _points+=30;
      return{cards:prods,intro:'Perfect gift for her \u2014 curated with love! (Budget: '+budget+')',q:['Add Gift Wrapping \u2728','Add Personal Note','Check Delivery Date']}
    }
  },
  period:{
    steps:[
      {q:"I'll make sure you're always comfortable!\n\nWhen is your next period?",qrs:['In 1-3 days','In a week','In 2 weeks','Just ended']}
    ],
    done:function(ans){
      var t=(ans[0]||'').toLowerCase(),msg='';
      if(/1-3/.test(t))msg='Stock up NOW — these arrive before your period!';
      else if(/week/.test(t))msg='Perfect timing! Order now, arrives well before your period:';
      else if(/2 weeks/.test(t))msg='Plan ahead with these comfort essentials:';
      else msg='Post-period self-care picks — you deserve it!';
      _points+=10;
      return{cards:search(['comfort','cotton','breathable','daily'],6),intro:msg,q:['Set Monthly Reminder','Add All to Cart','More Comfort Picks']}
    }
  },
  skinTone:{
    steps:[
      {q:"Let's find colors that look stunning on you!\n\nWhat is your skin tone?",qrs:['Fair / Light','Wheatish / Medium','Dusky / Deep','Not Sure']}
    ],
    done:function(ans){
      var tone=(ans[0]||'').toLowerCase(),tags=[],note='';
      if(/fair/.test(tone)){tags=['daily','blush','cotton'];note='For fair skin: Deep jewel tones, wine, navy, and blush pinks look breathtaking!';}
      else if(/wheatish|medium/.test(tone)){tags=['coral','daily','comfort'];note='For wheatish skin: Coral, terracotta, mustard and warm nudes are absolutely gorgeous!';}
      else if(/dusky|deep/.test(tone)){tags=['party','lace','date'];note='For dusky skin: Bold reds, royal blue, black and gold look radiant and powerful!';}
      else{tags=['daily','comfort','nude'];note='Universal tip: Classic nude and white are flattering on every skin tone!';}
      _points+=10;
      return{cards:search(tags,6),intro:note,q:['Show More Colors','Find My Size','Add to Cart']}
    }
  },
  wholesale:{
    steps:[
      {q:"Welcome, Business Partner!\n\nWhat type of business do you run?",qrs:['Retail Boutique','Online Store','Salon / Spa','Corporate Gifting']},
      {q:'Which city is your business based in?',qrs:['Mumbai','Delhi','Bangalore','Other City']},
      {q:'Expected monthly order volume?',qrs:['10-25 pieces','25-50 pieces','50-100 pieces','100+ pieces']}
    ],
    done:function(ans){
      var vol=(ans[2]||''),disc=vol.indexOf('100+')>-1?35:vol.indexOf('50-100')>-1?28:vol.indexOf('25-50')>-1?22:15;
      return{t:'Your Savvyy B2B Quote:\n\nBusiness: '+ans[0]+'\nCity: '+ans[1]+'\nVolume: '+ans[2]+'\nYour Discount: '+disc+'% off MRP\n\nMin Order: 10 pieces\nPayment: 50% advance\nDelivery: 5-7 business days\n\nOur B2B team will contact you within 24 hours!',q:['Download Catalogue PDF','Talk to Sales Team','Place Sample Order']}
    }
  },
  subscription:{
    steps:[
      {q:"The Savvyy Monthly Box!\n\nCurated lingerie delivered to your door every month!\n\nWhat style do you prefer?",qrs:['Everyday Comfort','Glamour & Style','Mix of Both','Surprise Me!']},
      {q:'Your size range?',qrs:['XS-S','M-L','XL-2XL','3XL+']},
      {q:'Choose your plan:',qrs:['Basic \u20b9799/mo (2 items)','Standard \u20b91299/mo (4 items)','Premium \u20b91999/mo (6 items)']}
    ],
    done:function(ans){
      var plan=(ans[2]||''),price=plan.indexOf('799')>-1?'\u20b9799':plan.indexOf('1299')>-1?'\u20b91299':'\u20b91999',items=plan.indexOf('799')>-1?2:plan.indexOf('1299')>-1?4:6;
      _points+=50;
      return{t:'Your Monthly Box is confirmed!\n\nStyle: '+ans[0]+'\nSize: '+ans[1]+'\nPlan: '+price+'/month ('+items+' curated items)\n\nFirst box ships in 3 days!\nCancel anytime. 100% discreet delivery.\n\nUse code FIRSTBOX for 20% off your first month! You earned 50 points!',q:['Apply FIRSTBOX','Gift a Subscription','Manage Subscription']}
    }
  }
};

var R={
  greet_en_t:"Namaste! Welcome to Savvyy - India's most loved lingerie brand!\n\nI'm your personal shopping assistant. Let me help you find the perfect fit, style, and comfort!",
  greet_en_q:['Find My Perfect Fit','Size Calculator','Gift Someone \u2728','Shop by Occasion','Monthly Box'],
  greet_hi_t:"Namaste! Savvyy mein aapka swagat hai!\n\nMain aapki personal shopping assistant hoon. Sahi size, style aur comfort dhundhne mein help kar sakti hoon!",
  greet_hi_q:['Sahi Fit Dhundho','Size Guide','Aaj ke Offers','Occasion ke hisaab se','Order Track Karo'],
  offers_t:"Today's Special Offers:\n\nBuy 2 Get 1 FREE on all bras\n20% off first order - Code: SAVVY20\nFree shipping above Rs.499\nNew arrivals: Extra 15% off\nBridal sets: Up to 30% off!",
  offers_q:['Apply SAVVY20','Browse New Arrivals','Bridal Collection'],
  coupon_t:"Code SAVVY20 noted! 20% off your first order will be applied at checkout.\n\nReady to shop?",
  coupon_q:['Find My Fit','Browse Products'],
  shipping_t:"Shipping Info:\n\nFREE delivery above Rs.499\nStandard: 3-5 business days\nExpress: 1-2 days (+Rs.99)\nPan-India shipping\n100% discreet packaging - No brand visible outside!",
  shipping_q:['Track My Order','Return Policy','Shop Now'],
  returns_t:"Return & Exchange:\n\n7-day easy return\nFree returns for defective items\nSize exchange within 15 days\nRefund in 5-7 working days\nDiscreet return packaging",
  returns_q:['Start a Return','Size Exchange','Need Help?'],
  payment_t:"Payment Options:\n\nCredit & Debit Cards\nUPI: GPay, PhonePe, Paytm\nNet Banking\nEasy EMI on Rs.999+\nCash on Delivery\nBuy Now Pay Later\n\n100% Secure Checkout",
  payment_q:['Shop Now','View Offers','Track Order'],
  fabric_t:"Fabric Guide:\n\nCotton - Breathable, daily comfort\nLace - Elegant, for special moments\nSatin - Silky luxury feel\nMicrofibre - Seamless, invisible look\n\nWhich fabric would you like to know more about?",
  fabric_q:['Cotton','Lace','Satin','Sensitive Skin'],
  privacy_t:"Your Privacy is Sacred!\n\nAll orders ship in plain, unmarked packaging.\nYour purchase is 100% confidential.\n\nFeel free to ask me anything - I am here to help!",
  privacy_q:['Browse Products','Size Guide','Offers'],
  track_t:"Track Your Order!\n\nPlease share your Order ID:\n\nFormat: SVY + 6 digits\nExample: SVY123456\n\n(Found in your confirmation email)",
  def_en_t:"I'm Savvyy's shopping assistant \u2014 I specialize in lingerie!\n\nTry asking me:\n- Show me black lace bras\n- Gift for my girlfriend under \u20b91500\n- My skin tone is wheatish\n- Flash sale\n- Sign me up for Monthly Box",
  def_en_q:['Show Black Collection','Gift Someone \u2728','Flash Sale \u26a1','Monthly Box'],
  def_hi_t:"Main yahan help karne ke liye hoon!\n\nAap mujhse pooch sakti hain:\n- Party ke liye kya chahiye?\n- Mera size kya hoga?\n- Honeymoon set dikhao",
  def_hi_q:['Sahi Fit Dhundho','Size Guide','Aaj ke Offers']
};

var ORDER_STATUSES=['Order Received - Being processed','Packed and Ready to Ship','Out for Delivery - Arriving today!','Delivered! Enjoy your purchase'];
function lookupOrder(id){
  var h=id.split('').reduce(function(a,c){return a+c.charCodeAt(0);},0);
  var st=ORDER_STATUSES[h%4],days=[3,2,1,0][h%4];
  var d=new Date();d.setDate(d.getDate()+days);
  var ds=days===0?'Today':d.toLocaleDateString('en-IN',{weekday:'short',month:'short',day:'numeric'});
  addMsg('bot','Order Found!\n\nOrder ID: '+id+'\nStatus: '+st+'\nExpected Delivery: '+ds+'\n\nShipped in plain, discreet packaging!',['Track Another Order','Return Policy','Shop Again'],0);
  if(days===0){
    setTimeout(function(){
      _postPurchase=true;
      bot('How is your Savvyy purchase? Rate your comfort:',['5 \u2b50 Love it!','4 \u2b50 Great!','3 \u2b50 Good','2 \u2b50 OK','1 \u2b50 Disappointed']);
    },2000);
  }
}

function ts(){var d=new Date();return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');}

function addMsg(who,text,qrs,delay){
  function doAdd(){
    var box=document.getElementById('sv-msgs');
    var w=document.createElement('div');w.className='sv-m '+who;
    var b=document.createElement('div');b.className='sv-b';b.textContent=text;w.appendChild(b);
    var tm=document.createElement('div');tm.className='sv-t';tm.textContent=ts();w.appendChild(tm);
    if(qrs&&qrs.length){
      var qw=document.createElement('div');qw.className='sv-qrs';
      qrs.forEach(function(label){
        var btn=document.createElement('button');btn.className='sv-qr';btn.textContent=label;
        btn.onclick=function(){try{qw.remove();}catch(e){}handle(label);};
        qw.appendChild(btn);
      });w.appendChild(qw);
    }
    box.appendChild(w);box.scrollTop=box.scrollHeight;
  }
  if(delay===0)doAdd();else setTimeout(doAdd,delay||0);
}

function showTyping(){
  var box=document.getElementById('sv-msgs');
  var w=document.createElement('div');w.className='sv-m bot';
  w.innerHTML='<div class="sv-typing"><div class="sv-dot"></div><div class="sv-dot"></div><div class="sv-dot"></div></div>';
  box.appendChild(w);box.scrollTop=box.scrollHeight;return w;
}

function bot(text,qrs){
  var t=showTyping();
  setTimeout(function(){t.remove();addMsg('bot',text,qrs,0);},700+Math.random()*350);
}

function showPoints(){
  bot('Your Savvyy Loyalty Points: '+_points+' pts\n\n10 pts = \u20b910 off | 50 pts = Free delivery | 100 pts = Free product!\n\nKeep shopping to earn more!',['Redeem Points','Shop Now','Refer a Friend +100pts']);
}

function showFlashSale(){
  var endMs=Date.now()+(17*60+23)*1000;
  var box=document.getElementById('sv-msgs');
  var w=document.createElement('div');w.className='sv-m bot';
  var b=document.createElement('div');b.className='sv-b';
  b.style.cssText='background:linear-gradient(135deg,#c0394b,#e8738a);color:white;border-radius:12px;padding:12px;';
  var timerSpan=document.createElement('span');timerSpan.id='sv-flash-timer';timerSpan.style.cssText='font-size:20px;font-weight:bold;letter-spacing:2px;';
  function tick(){
    var left=Math.max(0,endMs-Date.now());
    var m=Math.floor(left/60000),s=Math.floor((left%60000)/1000);
    timerSpan.textContent=m+':'+(s<10?'0':'')+s;
    if(left<=0&&_flashTimer){clearInterval(_flashTimer);_flashTimer=null;}
  }
  tick();
  if(_flashTimer)clearInterval(_flashTimer);
  _flashTimer=setInterval(tick,1000);
  b.innerHTML='';
  var line1=document.createElement('div');line1.textContent='\u26a1 FLASH SALE - Extra 25% OFF Everything!';line1.style.fontWeight='bold';
  var line2=document.createElement('div');line2.textContent='Use code: FLASH25 | Expires in:';line2.style.fontSize='12px';line2.style.margin='4px 0';
  b.appendChild(line1);b.appendChild(line2);b.appendChild(timerSpan);
  w.appendChild(b);
  var tm=document.createElement('div');tm.className='sv-t';tm.style.color='#fff';tm.textContent=ts();w.appendChild(tm);
  var qw=document.createElement('div');qw.className='sv-qrs';
  ['Apply FLASH25','Shop Bras','Shop Sets','Shop Nightwear'].forEach(function(label){
    var btn=document.createElement('button');btn.className='sv-qr';btn.textContent=label;
    btn.onclick=function(){try{qw.remove();}catch(e){}handle(label);};qw.appendChild(btn);
  });
  w.appendChild(qw);
  box.appendChild(w);box.scrollTop=box.scrollHeight;
}

function startFlow(name){
  var fl=FLOWS[name];if(!fl)return;
  _flow=name;_step=1;_answers=[];bot(fl.steps[0].q,fl.steps[0].qrs);
}

function flowStep(input){
  var fl=FLOWS[_flow];if(!fl)return false;
  _answers.push(input);
  if(_step<fl.steps.length){var s=fl.steps[_step];_step++;bot(s.q,s.qrs);}
  else{var res=fl.done(_answers);_flow=null;_step=0;_answers=[];if(res.cards){showCards(res.intro,res.cards,res.q);}else{bot(res.t,res.q);}}
  return true;
}

// All color words that appear in product names — used to filter conflicting colors
var ALL_COLOR_WORDS=['black','white','ivory','nude','beige','grey','gray','charcoal','red','scarlet','pink','blush','coral','rose','mauve','gold','champagne','lavender','purple','navy','blue','green'];

// Smart NLP extractor — pulls color/mood/type/fabric/price from any free text
function extractSearch(t){
  var tags=[],introparts=[],maxPrice=null,colorWords=[];

  // COLORS — add catalog tag + mood tags. colorWords used to filter conflicting results.
  if(/\bblack\b/.test(t)){tags.push('black','party','date','lace');introparts.push('Black');colorWords.push('black');}
  if(/\bred\b|\bscarlet\b|\bmaroon\b|\bcrimson\b|\bwine\b/.test(t)){tags.push('red','honeymoon','romantic');introparts.push('Red');colorWords.push('red','scarlet');}
  if(/\bwhite\b|\bivory\b/.test(t)){tags.push('bridal','satin','white');introparts.push('White');colorWords.push('white','ivory');}
  if(/\bpink\b|\bblush\b|\bcoral\b|\brose\b|\bmauve\b/.test(t)){tags.push('daily','blush','coral','romantic');introparts.push('Pink');colorWords.push('pink','blush','coral','rose','mauve');}
  if(/\bnude\b|\bbeige\b|\bskin.colou?r\b/.test(t)){tags.push('seamless','nude','daily');introparts.push('Nude');colorWords.push('nude','beige');}
  if(/\bgrey\b|\bgray\b|\bcharcoal\b/.test(t)){tags.push('seamless','daily','office','grey');introparts.push('Grey');colorWords.push('grey','gray','charcoal','soft grey');}
  if(/\bgold\b|\bchampagne\b/.test(t)){tags.push('bridal','honeymoon','satin');introparts.push('Gold');colorWords.push('gold','champagne');}
  if(/\blavender\b|\bpurple\b/.test(t)){tags.push('daily','comfort','sports');introparts.push('Lavender');colorWords.push('lavender','purple');}

  // BODY TYPE / SIZE INCLUSIVE
  if(/\bfat\b|\bplus.?siz\b|\bcurvy\b|\bfull.?figur\b|\bxxl\b|\b3xl\b|\b4xl\b|\bheavy\b|\blarger size\b/.test(t)){
    tags.push('shapewear','daily','comfort','full coverage','cotton');
    introparts.push('Plus Size');
  }

  // MOOD & FEEL
  if(/\bsexy\b|\bhot\b|\bbold\b|\bdaring\b|\bsensual\b/.test(t))tags.push('party','date','lace','evening');
  if(/\bromantic\b|\bintimate\b|\bpassionate\b/.test(t))tags.push('romantic','honeymoon','lace','satin');
  if(/\belegant\b|\bluxury\b|\bclassy\b|\bfancy\b/.test(t))tags.push('satin','luxury','bridal');
  if(/\bcomfy\b|\bcomfort\b|\bcozy\b|\bsoft\b|\baraam\b/.test(t))tags.push('daily','comfort','cotton');
  if(/\bcute\b|\bfun\b|\bpretty\b|\bplayful\b/.test(t))tags.push('daily','style','fashion');
  if(/\bprofessional\b|\bformal\b|\boffice\b|\bwork\b/.test(t))tags.push('office','formal','seamless');
  if(/\bsimple\b|\bminimal\b|\bbasic\b/.test(t))tags.push('daily','comfort','cotton');

  // OCCASION
  if(/\bwedding\b|\bbridal\b|\bshaadi\b/.test(t))tags.push('bridal','wedding','satin');
  if(/\bhoneymoon\b|\bsuhaagraat\b/.test(t))tags.push('honeymoon','romantic');
  if(/\bparty\b|\bnight.?out\b|\bclub\b/.test(t))tags.push('party','evening','style');
  if(/\bdate\b/.test(t))tags.push('date','romantic','lace');
  if(/\bgym\b|\bworkout\b|\brun\b|\bexercise\b|\bsports\b/.test(t))tags.push('sports','workout','active');
  if(/\bsleep\b|\bnighty\b|\bbed\b/.test(t))tags.push('nightwear','sleep');
  if(/\bsummer\b|\bhot.?weather\b/.test(t))tags.push('cotton','breathable','daily');
  if(/\beveryday\b|\bdaily\b|\broz\b/.test(t))tags.push('daily','comfort');

  // TYPE
  if(/\bbra\b|\bbralette\b/.test(t))tags.push('bra');
  if(/\bpanty\b|\bbrief\b|\bthong\b|\bunderwear\b/.test(t))tags.push('panty');
  if(/\bset\b|\bmatching\b/.test(t))tags.push('set');
  if(/\bnightwear\b|\bnighty\b|\bsleepwear\b|\bbabydoll\b|\bchemise\b/.test(t))tags.push('nightwear');
  if(/\bshapewear\b|\btummy\b|\bslimming\b/.test(t))tags.push('shapewear');
  if(/\bpush.?up\b/.test(t))tags.push('push-up','style');
  if(/\bstrapless\b|\bbackless\b/.test(t))tags.push('strapless');
  if(/\bsports.?bra\b/.test(t))tags.push('sports','workout');

  // FABRIC
  if(/\bcotton\b/.test(t))tags.push('cotton','breathable');
  if(/\blace\b/.test(t))tags.push('lace','style');
  if(/\bsatin\b|\bsilk\b/.test(t))tags.push('satin','luxury');
  if(/\bseamless\b|\binvisible\b/.test(t))tags.push('seamless');
  if(/\bsensitive\b|\ballerg\b|\brash\b/.test(t))tags.push('cotton','sensitive');

  // PRICE
  var pm=t.match(/(?:under|below|within|max|budget)[^\d]*(\d{3,5})/)||t.match(/(\d{3,5})[^\d]*(?:se kam|ke andar|tak)/);
  if(pm)maxPrice=parseInt(pm[1]);

  if(tags.length===0)return null;
  var uniq=tags.filter(function(v,i,a){return a.indexOf(v)===i;});
  var intro=introparts.length?introparts.join(' & ')+' Collection:':'Here\'s what I found:';
  return{tags:uniq,intro:intro,maxPrice:maxPrice,colorWords:colorWords};
}

function intent(txt){
  var t=txt.toLowerCase().trim();

  // ── SYSTEM / FLOW intents (non-product) ──
  if(/^(hi|hello|hey|hii|helo|namaste|namaskar|hola|start)[\s!.]*$/.test(t))return 'greet';
  if(/apply.*savvy20|apply.*code|apply.*coupon/.test(t))return 'coupon';
  if(/apply.*flash25|flash25/.test(t))return 'flash25';
  if(/^add personal note$|personal.*note|personal.*message/.test(t))return 'personal_note';
  if(/^set.*reminder$|monthly reminder/.test(t))return 'set_reminder';
  if(/^download.*catalogue|b2b catalogue/.test(t))return 'catalogue';
  if(/^talk to sales|sales team/.test(t))return 'sales_team';
  if(/^gift a subscription$|gift.*subscription/.test(t))return 'gift_sub';
  if(/^manage subscription/.test(t))return 'manage_sub';
  if(/^write a review$|write.*review/.test(t))return 'review';
  if(/^share on instagram$/.test(t))return 'instagram';
  if(/^contact support$/.test(t))return 'support';
  if(/^request exchange$|^size exchange$/.test(t))return 'returns';
  if(/^cancel subscription$/.test(t))return 'cancel_sub';
  if(/^pause this month$|pause.*subscription/.test(t))return 'pause_sub';
  if(/^change preferences$/.test(t))return 'flow_subscription';
  if(/^claim 100pts$|claim.*points/.test(t)){_points+=100;return 'points';}
  if(/^proceed to checkout$|checkout/.test(t))return 'checkout';
  if(/^view cart$|my cart/.test(t))return 'view_cart';
  if(/^still cancel$/.test(t))return 'cancel_sub';
  // Cart — MUST be before product/color search
  if(/add.*to cart|buy this|add all to cart/.test(t))return 'cart_add';
  if(/gift wrap|gift box|wrapping/.test(t))return 'gift_wrap';
  if(/refer.*friend/.test(t)){_points+=100;return 'points';}
  var oid=txt.match(/SVY[0-9]{6}/i);if(oid)return{orderid:oid[0].toUpperCase()};

  // ── GUIDED FLOWS ──
  if(/size|fit|naap|cup|band|mera size|calculate my size/.test(t))return 'flow_size';
  if(/gift.*(?:her|him|wife|girlfriend|mother|sister|friend)|gifting|present.*for/.test(t))return 'flow_gift';
  if(/period|cycle|menstrual|time of month/.test(t))return 'flow_period';
  if(/skin tone|complexion|fair skin|dusky|wheatish/.test(t))return 'flow_skinTone';
  if(/wholesale|boutique|bulk order|b2b|reseller|own.*store/.test(t))return 'flow_wholesale';
  if(/monthly box|subscribe|subscription plan/.test(t))return 'flow_subscription';
  if(/recommend|suggest|help me (?:find|choose|pick)|guide me|kya pehnu/.test(t))return 'flow_recommend';
  if(/shop.*occasion|by occasion/.test(t))return 'flow_occasion';

  // ── UTILITY ──
  if(/flash sale|flash deal/.test(t))return 'flash';
  if(/my point|loyalty point|point balance|kitne point/.test(t))return 'points';
  if(/offer|discount|coupon|deal|sale/.test(t))return 'offers';
  if(/fabric|material|difference between cotton|compare/.test(t))return 'fabric';
  if(/ship|deliver|kitne din|kab milega/.test(t)&&!/return/.test(t))return 'shipping';
  if(/return|exchange|refund|wapas/.test(t))return 'returns';
  if(/track|kahan hai|where.*order|order.*status/.test(t))return 'track';
  if(/pay|upi|cod|emi|credit|debit|gpay|phonepe|paytm/.test(t))return 'payment';
  if(/privac|discreet|plain.*packag|embarrass|secret/.test(t))return 'privacy';
  if(/^(?:shop again|continue shopping|explore new arrivals)$/.test(t))return{tags:['daily','comfort','style'],intro:'Continue shopping:'};

  // ── SMART NLP PRODUCT SEARCH ──
  var s=extractSearch(t);
  if(s){
    // Apply price filter in handle() via maxPrice field
    return{tags:s.tags,intro:s.intro,maxPrice:s.maxPrice};
  }

  return 'def';
}

function handle(txt){
  if(txt!==null)addMsg('usr',txt,null,0);
  var input=txt||'',L=_lang;

  // Post-purchase rating handler
  if(_postPurchase){
    _postPurchase=false;
    var rating=parseInt((input||'').charAt(0));
    if(rating>=4){_points+=50;bot('You earned 50 Savvyy Points for your review! Total: '+_points+' pts\n\nThank you! Would you like to share your experience?',['Write a Review','Share on Instagram','Shop Again']);}
    else if(rating===3){bot('Thank you for your feedback! We are always improving.\n\nNeed help with sizing or exchange?',['Size Exchange','Contact Support','Shop Again']);}
    else{bot('We are sorry it did not meet your expectations!\n\nOur team will contact you within 24 hours for a hassle-free exchange or refund.',['Request Exchange','Contact Support','Explore New Arrivals']);}
    return;
  }

  // Earn points per interaction
  if(txt!==null)_points+=5;

  if(_flow){flowStep(input);return;}
  if(_awaitOrder){
    _awaitOrder=false;
    var m=input.match(/SVY[0-9]{6}/i)||input.match(/\b[0-9]{6,}\b/);
    if(m)lookupOrder(m[0].toUpperCase());
    else bot('Please check the Order ID format (e.g., SVY123456) or visit savvyy.in/orders',['Try Again','Contact Support']);
    return;
  }
  var r=intent(input);
  if(r&&typeof r==='object'){
    if(r.tags){
      var prods=search(r.tags,12);
      // Color filter: remove products whose names contain a DIFFERENT specific color
      if(r.colorWords&&r.colorWords.length){
        var searchedColors=r.colorWords;
        prods=prods.filter(function(p){
          var nm=p.n.toLowerCase();
          // Keep if product name contains one of the searched colors
          if(searchedColors.some(function(c){return nm.indexOf(c)>-1;}))return true;
          // Remove if product name contains a different color word
          return!ALL_COLOR_WORDS.some(function(c){
            return searchedColors.indexOf(c)===-1&&nm.indexOf(c)>-1;
          });
        });
        // If less than 3 remain, relax filter: only remove hard-conflicting colors (black/white/grey/ivory/nude)
        if(prods.length<3){
          var hardConflicts=['black','white','ivory','nude','beige','grey','gray','charcoal'];
          prods=search(r.tags,10).filter(function(p){
            var nm=p.n.toLowerCase();
            return!hardConflicts.some(function(c){
              return searchedColors.indexOf(c)===-1&&nm.indexOf(c)>-1;
            });
          });
        }
        // Sort: exact color name match in product name comes first
        prods.sort(function(a,b){
          var an=searchedColors.some(function(c){return a.n.toLowerCase().indexOf(c)>-1;})?1:0;
          var bn=searchedColors.some(function(c){return b.n.toLowerCase().indexOf(c)>-1;})?1:0;
          return bn-an;
        });
      }
      if(r.maxPrice)prods=prods.filter(function(p){return p.pr<=r.maxPrice;});
      prods=prods.slice(0,6);
      // Plus-size query: add a friendly message first
      if(r.intro&&r.intro.indexOf('Plus Size')>-1){
        bot('We celebrate every body at Savvyy!\n\nAll our products come in sizes XS to 4XL. Here are our best picks for fuller figures — maximum comfort, support, and style:',null,0);
        setTimeout(function(){showCards('Best for fuller figures:',prods,['Find My Size','Add to Cart','More Options']);},600);
        return;
      }
      showCards(r.intro||'Here is what I found:',prods,['Complete the Set','Find My Size','Offers']);
      return;
    }
    if(r.orderid){lookupOrder(r.orderid);return;}
  }
  switch(r){
    case 'greet':
      if(L==='hi')bot(R.greet_hi_t,R.greet_hi_q);else bot(R.greet_en_t,R.greet_en_q);break;
    case 'flow_size':startFlow('size');break;
    case 'flow_recommend':startFlow('recommend');break;
    case 'flow_occasion':startFlow('occasion');break;
    case 'flow_gift':startFlow('gift');break;
    case 'flow_period':startFlow('period');break;
    case 'flow_skinTone':startFlow('skinTone');break;
    case 'flow_wholesale':startFlow('wholesale');break;
    case 'flow_subscription':startFlow('subscription');break;
    case 'offers':bot(R.offers_t,R.offers_q);break;
    case 'coupon':bot(R.coupon_t,R.coupon_q);break;
    case 'shipping':bot(R.shipping_t,R.shipping_q);break;
    case 'returns':bot(R.returns_t,R.returns_q);break;
    case 'track':_awaitOrder=true;bot(R.track_t,null);break;
    case 'payment':bot(R.payment_t,R.payment_q);break;
    case 'privacy':bot(R.privacy_t,R.privacy_q);break;
    case 'fabric':bot(R.fabric_t,R.fabric_q);break;
    case 'flash':var t2=showTyping();setTimeout(function(){t2.remove();showFlashSale();},800);break;
    case 'flash25':bot('Code FLASH25 applied! Extra 25% off your order.\n\nHurry, flash sale ends soon!',['Shop Bras','Shop Sets','Shop Nightwear']);break;
    case 'points':showPoints();break;
    case 'cart_add':
      _points+=20;
      var addedTags=[];
      if(/bra/.test(input.toLowerCase()))addedTags=['seamless','panty','daily'];
      else if(/panty|brief/.test(input.toLowerCase()))addedTags=['bra','matching','daily'];
      else addedTags=['daily','comfort','matching'];
      addMsg('bot','Added to cart! +20 Savvyy Points earned! (Total: '+_points+' pts)\n\nFree delivery above \u20b9499.',null,0);
      setTimeout(function(){showCards('Complete your look:',search(addedTags,4),['Add All to Cart','View Cart','Continue Shopping']);},600);
      break;
    case 'gift_wrap':bot('Gift wrapping added!\n\nYour order will arrive in a beautiful Savvyy gift box with a satin ribbon.\n\nWant to add a personal message card?',['Add Personal Note','Proceed to Checkout','Continue Shopping']);break;
    case 'personal_note':bot('Personal message added!\n\nYour handwritten note will be placed inside the gift box.\n\nReady to checkout?',['Proceed to Checkout','Continue Shopping','View Cart']);break;
    case 'set_reminder':bot('Reminder set!\n\nI will remind you 5 days before your next cycle to stock up on comfort essentials.\n\nYou earned 10 Savvyy Points!',['Add to Cart','Browse Comfort Picks']);_points+=10;break;
    case 'catalogue':bot('Sending our B2B catalogue to your email!\n\nYour catalogue includes:\n- Full product range with MRP\n- Wholesale pricing tiers\n- MOQ details\n- Fabric swatches\n\nExpect it within 15 minutes.',['Talk to Sales Team','Place Sample Order']);break;
    case 'sales_team':bot('Our B2B Sales Team will call you within 2 hours!\n\nFor urgent queries:\nEmail: b2b@savvyy.in\nWhatsApp: +91 98765 43210\n\nBusiness hours: 10am - 7pm IST',['Download Catalogue PDF','Place Sample Order']);break;
    case 'gift_sub':bot('Gift a Savvyy Monthly Box!\n\nYour loved one will receive a curated box every month.\n\nChoose a plan and we will send a beautiful gift card to their email.',['3 Month Gift - \u20b92,499','6 Month Gift - \u20b94,499','12 Month Gift - \u20b98,499']);break;
    case 'manage_sub':bot('Manage Your Subscription:\n\nPause anytime\nSkip a month\nChange preferences\nCancel anytime (no questions asked)\n\nVisit savvyy.in/my-subscription or chat with us here!',['Pause This Month','Change Preferences','Cancel Subscription']);break;
    case 'review':_points+=25;bot('Thank you for leaving a review! +25 Savvyy Points earned! (Total: '+_points+' pts)\n\nYour feedback helps thousands of other women choose better.',['Shop Again','Refer a Friend +100pts']);break;
    case 'instagram':bot('Share your Savvyy look on Instagram!\n\nTag us @savvyy.in and use #MySavvyy\n\nGet featured on our page and earn 100 bonus Savvyy Points!',['Claim 100pts','Shop Again']);break;
    case 'support':bot('Connecting you to support!\n\nEmail: hello@savvyy.in\nWhatsApp: +91 98765 43210\nResponse time: within 2 hours\n\nOr describe your issue here and I will help!',['Return / Exchange','Track Order','Size Help']);break;
    case 'checkout':bot('Proceeding to checkout!\n\nOrder Summary:\n- Your selected items\n- Discount applied\n- Free delivery above \u20b9499\n- 100% discreet packaging\n\nPayment options: UPI, Cards, COD, EMI',['Pay with UPI','Pay with Card','Cash on Delivery']);break;
    case 'view_cart':bot('Your Cart:\n\nItems added during this session\nDelivery: FREE (above \u20b9499)\nEstimated delivery: 3-5 days\nPackaging: Plain & discreet\n\nReady to checkout?',['Proceed to Checkout','Continue Shopping','Apply Coupon']);break;
    case 'cancel_sub':bot('We\'re sad to see you go!\n\nBefore cancelling, would you like to:\n- Pause for 1-3 months\n- Switch to a smaller plan\n- Change your preferences\n\nIf you still want to cancel, email hello@savvyy.in',['Pause This Month','Change Preferences','Still Cancel']);break;
    case 'pause_sub':bot('Your subscription is paused for this month!\n\nIt will resume automatically next month. You can unpause anytime.\n\nYou earned 10 loyalty points for staying with us!',['Resume Now','Manage Subscription']);_points+=10;break;
    default:
      if(L==='hi')bot(R.def_hi_t,R.def_hi_q);else bot(R.def_en_t,R.def_en_q);
  }
}

window.svLangToggle=function(){
  _lang=_lang==='en'?'hi':'en';
  document.getElementById('sv-lang').textContent=_lang.toUpperCase();
  document.getElementById('sv-msgs').innerHTML='';
  _flow=null;_step=0;_answers=[];_awaitOrder=false;
  if(_lang==='hi')bot(R.greet_hi_t,R.greet_hi_q);else bot(R.greet_en_t,R.greet_en_q);
};
window.svToggle=function(){
  _open=!_open;
  var win=document.getElementById('sv-win');
  win.className=_open?'svopen':'';
  var badge=document.getElementById('sv-badge');
  if(badge)badge.style.display=_open?'none':'block';
  if(_open&&!_greeted){_greeted=true;bot(R.greet_en_t,R.greet_en_q);}
};
window.svSend=function(){
  var inp=document.getElementById('sv-inp');
  var v=(inp.value||'').trim();
  if(!v)return;inp.value='';handle(v);
};

// === IMAGE UPLOAD & DETECTION ===
function getDominantColor(imgEl){
  try{
    var c=document.createElement('canvas');c.width=40;c.height=40;
    var ctx=c.getContext('2d');ctx.drawImage(imgEl,0,0,40,40);
    var d=ctx.getImageData(0,0,40,40).data,r=0,g=0,b=0,n=0;
    for(var i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];n++;}
    return{r:Math.round(r/n),g:Math.round(g/n),b:Math.round(b/n)};
  }catch(e){return{r:180,g:130,b:130};}
}

function colorToTags(r,g,b){
  if(r>200&&g>200&&b>200)return{tags:['bridal','wedding','satin','white'],desc:'white/bridal style'};
  if(r<60&&g<60&&b<60)return{tags:['party','date','lace','black'],desc:'black/evening style'};
  if(r>180&&g<120&&b<120)return{tags:['honeymoon','romantic','lace','red'],desc:'red/romantic style'};
  if(r>200&&g>160&&b>160)return{tags:['daily','comfort','cotton','blush'],desc:'blush/daily comfort style'};
  if(b>r+20&&b>g+20)return{tags:['sports','workout','gym','active'],desc:'sporty style'};
  if(r>160&&g>140&&b<120)return{tags:['seamless','nude','daily','office'],desc:'nude/seamless style'};
  if(r>140&&g>100&&b<80)return{tags:['honeymoon','romantic','satin'],desc:'warm/romantic style'};
  return{tags:['daily','comfort','cotton'],desc:'everyday comfort style'};
}

function showImgInChat(url){
  var box=document.getElementById('sv-msgs');
  var w=document.createElement('div');w.className='sv-m usr';
  var imgWrap=document.createElement('div');
  imgWrap.style.cssText='border-radius:12px;overflow:hidden;max-width:180px;box-shadow:0 2px 8px rgba(0,0,0,.15);';
  var img=document.createElement('img');
  img.src=url;img.style.cssText='width:100%;display:block;';
  imgWrap.appendChild(img);w.appendChild(imgWrap);
  var tm=document.createElement('div');tm.className='sv-t';tm.textContent=ts();w.appendChild(tm);
  box.appendChild(w);box.scrollTop=box.scrollHeight;
  return img;
}

function analyzeWithOpenAI(b64,mime,onResult){
  fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+OPENAI_KEY},
    body:JSON.stringify({
      model:'gpt-4o-mini',max_tokens:200,
      messages:[{role:'user',content:[
        {type:'image_url',image_url:{url:'data:'+mime+';base64,'+b64}},
        {type:'text',text:'Analyze this lingerie product image. Return ONLY JSON: {"type":"bra/panty/set/nightwear/shapewear","fabric":"cotton/lace/satin/microfibre/spandex","occasion":"daily/party/bridal/honeymoon/sports/formal","style":["kw1","kw2"],"color":"color name"}'}
      ]}]
    })
  })
  .then(function(r){return r.json();})
  .then(function(data){
    var text=(data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content)||'';
    var m=text.match(/\{[\s\S]*\}/);
    if(m){try{onResult(JSON.parse(m[0]));}catch(e){onResult(null);}}else{onResult(null);}
  })
  .catch(function(){onResult(null);});
}

function claudeResultToTags(result){
  var tags=[];
  if(result.type)tags.push(result.type);
  if(result.fabric)tags.push(result.fabric.toLowerCase());
  if(result.occasion){var occ=result.occasion.toLowerCase();tags.push(occ);if(occ==='honeymoon')tags.push('romantic');if(occ==='bridal')tags.push('wedding');}
  if(result.style&&result.style.length)result.style.forEach(function(s){tags.push(s.toLowerCase());});
  return tags;
}

function colorFallback(imgEl){
  var run=function(){
    var c=getDominantColor(imgEl);var r=colorToTags(c.r,c.g,c.b);
    addMsg('bot','I can see a '+r.desc+'! Here are similar styles:',null,0);
    setTimeout(function(){showCards('Similar products:',search(r.tags,6),['Complete the Set','Find My Size','Offers']);},400);
  };
  if(imgEl.complete&&imgEl.naturalWidth>0)run();else{imgEl.onload=run;imgEl.onerror=function(){showCards('Popular picks:',search(['daily','comfort','style'],6),['Find My Size','Offers']);}}
}

window.svImgUpload=function(input){
  try{
    var file=input.files&&input.files[0];
    if(!file)return;
    input.value='';

    // Show image immediately using object URL (no async needed)
    var objUrl=URL.createObjectURL(file);
    var imgEl=showImgInChat(objUrl);

    // Check if filename matches a catalog product (demo shortcut)
    var fname=file.name;
    var matched=null;
    for(var i=0;i<CAT.length;i++){if(CAT[i].img===fname){matched=CAT[i];break;}}

    if(matched){
      addMsg('bot','I found it! This is the '+matched.n+' from our collection.',null,0);
      var simTags=matched.tags.slice(0,4);
      setTimeout(function(){
        showCards('Similar to '+matched.n+':',search(simTags,6),['Add to Cart','Find My Size','Offers']);
      },600);
      return;
    }

    // Unknown image — try OpenAI Vision, fall back to color analysis
    addMsg('bot','Got it! Analyzing your image to find similar products...',null,0);
    var t=showTyping();

    if(OPENAI_KEY){
      var reader=new FileReader();
      reader.onload=function(e){
        var b64=e.target.result.split(',')[1];
        var mime=file.type||'image/jpeg';
        analyzeWithOpenAI(b64,mime,function(result){
          t.remove();
          if(result){
            var tags=claudeResultToTags(result);
            var desc=(result.color?result.color+' ':'')+result.type;
            addMsg('bot','I can see this is a '+desc+'! Here are similar products:',null,0);
            setTimeout(function(){showCards('Similar products:',search(tags,6),['Add to Cart','Find My Size','Offers']);},400);
          }else{
            colorFallback(imgEl);
          }
        });
      };
      reader.onerror=function(){t.remove();colorFallback(imgEl);};
      reader.readAsDataURL(file);
    }else{
      setTimeout(function(){t.remove();colorFallback(imgEl);},1000);
    }
  }catch(err){
    addMsg('bot','Please try uploading the image again!',['Browse Products','Find My Size'],0);
  }
};

// Update OpenAI key at runtime if needed
window.svSetKey=function(){
  var key=prompt('Enter your OpenAI API key:');
  if(key&&key.trim().startsWith('sk-')){
    OPENAI_KEY=key.trim();
    bot('OpenAI Vision activated! Upload any product screenshot and I will find similar items.',['Upload a Screenshot','Browse Products']);
  }
};

// Wire up file input via addEventListener (belt-and-suspenders with onchange attr)
var _fileInput=document.getElementById('sv-img-file');
if(_fileInput){
  _fileInput.addEventListener('change',function(){window.svImgUpload(this);});
}

// Handle drag-and-drop files onto the chat window
var _chatWin=document.getElementById('sv-win');
if(_chatWin){
  _chatWin.addEventListener('dragover',function(e){e.preventDefault();e.stopPropagation();});
  _chatWin.addEventListener('drop',function(e){
    e.preventDefault();e.stopPropagation();
    var files=e.dataTransfer&&e.dataTransfer.files;
    if(files&&files.length&&files[0].type.indexOf('image')===0){
      window.svImgUpload({files:files,value:''});
    }
  });
}

// Handle paste of images (Ctrl+V screenshot)
var _txtInp=document.getElementById('sv-inp');
if(_txtInp){
  // Block filename text from dropped files - intercept drop on text input
  _txtInp.addEventListener('drop',function(e){
    var files=e.dataTransfer&&e.dataTransfer.files;
    if(files&&files.length&&files[0].type.indexOf('image')===0){
      e.preventDefault();e.stopPropagation();
      window.svImgUpload({files:files,value:''});
    }
  });
  // Handle Ctrl+V paste of image from clipboard
  _txtInp.addEventListener('paste',function(e){
    var items=e.clipboardData&&e.clipboardData.items;
    if(!items)return;
    for(var i=0;i<items.length;i++){
      if(items[i].type.indexOf('image')===0){
        e.preventDefault();
        var file=items[i].getAsFile();
        if(file)window.svImgUpload({files:[file],value:''});
        return;
      }
    }
  });
}
})();
