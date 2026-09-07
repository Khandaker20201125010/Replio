import type { AIProvider, AIAnalysisResult, AIReplyResult } from "./ai.provider";
export declare function getAIProvider(settings: any): AIProvider;
export declare function analyzeComment(comment: string, settings: any): Promise<AIAnalysisResult>;
export declare function generateReply(comment: string, analysis: AIAnalysisResult, settings: any): Promise<AIReplyResult>;
export declare function validateReply(reply: string, settings: any): Promise<boolean>;
//# sourceMappingURL=ai.service.d.ts.map