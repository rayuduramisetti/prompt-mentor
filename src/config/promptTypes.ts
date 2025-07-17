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
    example: 'If there are 3 cars and each car has 4 wheels, how many wheels are there in total? Let’s think step by step.',
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
    example: 'You are a helpful assistant. Explain quantum computing in simple terms.',
    analogies: [
      'Like asking a chef to explain a recipe as if you’re a beginner.',
      'Role-playing in a conversation.',
    ],
    resources: [
      { label: 'Prompt Engineering Guide: Role Prompting', url: 'https://www.promptingguide.ai/techniques/role' },
      { label: 'OpenAI Cookbook: Role-based Prompts', url: 'https://cookbook.openai.com/examples/role_based_prompts' },
    ],
  },
]; 