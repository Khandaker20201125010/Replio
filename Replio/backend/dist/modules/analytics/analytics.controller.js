"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverviewController = getOverviewController;
exports.getCommentsAnalyticsController = getCommentsAnalyticsController;
exports.getRepliesAnalyticsController = getRepliesAnalyticsController;
exports.getEventsController = getEventsController;
const analytics_service_1 = require("./analytics.service");
const logger_1 = require("../../utils/logger");
function getOverviewController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const filters = req.query;
            const analytics = yield (0, analytics_service_1.getOverviewAnalytics)(userId, filters);
            res.status(200).json({
                success: true,
                data: analytics,
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get overview analytics failed");
            throw error;
        }
    });
}
function getCommentsAnalyticsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const filters = req.query;
            const analytics = yield (0, analytics_service_1.getCommentsAnalytics)(userId, filters);
            res.status(200).json({
                success: true,
                data: analytics,
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get comments analytics failed");
            throw error;
        }
    });
}
function getRepliesAnalyticsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const filters = req.query;
            const analytics = yield (0, analytics_service_1.getRepliesAnalytics)(userId, filters);
            res.status(200).json({
                success: true,
                data: analytics,
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get replies analytics failed");
            throw error;
        }
    });
}
function getEventsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const filters = req.query;
            const result = yield (0, analytics_service_1.getEvents)(userId, filters);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get events failed");
            throw error;
        }
    });
}
//# sourceMappingURL=analytics.controller.js.map