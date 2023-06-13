import { enumerate } from '@utils/enumerate';

export const SETTINGS_TABS = enumerate('basic-info', 'password', 'history');

export type SettingsTab = keyof typeof SETTINGS_TABS;
