/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const baseUrl = "http://localhost:8000";
export const chatbot = "/api/chatbot";
export const defaultQuestions = `${baseUrl}/api/chatbot/entry?format=json`;
export const answerQuestionRoute = `${baseUrl}/api/chatbot/output`;
export const articlesRoute = `${baseUrl}/api/articulo?format=json`;

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English" },
  { id: "es", name: "Español" }
];

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.coloredstrategies.com";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const isMultiColorActive = true;
export const defaultColor = "light.purple";
