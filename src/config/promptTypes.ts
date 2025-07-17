export type PromptType = {
  key: string;
  name: string;
  description: string;
  example: string;
  analogies: string[];
  resources: { label: string; url: string }[];
};

export const promptTypes: PromptType[] = [
  {
    key: 'zero-shot',
    name: 'Zero-shot Prompting',
    description: 'Ask the model to perform a task without providing any examples. Useful for straightforward instructions.',
    example: 'Translate "Hello, how are you?" to French.',
    analogies: [
      'Like asking a stranger for directions without any context.',
      'Giving a command to a voice assistant for the first time.',
    ],
    resources: [
      { label: 'Prompt Engineering Guide: Zero-shot', url: 'https://www.promptingguide.ai/techniques/zero-shot' },
      { label: 'OpenAI Cookbook: Prompt Engineering', url: 'https://cookbook.openai.com/examples/prompt_engineering' },
    ],
  },
  {
    key: 'few-shot',
    name: 'Few-shot Prompting',
    description: 'Provide a few examples to guide the model on how to perform the task.',
    example: `Translate the following:\nEnglish: Good morning\nFrench: Bonjour\nEnglish: Thank you\nFrench:`,
    analogies: [
      'Like showing a new employee a couple of sample tasks before letting them try.',
      'Teaching by example, not just instruction.',
    ],
    resources: [
      { label: 'Prompt Engineering Guide: Few-shot', url: 'https://www.promptingguide.ai/techniques/few-shot' },
      { label: 'OpenAI Cookbook: Few-shot Examples', url: 'https://cookbook.openai.com/examples/few_shot_examples' },
    ],
  },
  {
    key: 'chain-of-thought',
    name: 'Chain-of-Thought Prompting',
    description: 'Encourage the model to reason step by step by explicitly asking for intermediate steps.',
    example: 'If there are 3 cars and each car has 4 wheels, how many wheels are there in total? Let\'s think step by step.',
    analogies: [
      'Like showing your work in a math problem.',
      'Explaining your reasoning out loud.',
    ],
    resources: [
      { label: 'Prompt Engineering Guide: Chain-of-Thought', url: 'https://www.promptingguide.ai/techniques/chain-of-thought' },
      { label: 'Chain-of-Thought Paper', url: 'https://arxiv.org/abs/2201.11903' },
    ],
  },
  {
    key: 'role-prompting',
    name: 'Role Prompting',
    description: 'Assign a role to the model to influence its behavior or style.',
    example: 'You are a friendly cooking instructor. Explain how to make scrambled eggs for a beginner.',
    analogies: [
      'Like asking a chef to explain a recipe as if you\'re a beginner.',
      'Role-playing in a conversation.',
    ],
    resources: [
      { label: 'Prompt Engineering Guide: Role Prompting', url: 'https://www.promptingguide.ai/techniques/role' },
      { label: 'OpenAI Cookbook: Role-based Prompts', url: 'https://cookbook.openai.com/examples/role_based_prompts' },
    ],
  },
  {
    key: 'system-prompting',
    name: 'System Prompting',
    description: 'Set system-level instructions that define the AI\'s behavior and constraints throughout the conversation.',
    example: 'System: You are a professional code reviewer. Always provide constructive feedback and suggest improvements.\n\nUser: Please review this Python function...',
    analogies: [
      'Like giving ground rules before starting a game.',
      'Setting the tone and expectations for a meeting.',
    ],
    resources: [
      { label: 'OpenAI System Messages Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering/system-messages' },
      { label: 'Anthropic Constitutional AI', url: 'https://www.anthropic.com/news/constitutional-ai-harmlessness-from-ai-feedback' },
    ],
  },
  {
    key: 'self-consistency',
    name: 'Self-Consistency Prompting',
    description: 'Generate multiple reasoning paths and select the most consistent answer.',
    example: 'Solve this problem using at least 2 different methods and compare your answers:\n\nA store sells apples for $2 per pound. If I buy 3.5 pounds, how much do I pay?\n\nMethod 1: [solve using multiplication]\nMethod 2: [solve using addition]',
    analogies: [
      'Like checking your math homework using different methods.',
      'Getting multiple opinions before making a decision.',
    ],
    resources: [
      { label: 'Self-Consistency Paper', url: 'https://arxiv.org/abs/2203.11171' },
      { label: 'Prompt Engineering Guide: Self-Consistency', url: 'https://www.promptingguide.ai/techniques/self-consistency' },
    ],
  },
  {
    key: 'tree-of-thoughts',
    name: 'Tree of Thoughts',
    description: 'Explore multiple reasoning paths simultaneously and evaluate them at each step.',
    example: 'Problem: Choose the best smartphone for a student under $400.\n\nPath 1: Focus on camera quality\n- Consider iPhone SE vs Google Pixel 6a\n- Evaluate: iPhone SE has good photos but limited features\n\nPath 2: Focus on battery life\n- Consider Samsung Galaxy A54 vs OnePlus Nord\n- Evaluate: Samsung has better battery, OnePlus has faster performance\n\nPath 3: Focus on overall value\n- Consider all factors: price, features, durability\n- Evaluate: Compare top options from each path\n\nFinal decision: Select best option after evaluating all paths',
    analogies: [
      'Like exploring different paths in a maze simultaneously.',
      'Considering multiple strategies in a chess game.',
    ],
    resources: [
      { label: 'Tree of Thoughts Paper', url: 'https://arxiv.org/abs/2305.10601' },
      { label: 'ToT Implementation Guide', url: 'https://github.com/princeton-nlp/tree-of-thought-llm' },
    ],
  },
  {
    key: 'retrieval-augmented',
    name: 'Retrieval-Augmented Prompting',
    description: 'Combine external knowledge retrieval with prompting for more accurate and up-to-date responses.',
    example: 'I have some information about renewable energy. Please use this context to answer the question:\n\nContext: Solar panels convert sunlight to electricity at 15-20% efficiency. Wind turbines generate power when wind speed is 6-55 mph. Hydroelectric dams can operate for 50-100 years. Battery storage costs have dropped 80% since 2010.\n\nQuestion: What are the main advantages and challenges of renewable energy?',
    analogies: [
      'Like consulting a library before writing a research paper.',
      'Checking facts before answering a question.',
    ],
    resources: [
      { label: 'RAG Paper', url: 'https://arxiv.org/abs/2005.11401' },
      { label: 'Langchain RAG Guide', url: 'https://python.langchain.com/docs/use_cases/question_answering' },
    ],
  },
  {
    key: 'prompt-chaining',
    name: 'Prompt Chaining',
    description: 'Break complex tasks into smaller sub-tasks and chain the outputs together.',
    example: 'Step 1: Summarize this article in 3 sentences.\nStep 2: Identify the main argument from the summary.\nStep 3: Generate 3 counterarguments to the main argument.',
    analogies: [
      'Like following a recipe step by step.',
      'Breaking down a complex project into manageable tasks.',
    ],
    resources: [
      { label: 'Prompt Engineering Guide: Chaining', url: 'https://www.promptingguide.ai/techniques/prompt-chaining' },
      { label: 'OpenAI Cookbook: Chaining', url: 'https://cookbook.openai.com/examples/prompt_chaining' },
    ],
  },
  {
    key: 'constitutional-ai',
    name: 'Constitutional AI',
    description: 'Use principles and rules to guide AI behavior and ensure ethical, helpful responses.',
    example: 'Please follow these principles when responding:\n1. Be helpful and harmless\n2. Respect human autonomy\n3. Be honest about limitations\n\nNow answer: How should I handle a difficult workplace situation?',
    analogies: [
      'Like having a code of ethics to guide decisions.',
      'Following constitutional principles in governance.',
    ],
    resources: [
      { label: 'Constitutional AI Paper', url: 'https://arxiv.org/abs/2212.08073' },
      { label: 'Anthropic Constitutional AI', url: 'https://www.anthropic.com/news/constitutional-ai-harmlessness-from-ai-feedback' },
    ],
  },
  {
    key: 'meta-prompting',
    name: 'Meta-Prompting',
    description: 'Prompt the AI to improve its own prompts or reasoning process.',
    example: 'First, analyze this prompt and suggest improvements:\n\n"Write a story about a robot."\n\nThen, use your improved prompt to write the story.',
    analogies: [
      'Like a teacher reviewing and improving their own lesson plans.',
      'Self-reflection and continuous improvement.',
    ],
    resources: [
      { label: 'Meta-Prompting Research', url: 'https://arxiv.org/abs/2401.12954' },
      { label: 'Prompt Engineering Guide: Meta-Prompting', url: 'https://www.promptingguide.ai/techniques/meta-prompting' },
    ],
  },
  {
    key: 'plan-and-execute',
    name: 'Plan and Execute',
    description: 'First create a detailed plan, then execute each step systematically with the ability to revise the plan.',
    example: 'Task: Organize a team-building event for 20 people with a $500 budget.\n\nStep 1: Create a detailed plan\nStep 2: Execute each part of the plan\nStep 3: Adjust the plan if needed during execution\n\nPlease start by creating a comprehensive plan, then execute it step by step.',
    analogies: [
      'Like creating a project timeline before starting work.',
      'Writing a recipe before cooking a complex meal.',
    ],
    resources: [
      { label: 'Plan and Execute Paper', url: 'https://arxiv.org/abs/2305.04091' },
      { label: 'Planning in AI Systems', url: 'https://www.promptingguide.ai/techniques/planning' },
    ],
  },
  {
    key: 'structured-data',
    name: 'Structured Data Prompting',
    description: 'Organize information in tables, lists, or structured formats for clearer analysis.',
    example: 'Analyze this data table and answer:\n\nQuarterly Sales Data:\nQ1: 100 sales\nQ2: 150 sales\nQ3: 120 sales\nQ4: 180 sales\n\nWhat trends do you notice, and what recommendations would you make?',
    analogies: [
      'Like organizing information in a spreadsheet for easier analysis.',
      'Using bullet points and tables to present information clearly.',
    ],
    resources: [
      { label: 'Data Analysis with AI', url: 'https://www.promptingguide.ai/techniques/structured-data' },
      { label: 'Structured Prompting Guide', url: 'https://cookbook.openai.com/examples/structured_data_analysis' },
    ],
  },
  {
    key: 'generated-knowledge',
    name: 'Generated Knowledge Prompting',
    description: 'Generate relevant background knowledge first, then use it to answer questions more accurately.',
    example: 'First, list 5 key facts about renewable energy sources (solar, wind, hydro). Then use these facts to explain why renewable energy is important for climate change.',
    analogies: [
      'Like researching a topic before writing an essay.',
      'Building context before making a decision.',
    ],
    resources: [
      { label: 'Generated Knowledge Paper', url: 'https://arxiv.org/abs/2110.08387' },
      { label: 'Knowledge Generation Guide', url: 'https://www.promptingguide.ai/techniques/knowledge' },
    ],
  },
  {
    key: 'automatic-reasoning',
    name: 'Automatic Reasoning and Tool-use (ART)',
    description: 'Automatically select and use external tools and reasoning methods for complex tasks.',
    example: 'I have a complex math problem. Please choose the best approach and explain your reasoning:\n\nProblem: Calculate the compound interest on $10,000 at 5% for 10 years.\n\nFirst, decide which method to use (formula, step-by-step calculation, or approximation) and explain why, then solve it.',
    analogies: [
      'Like a craftsperson automatically selecting the right tool for each job.',
      'Having a smart assistant that knows when to use different resources.',
    ],
    resources: [
      { label: 'ART Paper', url: 'https://arxiv.org/abs/2303.09014' },
      { label: 'Tool Use in LLMs', url: 'https://arxiv.org/abs/2302.04761' },
    ],
  },
  {
    key: 'directional-stimulus',
    name: 'Directional Stimulus Prompting',
    description: 'Guide the model toward desired outputs using small directional cues or hints.',
    example: 'Write a story about a time traveler.\n\nHint: Focus on the emotional impact of seeing loved ones age while you remain young.',
    analogies: [
      'Like giving subtle hints to guide someone to the right answer.',
      'Providing gentle nudges in the right direction.',
    ],
    resources: [
      { label: 'Directional Stimulus Paper', url: 'https://arxiv.org/abs/2302.11520' },
      { label: 'Prompt Engineering Guide: Directional', url: 'https://www.promptingguide.ai/techniques/directional' },
    ],
  },
  {
    key: 'program-aided',
    name: 'Program-Aided Language (PAL)',
    description: 'Generate and execute code to solve problems that require precise computation.',
    example: 'Question: If a train travels 60 mph for 2.5 hours, then 80 mph for 1.5 hours, what\'s the total distance?\n\nPlease solve this by writing and explaining Python code step by step.',
    analogies: [
      'Like using a calculator for math problems.',
      'Writing a program to automate repetitive calculations.',
    ],
    resources: [
      { label: 'PAL Paper', url: 'https://arxiv.org/abs/2211.10435' },
      { label: 'Code Generation Guide', url: 'https://www.promptingguide.ai/techniques/pal' },
    ],
  },
  {
    key: 'react-prompting',
    name: 'ReAct (Reasoning + Acting)',
    description: 'Interleave reasoning traces with actions to solve complex, multi-step problems.',
    example: 'Problem: Plan a healthy weekly meal schedule for a vegetarian on a $50 budget.\n\nSolve this using the ReAct format:\nThought: [your reasoning about the next step]\nAction: [what you need to consider or plan]\nObservation: [what you concluded from that consideration]\n\nRepeat this process until you have a complete meal plan.',
    analogies: [
      'Like thinking out loud while solving a problem.',
      'Alternating between planning and taking action.',
    ],
    resources: [
      { label: 'ReAct Paper', url: 'https://arxiv.org/abs/2210.03629' },
      { label: 'ReAct Implementation Guide', url: 'https://www.promptingguide.ai/techniques/react' },
    ],
  },
  {
    key: 'reflexion',
    name: 'Reflexion',
    description: 'Learn from mistakes by reflecting on failed attempts and improving iteratively.',
    example: 'Task: Solve this logic puzzle.\n\nAttempt 1: [Wrong solution]\nReflection: I made an error in step 3 by not considering all constraints.\nAttempt 2: [Corrected approach]\nReflection: This looks better, let me verify each step...',
    analogies: [
      'Like learning from your mistakes and trying again.',
      'Reviewing your work and improving based on feedback.',
    ],
    resources: [
      { label: 'Reflexion Paper', url: 'https://arxiv.org/abs/2303.11366' },
      { label: 'Self-Reflection in AI', url: 'https://www.promptingguide.ai/techniques/reflexion' },
    ],
  },
  {
    key: 'maieutic-prompting',
    name: 'Maieutic Prompting',
    description: 'Use recursive questioning to break down complex problems and verify reasoning.',
    example: 'Question: Is democracy the best form of government?\n\nLet me ask myself: What makes a government "best"?\nSub-question: What are the key criteria for evaluating governments?\nSub-question: How does democracy perform on each criterion?\nSub-question: What are the main alternatives to democracy?\nNow I can compare them systematically...',
    analogies: [
      'Like the Socratic method of teaching through questions.',
      'Peeling an onion layer by layer to get to the core.',
    ],
    resources: [
      { label: 'Maieutic Prompting Paper', url: 'https://arxiv.org/abs/2205.11822' },
      { label: 'Socratic Method in AI', url: 'https://www.promptingguide.ai/techniques/maieutic' },
    ],
  },
];