<template>
  <ul class="menu-container w-full max-w-480px bg-table-row list-reset absolute pin-b pin-l py-5 block xl:hidden">
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'home' }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("Home") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'top-wallets', params: { page: 1 } }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("Top Wallets") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'delegate-monitor' }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none"
      >
        {{ $t("Delegate Monitor") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <div class="cursor-pointer py-5 w-64 flex-none">
        <a
          href="https://uns.network"
          target="_blank"
          style="color:inherit"
        >
          uns.network
        </a>
      </div>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <div class="cursor-pointer py-5 w-64 flex-none">
        <a
          href="https://forum.unik-name.com"
          target="_blank"
          style="color:inherit"
        >
          Forum
        </a>
      </div>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <div class="cursor-pointer py-5 w-64 flex-none">
        <a
          href="https://docs.uns.network"
          target="_blank"
          style="color:inherit"
        >
          Docs
        </a>
      </div>
    </li>
    <!-- <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink :to="{ name: 'statistics' }" tag="div" class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border">Statistics</RouterLink>
    </li> -->
    <!-- <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <div class="py-5 w-64 flex-none">
        <span class="mr-2">Snapshots</span>
        <img src="@/assets/images/icons/download.svg" />
      </div>
    </li> -->
  </ul>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderMenuMobile',

  computed: {
    ...mapGetters('ui', ['nightMode'])
  }
}
</script>

<style>
.menu-container {
  transform: translateY(100%);
}
</style>
