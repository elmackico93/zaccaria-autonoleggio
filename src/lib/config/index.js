/**
 * Direct import solution for configuration
 * This file provides access to the configuration when path aliases aren't working
 */

// Use relative path to the config directory
const config = require('../../../config');
const getConfig = config.getConfig;
const getLocalizedContent = config.getLocalizedContent;

module.exports = config;
module.exports.getConfig = getConfig;
module.exports.getLocalizedContent = getLocalizedContent;
module.exports.default = config;
