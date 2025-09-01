import { DOC_FRONT_MATTER_EXTENSION_KEYS, type DocFrontMatterExtensionKey } from "@site/src/types/metadata";

export const COMMON_FRONT_MATTER_KEY_VALUES: 
    Partial<Record<DocFrontMatterExtensionKey, string[]>> = {
    [DOC_FRONT_MATTER_EXTENSION_KEYS.CATEGORY]: [
        'dev',
        'design',
        'document',
        'work',
        'project',
        'music',
        'app',
        'game',
        'desktop',
        '3D modeling',
        'animation',
        'video',
        'image',
        'other'
    ],
    [DOC_FRONT_MATTER_EXTENSION_KEYS.ORIGIN]: [
        'personal',
        'installed',
        'modified',
        'other'
    ],
    [DOC_FRONT_MATTER_EXTENSION_KEYS.USE_STATE]: [
        'active',
        'sometimes',
        'testing',
        'to use',
        'archived',
        'deprecated',
        'rejected',
        'never used',
        'not used anymore',
        'other'
    ],
    [DOC_FRONT_MATTER_EXTENSION_KEYS.OS]: [
        'Windows',
        'macOS',
        'Linux',
        'other'
    ]
}