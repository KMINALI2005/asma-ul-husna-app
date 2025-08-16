"use client";

import React, { useState, useMemo } from 'react';

// أسماء الله الحسنى مع معانيها
const NAMES = [
  { name: "الرحمن", meaning: "ذو الرحمة الواسعة" },
  { name: "الرحيم", meaning: "ذو الرحمة الواصلة" },
  { name: "الملك", meaning: "صاحب الملك والسلطان المطلق" },
  { name: "القدوس", meaning: "الطاهر المنزه عن العيوب والنقائص" },
  { name: "السلام", meaning: "من سلم من كل عيب" },
  { name: "المؤمن", meaning: "الذي يمن على عباده بالأمن والطمأنينة" },
  { name: "المهيمن", meaning: "الرقيب على كل شيء" },
  { name: "العزيز", meaning: "القوي الذي لا يغلب" },
  { name: "الجبار", meaning: "القاهر الذي قهر خلقه" },
  { name: "المتكبر", meaning: "المتعالي عن صفات الخلق" },
  { name: "الخالق", meaning: "المبدع للخلق من غير مثال سابق" },
  { name: "البارئ", meaning: "المميز للخلق بعضه عن بعض" },
  { name: "المصور", meaning: "الذي صور جميع الموجودات" },
  { name: "الغفار", meaning: "الذي يغفر الذنوب ويستر العيوب" },
  { name: "القهار", meaning: "القاهر لكل شيء" },
  { name: "الوهاب", meaning: "الذي يعطي العطاء من غير عوض" },
  { name: "الرزاق", meaning: "الذي يرزق الخلق ويقوتهم" },
  { name: "الفتاح", meaning: "الذي يفتح أبواب الرحمة والخير" },
  { name: "العليم", meaning: "الذي أحاط بكل شيء علماً" },
  { name: "القابض", meaning: "الذي يقبض الرزق عمن يشاء" },
  { name: "الباسط", meaning: "الذي يبسط الرزق لمن يشاء" },
  { name: "الخافض", meaning: "الذي يخفض من يشاء من خلقه" },
  { name: "الرافع", meaning: "الذي يرفع من يشاء من خلقه" },
  { name: "المعز", meaning: "الذي يعز من يشاء" },
  { name: "المذل", meaning: "الذي يذل من يشاء" },
  { name: "السميع", meaning: "الذي يسمع كل شيء" },
  { name: "البصير", meaning: "الذي يبصر كل شيء" },
  { name: "الحكم", meaning: "الذي يحكم بين خلقه" },
  { name: "العدل", meaning: "الذي يعدل في حكمه" },
  { name: "اللطيف", meaning: "الذي لطف بعباده" },
  { name: "الخبير", meaning: "الذي يعلم بواطن الأمور" },
  { name: "الحليم", meaning: "الذي لا يعجل بالعقوبة" },
  { name: "العظيم", meaning: "الذي له كل معاني العظمة" },
  { name: "الغفور", meaning: "الذي يغفر الذنوب" },
  { name: "الشكور", meaning: "الذي يشكر العبد على طاعته" },
  { name: "العلي", meaning: "المرتفع على كل شيء" },
  { name: "الكبير", meaning: "الذي له كل معاني الكبرياء" },
  { name: "الحفيظ", meaning: "الذي يحفظ عباده" },
  { name: "المقيت", meaning: "الذي يقدر لعباده ما يحتاجون" },
  { name: "الحسيب", meaning: "الذي يحاسب عباده" },
  { name: "الجليل", meaning: "الذي له كل معاني الجلال" },
  { name: "الكريم", meaning: "الذي يعطي بغير حساب" },
  { name: "الرقيب", meaning: "الذي يراقب عباده" },
  { name: "المجيب", meaning: "الذي يجيب دعاء الداعين" },
  { name: "الواسع", meaning: "الذي وسع كل شيء رحمة" },
  { name: "الحكيم", meaning: "الذي يضع الأمور في مواضعها" },
  { name: "الودود", meaning: "الذي يحب عباده ويحبونه" },
  { name: "المجيد", meaning: "الذي له المجد والشرف" },
  { name: "الباعث", meaning: "الذي يبعث الخلق يوم القيامة" },
  { name: "الشهيد", meaning: "الذي يشهد على كل شيء" },
  { name: "الحق", meaning: "الثابت الذي لا يتغير" },
  { name: "الوكيل", meaning: "الذي يتولى أمور عباده" },
  { name: "القوي", meaning: "الذي له القوة كلها" },
  { name: "المتين", meaning: "الشديد القوة" },
  { name: "الولي", meaning: "الذي يتولى عباده" },
  { name: "الحميد", meaning: "الذي يحمد على كل حال" },
  { name: "المحصي", meaning: "الذي أحصى كل شيء" },
  { name: "المبدئ", meaning: "الذي يبدأ الخلق" },
  { name: "المعيد", meaning: "الذي يعيد الخلق" },
  { name: "المحيي", meaning: "الذي يحيي الموتى" },
  { name: "المميت", meaning: "الذي يميت الأحياء" },
  { name: "الحي", meaning: "الذي لا يموت" },
  { name: "القيوم", meaning: "الذي يقوم بنفسه" },
  { name: "الواجد", meaning: "الذي يجد ما يريد" },
  { name: "الماجد", meaning: "الذي له المجد" },
  { name: "الواحد", meaning: "الذي لا شريك له" },
  { name: "الأحد", meaning: "الذي لا شبيه له" },
  { name: "الصمد", meaning: "الذي يصمد إليه الخلق" },
  { name: "القادر", meaning: "الذي على كل شيء قدير" },
  { name: "المقتدر", meaning: "الذي يقدر على كل شيء" },
  { name: "المقدم", meaning: "الذي يقدم من يشاء" },
  { name: "المؤخر", meaning: "الذي يؤخر من يشاء" },
  { name: "الأول", meaning: "الذي لا بداية له" },
  { name: "الآخر", meaning: "الذي لا نهاية له" },
  { name: "الظاهر", meaning: "الذي ظهر فوق كل شيء" },
  { name: "الباطن", meaning: "الذي بطن عن كل شيء" },
  { name: "الوالي", meaning: "الذي يتولى أمور عباده" },
  { name: "المتعالي", meaning: "الذي تعالى عن كل شيء" },
  { name: "البر", meaning: "الذي يبر عباده" },
  { name: "التواب", meaning: "الذي يتوب على عباده" },
  { name: "المنتقم", meaning: "الذي ينتقم من أعدائه" },
  { name: "العفو", meaning: "الذي يعفو عن الذنوب" },
  { name: "الرؤوف", meaning: "الذي يرحم عباده" },
  { name: "مالك الملك", meaning: "الذي يملك الملك كله" },
  { name: "ذو الجلال والإكرام", meaning: "الذي له الجلال والإكرام" },
  { name: "المقسط", meaning: "الذي يقسم العدل" },
  { name: "الجامع", meaning: "الذي يجمع الأشياء" },
  { name: "الغني", meaning: "الذي لا يحتاج إلى شيء" },
  { name: "المغني", meaning: "الذي يغني عباده" },
  { name: "المانع", meaning: "الذي يمنع ما يشاء" },
  { name: "الضار", meaning: "الذي يضر ما يشاء" },
  { name: "النافع", meaning: "الذي ينفع ما يشاء" },
  { name: "النور", meaning: "الذي يضيء السماوات والأرض" },
  { name: "الهادي", meaning: "الذي يهدي عباده" },
  { name: "البديع", meaning: "الذي لا شبيه له" },
  { name: "الباقي", meaning: "الذي لا يزول" },
  { name: "الوارث", meaning: "الذي يرث كل شيء" },
  { name: "الرشيد", meaning: "الذي يرشد عباده" },
  { name: "الصبور", meaning: "الذي لا يعجل بالعقوبة" }
];

