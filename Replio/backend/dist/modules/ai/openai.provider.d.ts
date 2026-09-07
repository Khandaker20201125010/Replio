import type { AIProvider, AIAnalysisResult, AIReplyResult } from "./ai.provider";
export declare class OpenAIProvider implements AIProvider {
    private client;
    constructor();
    analyzeComment(comment: string, context?: any): Promise<AIAnalysisResult>;
    generateReply(comment: string, analysis: AIAnalysisResult, settings: any): Promise<AIReplyResult>;
    validateReply(reply: string): Promise<boolean>;
}
//# sourceMappingURL=openai.provider.d.ts.map