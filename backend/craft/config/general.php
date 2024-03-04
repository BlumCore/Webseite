<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        'convertFilenamesToAscii' => true,

        'limitAutoSlugsToAscii' => true,

        'postCpLoginRedirect' => 'entries',

        // User-Login links are valid for 3 days
        'verificationCodeDuration' => 259200,

        'aliases' => [
            '@primarySiteURL' => getenv('PRIMARY_SITE_URL'),
            '@siteName' => getenv('SITE_NAME'),
            '@systemName' => getenv('SYSTEM_NAME'),
            '@web' => getenv('PRIMARY_SITE_URL'),
        ]

    ],

    // Dev environment settings
    'dev' => [
        // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => true,
    ],

    // Staging environment settings
    'staging' => [
        // Set this to `false` to prevent administrative changes from being made on staging
        'allowAdminChanges' => true,
    ],

    // Production environment settings
    'production' => [
        // Set this to `false` to prevent administrative changes from being made on production
        'allowAdminChanges' => true,
    ],
];
