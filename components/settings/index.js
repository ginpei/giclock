/**
 * @example
 * <!--
 * const {
 *   SettingHeading,
 *   SettingInput,
 *   SettingLayout,
 *   SettingTable,
 * } = require('../../components/settings/index.js')
 * -->
 *
 * @example
 * SettingLayout(title="Preferences")
 *   SettingTable(heading="Database")
 *     SettingColumn(title="Path")
 *       SettingInput(:value="$store.state.preferences.databasePath" readonly)
 *     SettingColumn(title="Reset")
 *       GIconButton(icon="exclamation-triangle") Delete all
 */

import SettingColumn from './SettingColumn.vue'
import SettingInput from './SettingInput.vue'
import SettingLayout from './SettingLayout.vue'
import SettingTable from './SettingTable.vue'

export {
  SettingColumn,
  SettingInput,
  SettingLayout,
  SettingTable,
}
