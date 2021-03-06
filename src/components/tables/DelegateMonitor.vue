<template>
  <Loader :data="delegates">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="delegates"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'username'" class="flex items-center">
          <div v-if="data.row.unikname">
            <LinkUNIK :id="data.row.username" :unikname="data.row.unikname" :type="data.row.unikType" />
          </div>
          <div v-else>
            <LinkWallet :address="data.row.address" :trunc="false">
              {{ data.row.username }}
            </LinkWallet>
          </div>
          <span
            v-if="isActiveTab && data.row.isResigned"
            class="ml-2 rounded text-sm text-white bg-theme-resigned-label p-1"
            >{{ $t("WALLET.DELEGATE.STATUS.RESIGNED") }}</span
          >
        </div>

        <div v-else-if="data.column.field === 'votes'">
          <RouterLink
            :to="{ name: 'wallet-voters', params: { address: data.row.address, username: data.row.username, page: 1 } }"
          >
            <span v-tooltip="$t('COMMON.SUPPLY_PERCENTAGE')" class="text-grey text-xs mr-1">
              {{ percentageString(data.row.production.approval) }}
            </span>
            {{ readableCrypto(data.row.votes, true, 2) }}
          </RouterLink>
        </div>

        <span v-else>
          {{ data.formattedRow[data.column.field] }}
        </span>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IDelegate, ISortParameters } from "@/interfaces";

@Component
export default class TableDelegates extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public delegates: IDelegate[] | null;
  @Prop({ required: false, default: "active" }) public activeTab: string;

  get columns() {
    let columns = [
      {
        label: this.$t("COMMON.RANK"),
        field: "rank",
        type: "number",
        thClass: "start-cell w-32",
        tdClass: "start-cell w-32",
      },
      {
        label: this.$t("WALLET.DELEGATE.USERNAME"),
        field: "username",
        thClass: `text-left ${this.isActiveTab ? "end-cell sm:base-cell" : this.isResignedTab ? "start-cell" : ""}`,
        tdClass: `text-left ${this.isActiveTab ? "end-cell sm:base-cell" : this.isResignedTab ? "start-cell" : ""}`,
        sortFn: this.sortByExplicitValue,
      },
      {
        label: this.$t("PAGES.DELEGATE_MONITOR.VOTES"),
        field: "votes",
        type: "number",
        thClass: `end-cell hidden ${this.isActiveTab ? "md" : "sm"}:table-cell`,
        tdClass: `end-cell hidden ${this.isActiveTab ? "md" : "sm"}:table-cell`,
      },
    ];

    if (this.activeTab === "resigned") {
      // remove the rank column
      columns = columns.splice(1);
    }
    return columns;
  }

  get isActiveTab() {
    return this.activeTab === "active";
  }

  get isResignedTab() {
    return this.activeTab === "resigned";
  }

  private sortByLastBlockHeight(x: number, y: number, col: number, rowX: any, rowY: any) {
    const heightX = rowX.blocks.last ? rowX.blocks.last.height : -1;
    const heightY = rowY.blocks.last ? rowY.blocks.last.height : -1;

    return heightX > heightY ? -1 : heightX < heightY ? 1 : 0;
  }

  private sortByExplicitValue(x: number, y: number, col: number, rowX: any, rowY: any) {
    // Handle genesis case
    const nameX: string = rowX.unikname ? rowX.unikname : rowX.username;
    const nameY: string = rowY.unikname ? rowY.unikname : rowY.username;
    if (nameX === nameY) {
      return parseInt(rowX.type) > parseInt(rowY.type) ? 1 : -1;
    }
    return nameX.localeCompare(nameY);
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }
}
</script>
