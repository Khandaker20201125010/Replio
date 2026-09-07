export interface AIAnalysisResult {
    intent: string;
    sentiment: string;
    language: string;
    isSpam: boolean;
    confidence: number;
    requiresHumanReview: boolean;
}
export interface AIReplyResult {
    reply: string;
    confidence: number;
}
export interface AIProvider {
    analyzeComment(comment: string, context?: any): Promise<AIAnalysisResult>;
    generateReply(comment: string, analysis: AIAnalysisResult, settings: any): Promise<AIReplyResult>;
    validateReply(reply: string): Promise<boolean>;
}
//# sourceMappingURL=ai.provider.d.ts.map