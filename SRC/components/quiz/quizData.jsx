export const quizQuestions = [
  {
    id: 1,
    category: "Physical & Hands-On",
    question: "Which of these hands-on tasks do you feel most comfortable with?",
    description: "Select all that apply to you",
    skills: [
      { id: "physical_labor", label: "Heavy lifting & physical stamina", icon: "💪" },
      { id: "tool_operation", label: "Operating tools & equipment", icon: "🔧" },
      { id: "precision_work", label: "Detailed, precise hand work", icon: "🎯" },
      { id: "driving", label: "Driving & vehicle operation", icon: "🚗" },
      { id: "cleaning_maintenance", label: "Cleaning & maintenance tasks", icon: "🧹" },
      { id: "cooking_food", label: "Cooking & food preparation", icon: "🍳" },
    ]
  },
  {
    id: 2,
    category: "People & Communication",
    question: "How do you work best with other people?",
    description: "Select all that apply to you",
    skills: [
      { id: "customer_service", label: "Helping customers face-to-face", icon: "🤝" },
      { id: "teamwork", label: "Working well in a team", icon: "👥" },
      { id: "teaching", label: "Explaining things & teaching others", icon: "📚" },
      { id: "empathy", label: "Understanding others' feelings", icon: "❤️" },
      { id: "conflict_resolution", label: "Resolving disagreements", icon: "⚖️" },
      { id: "leadership", label: "Leading & motivating others", icon: "🌟" },
    ]
  },
  {
    id: 3,
    category: "Organization & Detail",
    question: "What organizational strengths do you have?",
    description: "Select all that apply to you",
    skills: [
      { id: "time_management", label: "Managing time & deadlines", icon: "⏰" },
      { id: "record_keeping", label: "Keeping accurate records", icon: "📋" },
      { id: "inventory", label: "Tracking inventory & supplies", icon: "📦" },
      { id: "multitasking", label: "Juggling multiple tasks", icon: "🎪" },
      { id: "safety_compliance", label: "Following safety procedures", icon: "🛡️" },
      { id: "quality_control", label: "Spotting errors & quality checks", icon: "🔍" },
    ]
  },
  {
    id: 4,
    category: "Problem Solving & Adaptability",
    question: "How do you handle challenges at work?",
    description: "Select all that apply to you",
    skills: [
      { id: "troubleshooting", label: "Figuring out what's broken", icon: "🔎" },
      { id: "creative_solutions", label: "Finding creative solutions", icon: "💡" },
      { id: "adaptability", label: "Adapting to new situations quickly", icon: "🔄" },
      { id: "pressure_handling", label: "Staying calm under pressure", icon: "🧘" },
      { id: "learning_new", label: "Picking up new skills fast", icon: "📖" },
      { id: "decision_making", label: "Making quick decisions", icon: "⚡" },
    ]
  },
  {
    id: 5,
    category: "Technical & Digital",
    question: "What's your comfort level with technology?",
    description: "Select all that apply to you",
    skills: [
      { id: "basic_computer", label: "Basic computer & internet use", icon: "💻" },
      { id: "data_entry", label: "Data entry & spreadsheets", icon: "📊" },
      { id: "machinery_operation", label: "Operating specialized machinery", icon: "⚙️" },
      { id: "phone_systems", label: "Phone & communication systems", icon: "📱" },
      { id: "pos_systems", label: "Cash registers & POS systems", icon: "💳" },
      { id: "measurement_tools", label: "Using measurement tools", icon: "📐" },
    ]
  },
  {
    id: 6,
    category: "Work Environment Preferences",
    question: "What kind of work environment suits you best?",
    description: "Select all that apply to you",
    skills: [
      { id: "outdoor_work", label: "Working outdoors", icon: "🌿" },
      { id: "independent_work", label: "Working independently", icon: "🏠" },
      { id: "structured_routine", label: "Following a set routine", icon: "📅" },
      { id: "variety_tasks", label: "Doing different things every day", icon: "🎨" },
      { id: "helping_community", label: "Serving the community", icon: "🏘️" },
      { id: "active_movement", label: "Being on my feet & moving", icon: "🏃" },
    ]
  }
];

