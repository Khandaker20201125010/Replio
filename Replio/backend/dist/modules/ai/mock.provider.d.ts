import type { AIProvider, AIAnalysisResult, AIReplyResult } from "./ai.provider";
export declare class MockAIProvider implements AIProvider {
    analyzeComment(comment: string, context?: any): Promise<AIAnalysisResult>;
    generateReply(comment: string, analysis: AIAnalysisResult, settings: any): Promise<AIReplyResult>;
    validateReply(reply: string): Promise<boolean>;
}
//# sourceMappingURL=mock.provider.d.ts.map