// تدرجات الألوان للبطاقات
const GRADIENTS = [
  "from-purple-500 to-indigo-600",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-cyan-500 to-blue-500",
  "from-violet-500 to-purple-600",
  "from-fuchsia-500 to-pink-500",
  "from-rose-500 to-red-500",
  "from-orange-500 to-amber-500",
  "from-teal-500 to-emerald-500",
  "from-blue-500 to-cyan-500",
  "from-indigo-500 to-violet-500",
];

export default function Page() {
  const [query, setQuery] = useState("");
  const [sortAZ, setSortAZ] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  // فلترة وترتيب الأسماء
  const filtered = useMemo(() => {
    let result = NAMES.filter((item) =>
      item.name.replace(/\s+/g, "").includes(query.replace(/\s+/g, ""))
    );

    if (sortAZ) {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "ar"));
    }

    return result;
  }, [query, sortAZ]);

  // نسخ الاسم إلى الحافظة
  const copyName = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      alert(`تم نسخ الاسم: ${name}`);
    } catch (err) {
      alert("فشل نسخ الاسم، يرجى المحاولة مرة أخرى");
    }
  };

  // إعادة الضبط
  const reset = () => {
    setQuery("");
    setSortAZ(false);
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8" dir="rtl">
      {/* شريط الحالة العلوي */}
      <div className="flex justify-between items-center mb-6 text-white">
        <div className="text-sm opacity-70">
          {new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="w-1 h-1 bg-white rounded-full opacity-70"></div>
        </div>
      </div>

      {/* الرأس */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          أسماء الله الحسنى
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          استكشف الأسماء التسعة والتسعين لله الحسنى مع معانيها
        </p>
      </header>

      {/* شريط الأدوات */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4 mb-6 border border-white/20">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* البحث */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="ابحث عن اسم..."
              className="w-full p-4 pr-12 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 backdrop-blur-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="absolute left-4 top-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          {/* زر الترتيب */}
          <button
            onClick={() => setSortAZ(!sortAZ)}
            className={`px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium ${
              sortAZ 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
            }`}
            aria-label={sortAZ ? "الترتيب الأصلي" : "الترتيب الأبجدي"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            {sortAZ ? "الأصلي" : "أبجدي"}
          </button>

          {/* زر إعادة الضبط */}
          <button
            onClick={reset}
            className="px-6 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20 font-medium"
            aria-label="إعادة الضبط"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            إعادة ضبط
          </button>
        </div>

        {/* عداد النتائج */}
        <div className="mt-4 text-gray-300 text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          عدد النتائج: {filtered.length} من 99
        </div>
      </div>

      {/* شبكة البطاقات */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item, index) => {
          const originalIndex = NAMES.findIndex(n => n.name === item.name);
          const gradientClass = GRADIENTS[originalIndex % GRADIENTS.length];
          
          return (
            <div
              key={originalIndex}
              className={`bg-gradient-to-br ${gradientClass} rounded-2xl shadow-2xl p-5 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:rotate-1 backdrop-blur-sm border border-white/20`}
              onClick={() => setSelected(originalIndex)}
            >
              <div className="text-right">
                <div className="text-xl font-bold mb-2 leading-tight">{item.name}</div>
                <div className="text-xs opacity-80 bg-white/20 rounded-full px-2 py-1 inline-block">
                  #{originalIndex + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* شريط تفاصيل الاسم */}
      {selected !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 via-purple-800 to-slate-800 w-full max-w-md rounded-3xl shadow-2xl p-6 animate-scale-up border border-white/20">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{NAMES[selected].name}</h2>
                <div className="text-blue-300 text-sm bg-blue-500/20 rounded-full px-3 py-1 inline-block">
                  الاسم رقم: {selected + 1}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="إغلاق"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* المعنى */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                المعنى
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed bg-white/5 rounded-xl p-4 border border-white/10">
                {NAMES[selected].meaning}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => copyName(NAMES[selected].name)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
                aria-label="نسخ الاسم"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                نسخ الاسم
              </button>
              
              <button
                onClick={() => setSelected(null)}
                className="flex-1 bg-white/10 text-white py-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 font-medium border border-white/20"
                aria-label="إغلاق"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* رسالة عدم وجود نتائج */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-medium text-gray-300 mb-2">لا توجد نتائج</h3>
          <p className="text-gray-500">يرجى تعديل معايير البحث وإعادة المحاولة</p>
        </div>
      )}

      {/* شريط الحالة السفلي */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10 p-3">
        <div className="flex justify-center items-center gap-2 text-gray-400 text-sm">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <span>أسماء الله الحسنى</span>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* تخصيص أنيميشن الشريط المركزي */}
      <style jsx>{`
        @keyframes scale-up {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}