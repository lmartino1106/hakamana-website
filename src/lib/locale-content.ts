import { ABOUT_CONTENT, WHAT_WE_DO, FAQS, PRESS_ARTICLES, TEAM_MEMBERS } from "./constants";
import type { TeamMember, PressArticle, FAQ } from "./constants";

type Locale = "es" | "en";

export function getAboutContent(locale: Locale) {
  return {
    description: locale === "en" ? ABOUT_CONTENT.descriptionEn : ABOUT_CONTENT.description,
    mission: locale === "en" ? ABOUT_CONTENT.missionEn : ABOUT_CONTENT.mission,
    vision: locale === "en" ? ABOUT_CONTENT.visionEn : ABOUT_CONTENT.vision,
  };
}

export function getWhatWeDo(locale: Locale) {
  return {
    intro: locale === "en" ? WHAT_WE_DO.introEn : WHAT_WE_DO.intro,
    dueDiligence: locale === "en" ? WHAT_WE_DO.dueDiligenceEn : WHAT_WE_DO.dueDiligence,
    outcome: locale === "en" ? WHAT_WE_DO.outcomeEn : WHAT_WE_DO.outcome,
    steps: WHAT_WE_DO.steps.map((step) => ({
      title: locale === "en" ? step.titleEn : step.title,
      description: locale === "en" ? step.descriptionEn : step.description,
    })),
  };
}

export function getFaqs(locale: Locale) {
  return FAQS.map((faq) => ({
    question: locale === "en" ? faq.questionEn : faq.question,
    answer: locale === "en" ? faq.answerEn : faq.answer,
  }));
}

export function getPressArticles(locale: Locale) {
  return PRESS_ARTICLES.map((article) => ({
    ...article,
    title: locale === "en" ? article.titleEn : article.title,
    excerpt: locale === "en" ? article.excerptEn : article.excerpt,
  }));
}

export function getTeamMembers(locale: Locale) {
  return TEAM_MEMBERS.map((member) => ({
    ...member,
    role: locale === "en" ? member.roleEn : member.role,
    bio: locale === "en" ? member.bioEn : member.bio,
  }));
}

export function getTeamMember(slug: string, locale: Locale) {
  const member = TEAM_MEMBERS.find((m) => m.slug === slug);
  if (!member) return null;
  return {
    ...member,
    role: locale === "en" ? member.roleEn : member.role,
    bio: locale === "en" ? member.bioEn : member.bio,
  };
}
