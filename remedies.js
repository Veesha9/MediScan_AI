/* ============================================================
   MediScan AI — Home Remedies Database
   File: js/remedies.js
   Contains: All symptom → remedy mappings
   ============================================================ */

/*
 * REMEDY DATABASE
 * Each key = symptom name
 * Each value = array of remedy objects { name, desc }
 */
const REMEDY_DB = {

  Fever: [
    {
      name: 'Tulsi & Ginger Tea',
      desc: 'Boil 5 fresh tulsi leaves and 1 inch ginger in 2 cups of water for 10 minutes. Strain, add honey, and drink warm 2–3 times a day.'
    },
    {
      name: 'Cold Compress',
      desc: 'Soak a clean cloth in cool water and place it on the forehead. Replace every 15 minutes to gradually reduce body temperature.'
    },
    {
      name: 'Stay Hydrated',
      desc: 'Drink plenty of water, coconut water, lemon juice, and ORS solutions to prevent dehydration caused by fever.'
    }
  ],

  Headache: [
    {
      name: 'Peppermint Oil Massage',
      desc: 'Dilute 2 drops of peppermint essential oil in 1 tsp of coconut oil. Gently massage onto temples and forehead in circular motions.'
    },
    {
      name: 'Clove & Salt Milk',
      desc: 'Crush 4–5 cloves and mix with a pinch of black salt in warm milk. Drink once — excellent for tension headaches.'
    },
    {
      name: 'Hydrate Immediately',
      desc: 'Drink a large glass of water. Dehydration is one of the most common triggers of headaches. Sip slowly and rest.'
    }
  ],

  Fatigue: [
    {
      name: 'Ashwagandha Golden Milk',
      desc: 'Mix ½ tsp ashwagandha powder in warm milk with honey and a pinch of cardamom. Drink at night — boosts energy and reduces stress.'
    },
    {
      name: 'Soaked Dates & Almonds',
      desc: 'Soak 4–5 dates and 5–6 almonds overnight. Eat them first thing each morning for sustained energy and iron replenishment.'
    },
    {
      name: 'Power Nap (20 min)',
      desc: 'A short 20–30 minute nap in the afternoon significantly restores alertness and energy without disturbing nighttime sleep.'
    }
  ],

  Cough: [
    {
      name: 'Honey & Ginger Syrup',
      desc: 'Mix 1 tsp of pure honey with 3–4 drops of fresh ginger juice. Take this mixture twice daily. Soothes throat irritation and reduces cough.'
    },
    {
      name: 'Steam Inhalation',
      desc: 'Boil water and add 2–3 drops of eucalyptus oil. Inhale the steam for 10 minutes with a towel over your head. Do this twice daily.'
    },
    {
      name: 'Mulethi (Licorice) Tea',
      desc: 'Steep a small mulethi (licorice root) stick in boiling water for 5 minutes. Drink warm. Acts as a natural expectorant and cough suppressant.'
    }
  ],

  Cold: [
    {
      name: 'Immunity Kadha',
      desc: 'Boil tulsi, ginger, black pepper, cloves, and a cinnamon stick in 2 cups of water until reduced to half. Drink warm with honey twice daily.'
    },
    {
      name: 'Saline Nasal Rinse',
      desc: 'Dissolve ¼ tsp of non-iodized salt in 1 cup of warm water. Tilt head and gently rinse each nostril to flush out mucus and congestion.'
    },
    {
      name: 'Vitamin C Boost',
      desc: 'Eat amla (Indian gooseberry), oranges, or guavas daily. High vitamin C content strengthens immunity and reduces cold duration.'
    }
  ],

  'Sore Throat': [
    {
      name: 'Warm Salt Water Gargle',
      desc: 'Dissolve ½ tsp of table salt in a glass of warm water. Gargle for 30 seconds, then spit. Repeat 3–4 times daily to kill bacteria.'
    },
    {
      name: 'Haldi Doodh (Turmeric Milk)',
      desc: 'Mix ½ tsp turmeric powder in warm milk with a teaspoon of honey. Drink before bed. Powerful anti-inflammatory and antibacterial remedy.'
    },
    {
      name: 'Honey & Lemon Water',
      desc: 'Squeeze half a lemon into warm water, add 1 tbsp of honey. Sip slowly throughout the day. Reduces inflammation and coats the throat.'
    }
  ],

  'Body Pain': [
    {
      name: 'Epsom Salt Soak',
      desc: 'Dissolve 2 cups of Epsom salt in a warm bathtub. Soak for 15–20 minutes. Magnesium in Epsom salt penetrates muscles and relieves soreness.'
    },
    {
      name: 'Turmeric & Ginger Milk',
      desc: 'Powerful anti-inflammatory combination. Add ½ tsp each of turmeric and ginger to warm milk. Drink twice daily for best results.'
    },
    {
      name: 'Warm Compress',
      desc: 'Apply a warm heating pad or hot water bottle wrapped in a cloth to the painful area for 15–20 minutes. Repeat every few hours.'
    }
  ],

  Nausea: [
    {
      name: 'Fresh Ginger Tea',
      desc: 'Slice 3–4 pieces of fresh ginger, steep in boiling water for 10 minutes. Add honey and sip slowly. Ginger is clinically proven to reduce nausea.'
    },
    {
      name: 'Peppermint Aromatherapy',
      desc: 'Sniff pure peppermint essential oil directly from the bottle, or sip cold peppermint tea. The scent blocks nausea signals to the brain.'
    },
    {
      name: 'BRAT Diet',
      desc: 'Eat Bananas, Rice, Applesauce, and Toast — soft, bland foods that are easy to digest and help settle an upset stomach.'
    }
  ],

  Vomiting: [
    {
      name: 'ORS / Coconut Water',
      desc: 'Sip small amounts (1–2 sips) of oral rehydration solution or coconut water every 5–10 minutes to replace lost fluids and electrolytes.'
    },
    {
      name: 'Jeera (Cumin) Water',
      desc: 'Boil 1 tsp of cumin seeds in 2 cups of water for 5 minutes. Let it cool and sip slowly. Reduces the vomiting reflex naturally.'
    },
    {
      name: 'Ginger & Mint Tea',
      desc: 'Brew ginger slices with fresh mint leaves. Cool slightly and sip — calms stomach muscles and stops vomiting spasms.'
    }
  ],

  Diarrhea: [
    {
      name: 'Banana & Fresh Curd',
      desc: 'Eat 1–2 ripe bananas with fresh homemade curd (yogurt) 2–3 times daily. Restores gut bacteria and provides potassium lost through diarrhea.'
    },
    {
      name: 'Rice Water',
      desc: 'Boil ½ cup white rice in 3 cups water. Strain and drink the starchy water with a pinch of salt. Natural binding agent, very effective.'
    },
    {
      name: 'Pomegranate Juice',
      desc: 'Drink ½ cup of fresh pomegranate juice twice a day. Natural astringent properties help firm stools and reduce frequency of motions.'
    }
  ],

  Constipation: [
    {
      name: 'Warm Lemon Water (Morning)',
      desc: 'Every morning, drink a glass of warm water with juice of half a lemon on an empty stomach. Stimulates the digestive tract.'
    },
    {
      name: 'Triphala Churna',
      desc: 'Mix ½ tsp of triphala powder in warm water and drink before bed. This Ayurvedic formula is one of the most effective natural laxatives.'
    },
    {
      name: 'Isabgol (Psyllium Husk)',
      desc: 'Mix 1–2 tsp of isabgol in a glass of warm water or milk. Drink immediately before it thickens. Take at bedtime for morning relief.'
    }
  ],

  'Stomach Pain': [
    {
      name: 'Ajwain with Black Salt',
      desc: 'Chew ½ tsp of carom seeds (ajwain) with a pinch of black salt, followed by warm water. Provides relief within 15–20 minutes.'
    },
    {
      name: 'Saunf (Fennel) Tea',
      desc: 'Steep 1 tsp of fennel seeds in hot water for 5 minutes. Drink after meals to ease cramps, gas, and abdominal spasms.'
    },
    {
      name: 'Hing (Asafoetida) Paste',
      desc: 'Mix a small pinch of hing in warm water to form a thin paste. Apply gently on the navel area. Relieves gas-related stomach pain.'
    }
  ],

  Bloating: [
    {
      name: 'Jeera (Cumin) Water',
      desc: 'Boil 1 tsp of cumin seeds in 2 cups of water for 5 minutes. Strain and drink warm after every meal. Prevents gas formation.'
    },
    {
      name: 'Post-Meal Walk',
      desc: 'Take a gentle 10–15 minute walk after eating. Walking stimulates gut motility, significantly reducing gas and bloating.'
    },
    {
      name: 'Avoid Gas-Forming Foods',
      desc: 'Temporarily avoid carbonated drinks, raw cabbage, beans, broccoli, and dairy (if lactose intolerant). These are the top bloating triggers.'
    }
  ],

  Dizziness: [
    {
      name: 'Ginger Candy or Tea',
      desc: 'Suck on a piece of ginger candy or sip warm ginger tea. Ginger improves blood circulation and reduces vertigo-related dizziness.'
    },
    {
      name: 'Hydration First',
      desc: 'Drink a large glass of water immediately. Dehydration and low blood pressure are the #1 cause of sudden dizziness in most people.'
    },
    {
      name: 'Sit & Deep Breathe',
      desc: 'Sit down immediately to avoid falling. Close your eyes and take slow, deep breaths for 3–5 minutes until the dizziness passes.'
    }
  ],

  'Back Pain': [
    {
      name: 'Methi (Fenugreek) Seeds',
      desc: 'Soak 1 tbsp of fenugreek seeds in water overnight. Eat them the next morning on an empty stomach. Natural anti-inflammatory for chronic back pain.'
    },
    {
      name: 'Warm Oil Back Massage',
      desc: 'Gently massage warm sesame oil, mustard oil, or coconut oil on the painful area in slow circular motions for 10–15 minutes.'
    },
    {
      name: 'Yoga Stretches',
      desc: 'Perform Cat-Cow pose, Child\'s Pose, and Supine Twist daily for 10 minutes. These gentle stretches relieve lumbar tension and stiffness.'
    }
  ],

  'Joint Pain': [
    {
      name: 'Golden Milk (Haldi Doodh)',
      desc: 'Mix ½ tsp turmeric + a pinch of black pepper in warm milk. Drink daily. Curcumin in turmeric is a powerful natural anti-inflammatory.'
    },
    {
      name: 'Hot & Cold Therapy',
      desc: 'Apply an ice pack for 15 minutes (reduces inflammation), then a heating pad for 15 minutes (improves blood flow). Alternate twice daily.'
    },
    {
      name: 'Fenugreek Paste',
      desc: 'Grind soaked fenugreek seeds into a thick paste. Apply generously on the painful joint, wrap with a cloth, and leave for 30–45 minutes.'
    }
  ],

  'Skin Rash': [
    {
      name: 'Aloe Vera Gel',
      desc: 'Apply fresh aloe vera gel (from the leaf directly) on the rash. Leave for 30 minutes, then rinse. Anti-inflammatory and cooling.'
    },
    {
      name: 'Virgin Coconut Oil',
      desc: 'Apply a thin layer of virgin coconut oil 2–3 times daily. Contains lauric acid with antifungal and antibacterial properties.'
    },
    {
      name: 'Oatmeal Soak',
      desc: 'Add 1 cup of colloidal (finely ground) oatmeal to lukewarm bathwater. Soak for 15–20 minutes. Soothes itching and reduces redness.'
    }
  ],

  Insomnia: [
    {
      name: 'Warm Milk with Jaiphal',
      desc: 'Drink a cup of warm milk with a pinch of nutmeg (jaiphal) powder 30 minutes before bed. Nutmeg contains myristicin — a natural sedative.'
    },
    {
      name: 'Ashwagandha Before Sleep',
      desc: 'Take 300–500 mg of ashwagandha powder in warm milk or water at bedtime. Reduces cortisol levels and promotes deeper sleep.'
    },
    {
      name: 'Screen-Free Wind-Down',
      desc: 'Avoid all screens (phone, TV, laptop) at least 1 hour before bed. Read a physical book, practice deep breathing, or do light meditation.'
    }
  ],

  Anxiety: [
    {
      name: 'Brahmi (Bacopa) Tea',
      desc: 'Steep fresh or dried brahmi leaves in hot water for 5 minutes. Drink 1–2 cups daily. Brahmi is an adaptogenic herb that calms the nervous system.'
    },
    {
      name: '4-7-8 Breathing Technique',
      desc: 'Inhale through nose for 4 seconds → Hold for 7 seconds → Exhale through mouth for 8 seconds. Repeat 4 cycles. Instantly reduces anxiety.'
    },
    {
      name: 'Lavender Aromatherapy',
      desc: 'Inhale lavender essential oil from the bottle or use a diffuser. Multiple clinical studies confirm lavender reduces anxiety as effectively as mild medication.'
    }
  ],

  'Loss of Appetite': [
    {
      name: 'Ginger & Lime Tonic',
      desc: 'Mix 1 tsp fresh ginger juice with juice of half a lime and a pinch of black salt. Drink 30 minutes before meals to stimulate digestive juices.'
    },
    {
      name: 'Dhania (Coriander) Water',
      desc: 'Soak 1 tbsp of coriander seeds in a glass of water overnight. Drain and drink in the morning on empty stomach. Stimulates appetite naturally.'
    },
    {
      name: 'Triphala Before Meals',
      desc: 'Take ½ tsp of triphala powder in warm water 30 minutes before eating. Improves digestion, cleanses the gut, and restores natural hunger.'
    }
  ],

  'Chest Pain': [
    {
      name: 'Garlic Milk',
      desc: 'Crush 2 garlic cloves and boil in milk for 5 minutes. Drink warm. Helps if the chest pain is caused by gas or acidity (not cardiac).'
    },
    {
      name: 'Diaphragmatic Breathing',
      desc: 'Lie flat, place a hand on your belly. Inhale slowly through nose, letting your belly rise. Exhale slowly. Repeat 10 times. Helps if anxiety-related.'
    },
    {
      name: '⚠️ IMPORTANT — See a Doctor',
      desc: 'If chest pain is persistent, radiates to arm/jaw, or comes with breathlessness — STOP home remedies and seek emergency medical help IMMEDIATELY.'
    }
  ],

  'Shortness of Breath': [
    {
      name: 'Steam Inhalation',
      desc: 'Boil water, add 2–3 drops of eucalyptus oil. Inhale steam with a towel over your head for 10 minutes. Opens airways and reduces congestion.'
    },
    {
      name: 'Pursed Lip Breathing',
      desc: 'Inhale through your nose for 2 counts. Pucker lips like whistling, exhale slowly for 4 counts. Repeat 10 times to normalize breathing rate.'
    },
    {
      name: '⚠️ IMPORTANT — Medical Attention',
      desc: 'Recurring or severe shortness of breath can indicate asthma, anemia, or heart conditions. Please consult a doctor for proper diagnosis.'
    }
  ]
};
