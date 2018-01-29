/**
 * @example
 * <!--
 * const {
 *   SettingHeading,
 *   SettingLayout,
 *   SettingTable,
 * } = require('../../components/settings/index.js')
 * -->
 *
 * @example
 * SettingLayout(title="Preferences")
 *   SettingTable(heading="Database")
 *     SettingColumn(title="Path")
 *       input.SettingLayout-input(:value="$store.state.preferences.databasePath")
 *     SettingColumn(title="Reset")
 *       GIconButton(icon="exclamation-triangle") Delete all
 */

import SettingColumn from './SettingColumn.vue'
import SettingLayout from './SettingLayout.vue'
import SettingTable from './SettingTable.vue'

export {
  SettingColumn,
  SettingLayout,
  SettingTable,
}
