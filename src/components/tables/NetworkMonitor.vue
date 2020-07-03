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
            <LinkWallet :address="data.row.address">
              {{ data.row.username }}
            </LinkWallet>
          </div>
          <span v-if="data.row.isResigned" class="ml-2 rounded text-sm text-white bg-theme-resigned-label p-1">{{
            $t("WALLET.DELEGATE.STATUS.RESIGNED")
          }}</span>
        </div>

        <div v-else-if="data.column.field === 'blocks.produced'">
          {{ readableNumber(data.row.blocks.produced) }}
        </div>

        <div v-else-if="data.column.field === 'lastBlockHeight'">
          {{ lastForgingTime(data.row) }}
        </div>

        <div v-else-if="data.column.field === 'forgingStatus'" class="text-0">
          <button v-tooltip="statusTooltip(data.row)" role="img" :aria-label="tooltipContent(data.row)">
            <SvgIcon
              :class="`text-status-${status(data.row)}`"
              class="mx-auto"
              :name="status(data.row)"
              view-box="0 0 19 17"
            />
          </button>
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
export default class TableNetworkMonitor extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public delegates: IDelegate[] | null;
  @Prop({ required: false, default: "active" }) public activeTab: string;

  get columns() {
    const columns = [
      {
        label: this.$t("WALLET.DELEGATE.USERNAME"),
        field: "username",
        thClass: "text-left  start-cell",
        tdClass: "text-left  start-cell",
        sortFn: this.sortByExplicitValue,
      },
      {
        label: this.$t("PAGES.DELEGATE_MONITOR.FORGED_BLOCKS"),
        field: "blocks.produced",
        type: "number",
        thClass: "text-left hidden xl:table-cell",
        tdClass: "text-left hidden xl:table-cell",
      },
      {
        label: this.$t("PAGES.DELEGATE_MONITOR.LAST_FORGED"),
        field: "lastBlockHeight",
        type: "number",
        sortFn: this.sortByLastBlockHeight,
        thClass: "text-left hidden sm:table-cell",
        tdClass: "text-left hidden sm:table-cell",
      },
      {
        label: this.$t("PAGES.DELEGATE_MONITOR.STATUS.TITLE"),
        field: "forgingStatus",
        type: "number",
        thClass: "end-cell md:base-cell text-center",
        tdClass: "end-cell md:base-cell text-center",
      },
    ];

    return columns;
  }

  private lastForgingTime(delegate: IDelegate) {
    return delegate.blocks.last
      ? // Comment to keepe ts-ignore in check
        // @ts-ignore
        this.readableTimestampAgo(delegate.blocks.last.timestamp.unix)
      : this.$i18n.t("PAGES.DELEGATE_MONITOR.NEVER");
  }

  private statusTooltip(row: any) {
    return {
      trigger: "hover click",
      content: this.tooltipContent(row),
      classes: [`tooltip-bg-${this.status(row)}`, "font-sans"],
    };
  }

  private tooltipContent(row: any) {
    // @ts-ignore
    const status = {
      0: this.$i18n.t("PAGES.DELEGATE_MONITOR.STATUS.FORGING"),
      1: this.$i18n.t("PAGES.DELEGATE_MONITOR.STATUS.MISSING"),
      2: this.$i18n.t("PAGES.DELEGATE_MONITOR.STATUS.NOT_FORGING"),
      3: this.$i18n.t("PAGES.DELEGATE_MONITOR.STATUS.NEVER_FORGED"),
      4: this.$i18n.t("PAGES.DELEGATE_MONITOR.STATUS.BECAME_ACTIVE"),
    }[row.forgingStatus];

    const lastBlock = row.blocks.last;

    return lastBlock
      ? `[${status}] ${this.$i18n.t("PAGES.DELEGATE_MONITOR.TOOLTIP", {
          height: lastBlock.height,
        })} ${
          // @ts-ignore
          this.readableTimestamp(lastBlock.timestamp.unix)
        }`
      : status;
  }

  private status(row: any) {
    // @ts-ignore
    return {
      0: "forging",
      1: "missed-round",
      2: "not-forging",
      3: "not-forging", // never-forged
      4: "became-active",
    }[row.forgingStatus];
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