export const jobDatabase = [
  {
    title: "HVAC Technician",
    category: "Skilled Trades",
    salary_range: "$45,000 – $75,000",
    automation_risk: "Very Low",
    growth_outlook: "Strong (+8% by 2032)",
    description: "Install, maintain, and repair heating, ventilation, and air conditioning systems. Every building needs climate control, and this hands-on work requires on-site problem solving that automation can't replace.",
    required_skills: ["troubleshooting", "tool_operation", "precision_work", "safety_compliance", "measurement_tools"],
    complementary_skills: ["customer_service", "time_management", "adaptability", "independent_work"],
    training_time: "6-12 months certification"
  },
  {
    title: "Electrician",
    category: "Skilled Trades",
    salary_range: "$48,000 – $82,000",
    automation_risk: "Very Low",
    growth_outlook: "Strong (+11% by 2032)",
    description: "Install and maintain electrical systems in homes, businesses, and industrial settings. Complex wiring in unique spaces requires human judgment and dexterity.",
    required_skills: ["tool_operation", "precision_work", "troubleshooting", "safety_compliance", "measurement_tools"],
    complementary_skills: ["learning_new", "decision_making", "quality_control", "independent_work"],
    training_time: "4-5 year apprenticeship"
  },
  {
    title: "Plumber",
    category: "Skilled Trades",
    salary_range: "$46,000 – $78,000",
    automation_risk: "Very Low",
    growth_outlook: "Steady (+6% by 2032)",
    description: "Install and repair water, drainage, and gas systems. Every building has unique plumbing layouts requiring human assessment and hands-on work.",
    required_skills: ["tool_operation", "troubleshooting", "physical_labor", "precision_work", "safety_compliance"],
    complementary_skills: ["customer_service", "creative_solutions", "adaptability", "independent_work"],
    training_time: "4-5 year apprenticeship"
  },
  {
    title: "Home Health Aide",
    category: "Healthcare Support",
    salary_range: "$28,000 – $38,000",
    automation_risk: "Very Low",
    growth_outlook: "Very Strong (+22% by 2032)",
    description: "Provide personal care and assistance to elderly or disabled individuals in their homes. The human connection and empathy required makes this irreplaceable by technology.",
    required_skills: ["empathy", "customer_service", "cleaning_maintenance", "cooking_food", "time_management"],
    complementary_skills: ["adaptability", "pressure_handling", "record_keeping", "helping_community"],
    training_time: "75-hour certification"
  },
  {
    title: "Medical Assistant",
    category: "Healthcare Support",
    salary_range: "$32,000 – $45,000",
    automation_risk: "Low",
    growth_outlook: "Very Strong (+14% by 2032)",
    description: "Support physicians with patient care, vital signs, and administrative tasks. Direct patient interaction and varied clinical duties require a human touch.",
    required_skills: ["empathy", "customer_service", "record_keeping", "multitasking", "quality_control"],
    complementary_skills: ["basic_computer", "time_management", "teamwork", "pressure_handling"],
    training_time: "1-2 year program"
  },
  {
    title: "Dental Hygienist",
    category: "Healthcare Support",
    salary_range: "$60,000 – $85,000",
    automation_risk: "Very Low",
    growth_outlook: "Strong (+7% by 2032)",
    description: "Clean teeth, examine patients for oral diseases, and provide preventive dental care. Requires precision hand skills and patient rapport.",
    required_skills: ["precision_work", "empathy", "customer_service", "quality_control", "safety_compliance"],
    complementary_skills: ["teaching", "record_keeping", "basic_computer", "structured_routine"],
    training_time: "2-3 year program"
  },
  {
    title: "Solar Panel Installer",
    category: "Green Energy",
    salary_range: "$40,000 – $62,000",
    automation_risk: "Very Low",
    growth_outlook: "Very Strong (+22% by 2032)",
    description: "Install and maintain solar energy systems on rooftops and ground mounts. Booming industry with unique installation challenges at every site.",
    required_skills: ["tool_operation", "physical_labor", "measurement_tools", "safety_compliance", "outdoor_work"],
    complementary_skills: ["teamwork", "troubleshooting", "learning_new", "active_movement"],
    training_time: "3-6 month training"
  },
  {
    title: "Wind Turbine Technician",
    category: "Green Energy",
    salary_range: "$48,000 – $72,000",
    automation_risk: "Very Low",
    growth_outlook: "Very Strong (+44% by 2032)",
    description: "Install, maintain, and repair wind turbines. One of the fastest growing jobs in America, requiring hands-on work in unique outdoor environments.",
    required_skills: ["tool_operation", "physical_labor", "troubleshooting", "machinery_operation", "outdoor_work"],
    complementary_skills: ["safety_compliance", "adaptability", "pressure_handling", "active_movement"],
    training_time: "6-12 month program"
  },
  {
    title: "Licensed Practical Nurse (LPN)",
    category: "Healthcare",
    salary_range: "$42,000 – $58,000",
    automation_risk: "Low",
    growth_outlook: "Steady (+5% by 2032)",
    description: "Provide basic nursing care under the supervision of registered nurses and doctors. Patient interaction and clinical judgment are irreplaceable.",
    required_skills: ["empathy", "customer_service", "record_keeping", "pressure_handling", "quality_control"],
    complementary_skills: ["teamwork", "multitasking", "decision_making", "safety_compliance"],
    training_time: "1 year program"
  },
  {
    title: "Childcare Worker / Preschool Teacher",
    category: "Education & Childcare",
    salary_range: "$26,000 – $38,000",
    automation_risk: "Very Low",
    growth_outlook: "Steady (+3% by 2032)",
    description: "Care for and educate young children. Building human bonds, creativity, and adaptive teaching cannot be automated.",
    required_skills: ["empathy", "teaching", "creative_solutions", "multitasking", "conflict_resolution"],
    complementary_skills: ["leadership", "adaptability", "helping_community", "variety_tasks"],
    training_time: "CDA credential (6-12 months)"
  },
  {
    title: "Fitness Trainer / Group Instructor",
    category: "Health & Wellness",
    salary_range: "$30,000 – $62,000",
    automation_risk: "Low",
    growth_outlook: "Strong (+14% by 2032)",
    description: "Lead fitness sessions and create personalized exercise programs. Motivation, form correction, and personal connection keep this human-centered.",
    required_skills: ["teaching", "empathy", "leadership", "active_movement", "adaptability"],
    complementary_skills: ["customer_service", "creative_solutions", "pressure_handling", "helping_community"],
    training_time: "3-6 month certification"
  },
  {
    title: "Pest Control Technician",
    category: "Field Services",
    salary_range: "$35,000 – $55,000",
    automation_risk: "Very Low",
    growth_outlook: "Steady (+4% by 2032)",
    description: "Inspect properties and manage pest control treatments. Every infestation is unique, requiring on-site assessment and tailored solutions.",
    required_skills: ["troubleshooting", "driving", "customer_service", "safety_compliance", "independent_work"],
    complementary_skills: ["tool_operation", "record_keeping", "adaptability", "outdoor_work"],
    training_time: "On-the-job training + state license"
  },
  {
    title: "Landscaper / Groundskeeper",
    category: "Outdoor Services",
    salary_range: "$30,000 – $50,000",
    automation_risk: "Low",
    growth_outlook: "Steady (+5% by 2032)",
    description: "Design, install, and maintain outdoor spaces. Creative vision combined with physical work in unique environments resists automation.",
    required_skills: ["physical_labor", "outdoor_work", "tool_operation", "active_movement", "creative_solutions"],
    complementary_skills: ["customer_service", "time_management", "independent_work", "variety_tasks"],
    training_time: "On-the-job training"
  },
  {
    title: "Veterinary Technician",
    category: "Animal Care",
    salary_range: "$32,000 – $48,000",
    automation_risk: "Low",
    growth_outlook: "Strong (+20% by 2032)",
    description: "Assist veterinarians with animal care, surgery prep, and diagnostic testing. Working with animals requires hands-on skills and compassion.",
    required_skills: ["empathy", "precision_work", "quality_control", "record_keeping", "pressure_handling"],
    complementary_skills: ["teamwork", "cleaning_maintenance", "adaptability", "multitasking"],
    training_time: "2-year associate degree"
  },
  {
    title: "Welder",
    category: "Skilled Trades",
    salary_range: "$40,000 – $68,000",
    automation_risk: "Low",
    growth_outlook: "Steady (+2% by 2032)",
    description: "Join metal parts using high heat and specialized equipment. Custom fabrication and repair work in varied settings requires human skill.",
    required_skills: ["tool_operation", "precision_work", "physical_labor", "safety_compliance", "measurement_tools"],
    complementary_skills: ["quality_control", "troubleshooting", "independent_work", "structured_routine"],
    training_time: "6-12 month program"
  },
  {
    title: "Property Maintenance Technician",
    category: "Building Services",
    salary_range: "$35,000 – $55,000",
    automation_risk: "Very Low",
    growth_outlook: "Steady (+5% by 2032)",
    description: "Maintain and repair buildings, including plumbing, electrical, and general upkeep. Every property has unique issues requiring versatile problem-solving.",
    required_skills: ["tool_operation", "troubleshooting", "cleaning_maintenance", "multitasking", "safety_compliance"],
    complementary_skills: ["time_management", "customer_service", "adaptability", "variety_tasks"],
    training_time: "On-the-job + certifications"
  },
  {
    title: "Commercial Driver (CDL)",
    category: "Transportation",
    salary_range: "$45,000 – $72,000",
    automation_risk: "Moderate (long-haul) / Low (local)",
    growth_outlook: "Strong (+6% by 2032)",
    description: "Transport goods locally or regionally. Local delivery, last-mile logistics, and specialized hauling remain human-dependent for years to come.",
    required_skills: ["driving", "time_management", "safety_compliance", "independent_work", "record_keeping"],
    complementary_skills: ["customer_service", "adaptability", "pressure_handling", "physical_labor"],
    training_time: "3-7 week CDL training"
  },
  {
    title: "Massage Therapist",
    category: "Health & Wellness",
    salary_range: "$38,000 – $65,000",
    automation_risk: "Very Low",
    growth_outlook: "Strong (+18% by 2032)",
    description: "Provide therapeutic massage to relieve pain and improve well-being. The human touch and personalized approach are impossible to automate.",
    required_skills: ["empathy", "precision_work", "customer_service", "active_movement", "independent_work"],
    complementary_skills: ["teaching", "pressure_handling", "learning_new", "helping_community"],
    training_time: "500-1000 hour program"
  },
  {
    title: "Substance Abuse Counselor",
    category: "Social Services",
    salary_range: "$38,000 – $55,000",
    automation_risk: "Very Low",
    growth_outlook: "Strong (+18% by 2032)",
    description: "Help individuals overcome addiction through counseling and support. Deep human empathy and trust-building are essential and irreplaceable.",
    required_skills: ["empathy", "teaching", "conflict_resolution", "leadership", "helping_community"],
    complementary_skills: ["record_keeping", "adaptability", "pressure_handling", "creative_solutions"],
    training_time: "Certificate + supervised hours"
  },
  {
    title: "Construction Laborer / Carpenter",
    category: "Construction",
    salary_range: "$35,000 – $62,000",
    automation_risk: "Low",
    growth_outlook: "Steady (+4% by 2032)",
    description: "Build and renovate structures using hand and power tools. On-site conditions vary constantly, requiring adaptive human skills.",
    required_skills: ["physical_labor", "tool_operation", "measurement_tools", "teamwork", "outdoor_work"],
    complementary_skills: ["safety_compliance", "precision_work", "troubleshooting", "active_movement"],
    training_time: "Apprenticeship or on-the-job"
  }
];

