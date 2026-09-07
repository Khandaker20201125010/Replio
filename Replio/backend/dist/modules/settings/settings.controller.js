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
exports.getSettingsController = getSettingsController;
exports.updateSettingsController = updateSettingsController;
exports.resetSettingsController = resetSettingsController;
const settings_service_1 = require("./settings.service");
const logger_1 = require("../../utils/logger");
function getSettingsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const settings = yield (0, settings_service_1.getSettings)(userId);
            res.status(200).json({
                success: true,
                data: { settings },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Get settings failed");
            throw error;
        }
    });
}
function updateSettingsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const settings = yield (0, settings_service_1.updateSettings)(userId, req.body);
            res.status(200).json({
                success: true,
                data: { settings },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Update settings failed");
            throw error;
        }
    });
}
function resetSettingsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const settings = yield (0, settings_service_1.resetSettings)(userId);
            res.status(200).json({
                success: true,
                data: { settings },
            });
        }
        catch (error) {
            logger_1.logger.error({ error }, "Reset settings failed");
            throw error;
        }
    });
}
//# sourceMappingURL=settings.controller.js.map