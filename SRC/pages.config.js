/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Home from './pages/Home';
import SkillQuiz from './pages/SkillQuiz';
import Results from './pages/Results';
import JobExplorer from './pages/JobExplorer';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import PathfinderPlan from './pages/PathfinderPlan';
import TrailblazerPlan from './pages/TrailblazerPlan';
import TrainingPlatforms from './pages/TrainingPlatforms';
import FinancialResources from './pages/FinancialResources';
import ResumeBuilder from './pages/ResumeBuilder';
import DocumentTemplates from './pages/DocumentTemplates';
import AICoach from './pages/AICoach';
import HumanCoaching from './pages/HumanCoaching';
import TradeOrganizations from './pages/TradeOrganizations';
import JobMatching from './pages/JobMatching';
import MockInterview from './pages/MockInterview';
import SalaryNegotiation from './pages/SalaryNegotiation';
import LinkedInOptimization from './pages/LinkedInOptimization';
import AccountabilityCohorts from './pages/AccountabilityCohorts';
import BenefitsGuidance from './pages/BenefitsGuidance';
import FinancialPlanning from './pages/FinancialPlanning';
import CredentialVerification from './pages/CredentialVerification';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "SkillQuiz": SkillQuiz,
    "Results": Results,
    "JobExplorer": JobExplorer,
    "Dashboard": Dashboard,
    "Pricing": Pricing,
    "PathfinderPlan": PathfinderPlan,
    "TrailblazerPlan": TrailblazerPlan,
    "TrainingPlatforms": TrainingPlatforms,
    "FinancialResources": FinancialResources,
    "ResumeBuilder": ResumeBuilder,
    "DocumentTemplates": DocumentTemplates,
    "AICoach": AICoach,
    "HumanCoaching": HumanCoaching,
    "TradeOrganizations": TradeOrganizations,
    "JobMatching": JobMatching,
    "MockInterview": MockInterview,
    "SalaryNegotiation": SalaryNegotiation,
    "LinkedInOptimization": LinkedInOptimization,
    "AccountabilityCohorts": AccountabilityCohorts,
    "BenefitsGuidance": BenefitsGuidance,
    "FinancialPlanning": FinancialPlanning,
    "CredentialVerification": CredentialVerification,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};