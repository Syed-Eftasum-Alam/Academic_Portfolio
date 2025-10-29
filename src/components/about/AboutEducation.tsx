import React from 'react';
import { GraduationCap, Calendar, Building2 } from 'lucide-react';
import uiu from '../../../public/img/uiu.png';
import dcc from '../../../public/img/dcc.png';
import scpsc from '../../../public/img/scpsc.png';
import brac  from '../../../public/img/brac.png';

const AboutEducation = () => {
  const education = [
    {
      degree: "M.Sc. in Computer Science & Engineering",
      institution: "BRAC University",
      year: "Oct 2025 - Ongoing",
      description: "",
      logo: brac,
      theme: "bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border-orange-300 dark:border-orange-700",
      iconColor: "text-orange-700 dark:text-orange-400"
    },
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "United International University",
      year: "Jan 2020 - Jan 2024",
      description: "Major: Data Science | CGPA: 3.90 (On a scale of 4)",
      logo: uiu,
      theme: "bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border-orange-300 dark:border-orange-700",
      iconColor: "text-orange-700 dark:text-orange-400"
    },
    {
      degree: "Higher Secondary School Certificate",
      institution: "Dhaka City College", 
      year: "2017 - 2019",
      description: "Group: Science | GPA: 5.00 (On a scale of 5)",
      logo: dcc,
      theme: "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300 dark:border-blue-700",
      iconColor: "text-blue-700 dark:text-blue-400"
    },
    {
      degree: "Secondary School Certificate",
      institution: "Savar Cantonment Public School",
      year: "2015 - 2017", 
      description: "Group: Science | GPA: 5.00 (On a scale of 5)",
      logo: scpsc,
      theme: "bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 border-red-300 dark:border-red-700",
      iconColor: "text-red-700 dark:text-red-400"
    }
  ];

  // NEW: store per-card computed styles (only used for BRAC card per logic below)
  const [cardStyles, setCardStyles] = React.useState<Record<number, { background?: string; border?: string; icon?: string }>>({});

  // helper: convert color object to rgba string
  const rgbToRgba = (c: { r: number; g: number; b: number }, a = 1) => `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;

  // helper: darken by amount (0-255)
  const darken = (c: { r: number; g: number; b: number }, amt = 30) => ({
    r: Math.max(0, c.r - amt),
    g: Math.max(0, c.g - amt),
    b: Math.max(0, c.b - amt),
  });

  // Compute average color from an image element and store styles for the given index.
  const handleImageLoad = (imgEl: HTMLImageElement, index: number, institution: string) => {
    if (!institution.toLowerCase().includes('brac')) return; // only apply to BRAC card(s)
    try {
      const canvas = document.createElement('canvas');
      const size = 10; // small downscale to average color
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(imgEl, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha === 0) continue;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      if (count === 0) return;
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      const base = { r, g, b };
      const bg = `linear-gradient(135deg, ${rgbToRgba(base, 0.12)} 0%, ${rgbToRgba(darken(base, 40), 0.06)} 100%)`;
      const border = rgbToRgba(base, 0.45);
      const icon = `rgb(${r}, ${g}, ${b})`;
      setCardStyles(prev => ({ ...prev, [index]: { background: bg, border, icon } }));
    } catch (err) {
      // fail silently — leave default theme
    }
  };

  return (
    <div className="mt-20">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
          <GraduationCap size={24} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">Education</h3>
      </div>
      
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {education.map((item, index) => {
          const isBrac = item.institution.toLowerCase().includes('brac');
          // Classes for BRAC card text
          const yearClass = isBrac
            ? 'text-sm font-medium text-black dark:text-white'
            : `text-sm font-medium ${item.iconColor}`;
          const degreeClass = isBrac
            ? 'text-lg font-semibold text-black dark:text-white mb-2'
            : 'text-lg font-semibold text-slate-800 dark:text-white mb-2';
          const institutionClass = isBrac
            ? 'text-black dark:text-slate-300 font-medium mb-2'
            : 'text-slate-600 dark:text-slate-300 font-medium mb-2';
          const descriptionClass = isBrac
            ? 'text-black dark:text-slate-400 text-sm'
            : 'text-slate-600 dark:text-slate-400 text-sm';
          const yearStyle = isBrac ? undefined : { color: cardStyles[index]?.icon ?? undefined };
          // Calendar icon color for BRAC card
          const calendarStyle = isBrac
            ? undefined // use Tailwind classes for color
            : { color: cardStyles[index]?.icon };
          return (
            <div
              key={index}
              className={`p-6 ${item.theme} rounded-xl hover:shadow-lg transition-all duration-300 border`}
              style={{
                background: cardStyles[index]?.background,
                borderColor: cardStyles[index]?.border,
              }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center mr-4 border border-gray-200 dark:border-gray-700">
                  <img 
                    src={item.logo} 
                    alt={`${item.institution} logo`}
                    className="w-12 h-12 object-contain rounded-md"
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      handleImageLoad(target, index, item.institution);
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <Building2 
                    size={24} 
                    className="text-gray-400 dark:text-gray-500 hidden" 
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Calendar
                      size={16}
                      className={`mr-2${isBrac ? ' text-black dark:text-white' : ''}`}
                      style={calendarStyle}
                    />
                    <span className={yearClass} style={yearStyle}>{item.year}</span>
                  </div>
                </div>
              </div>
              <h4 className={degreeClass}>{item.degree}</h4>
              <p className={institutionClass}>{item.institution}</p>
              <p className={descriptionClass}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutEducation;
