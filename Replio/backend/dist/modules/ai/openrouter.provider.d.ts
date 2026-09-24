import type { AIProvider, AIAnalysisResult, AIReplyResult } from './ai.provider';
export declare class OpenRouterProvider implements AIProvider {
    private apiKey;
    private embeddingModel;
    private llmModel;
    private fallback;
    constructor();
    analyzeComment(comment: string, context?: any): Promise<AIAnalysisResult>;
    generateReply(comment: string, analysis: AIAnalysisResult, settings: any): Promise<AIReplyResult>;
    validateReply(reply: string, settings?: any): Promise<boolean>;
}
//# sourceMappingURL=openrouter.provider.d.ts.map