export function calculateSkillScores(allSelectedSkills) {
  const categories = {
    "Physical & Hands-On": ["physical_labor", "tool_operation", "precision_work", "driving", "cleaning_maintenance", "cooking_food"],
    "People & Communication": ["customer_service", "teamwork", "teaching", "empathy", "conflict_resolution", "leadership"],
    "Organization & Detail": ["time_management", "record_keeping", "inventory", "multitasking", "safety_compliance", "quality_control"],
    "Problem Solving": ["troubleshooting", "creative_solutions", "adaptability", "pressure_handling", "learning_new", "decision_making"],
    "Technical & Digital": ["basic_computer", "data_entry", "machinery_operation", "phone_systems", "pos_systems", "measurement_tools"],
    "Work Preferences": ["outdoor_work", "independent_work", "structured_routine", "variety_tasks", "helping_community", "active_movement"],
  };

  const scores = {};
  for (const [cat, skills] of Object.entries(categories)) {
    const matched = skills.filter(s => allSelectedSkills.includes(s)).length;
    scores[cat] = Math.round((matched / skills.length) * 100);
  }
  return scores;
}

export function matchJobs(allSelectedSkills) {
  return jobDatabase.map(job => {
    const allJobSkills = [...job.required_skills, ...job.complementary_skills];
    const transferable = allJobSkills.filter(s => allSelectedSkills.includes(s));
    const skillsToDevlop = job.required_skills.filter(s => !allSelectedSkills.includes(s));
    const matchScore = Math.round((transferable.length / allJobSkills.length) * 100);

    return {
      title: job.title,
      category: job.category,
      salary_range: job.salary_range,
      automation_risk: job.automation_risk,
      growth_outlook: job.growth_outlook,
      description: job.description,
      match_score: matchScore,
      required_skills: job.required_skills,
      transferable_skills: transferable,
      skills_to_develop: skillsToDevlop,
      training_time: job.training_time,
    };
  }).sort((a, b) => b.match_score - a.match_score);
}