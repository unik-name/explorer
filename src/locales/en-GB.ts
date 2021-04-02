import {
  BADGES_PREFIX,
  BADGE_DELEGATE_KEY,
  BADGE_PIONEER_KEY,
  BADGE_SECOND_PASSPHRASE_KEY,
  BADGE_XP_LEVEL_KEY,
  PioneerBadgeGrades,
  XPLevelBadgeGrades,
} from "@uns/ts-sdk";

export default {
  COMMON: {
    BALANCE: "Balance",
    BLOCK: "Block",
    BLOCKS: "Blocks",
    CONFIRMATIONS: "Confirmations",
    DELEGATE: "Network player",
    DELEGATES: "Network players",
    EXPIRATION: "Expiration",
    FEE: "Fee",
    HEIGHT: "Height",
    ID: "ID",
    NO_RESULTS: "No results",
    NOT_APPLICABLE: "Not applicable",
    RANK: "Rank",
    RELOAD: "Reload this page",
    SEE_ALL: "See all",
    SUPPLY: "Supply",
    SUPPLY_PERCENTAGE: "Percentage of votes by delegate type",
    TIMESTAMP: "Timestamp",
    TRANSACTION: "Transaction",
    TRANSACTIONS: "Transactions",
    TYPE: "Type",
    WALLET: "Wallet",
    ACCEPT: "Accept",
    CANCEL: "Cancel",
  },

  DISCLAIMER: {
    TITLE: "Disclaimer",
    TEXT1:
      "The following page is a directory for informational purposes only. {website} is in no way affiliated with the listed individuals and/or business and bridgechain entities listed herein. All links provided herein are third party websites that have not been verified and are owned by independent parties over which {website} has no control. {website} does not endorse or approve and makes no warranties, representations or undertakings relating to the content of third party websites.",
    TEXT2: "By clicking “Accept” you will be confirming that you have read and are in agreement with all terms herein.",
  },

  MARKET_CHART: {
    ERROR: "The chart data could not be loaded",
    RELOAD: "Reload chart",
    PRICE: "Price",
    VOLUME: "Volume",
    DAY: "Day",
    WEEK: "Week",
    MONTH: "Month",
    QUARTER: "Quarter",
    YEAR: "Year",
    ALL_TIME: "All time",
  },

  BLOCK: {
    ID: "Block ID",
    PAGINATION: {
      NEXT: "Next block",
      PREVIOUS: "Previous block",
    },
    FEES: "Fees",
    GENERATED_BY: "Generated by",
    REWARD: "Block Reward",
    PROCESSED_AMOUNT: "Processed amount",
    TOTAL_FORGED: "Total forger rewards",
    TOTAL_REWARDS: "Total UNS forged",
  },

  TRANSACTION: {
    AMOUNT: "Amount",
    FLOW: "UNS Flow",
    AMOUNT_TO_SELF: "Excluding {amount} sent to itself",
    BLOCK_ID: "Block ID",
    ID: "Transaction ID",
    IPFS: "IPFS Hash",
    FEE: "Fee",
    MULTI_SIGNATURE: {
      ADDRESS: "Generated address",
      MIN: "Minimum participants",
      LIFETIME: "Lifetime",
      PARTICIPANTS: "Participants",
      LEGACY_NOTICE: "This transaction is a legacy Multisignature Registration",
    },
    NONCE: "Nonce",
    TIMELOCK: {
      BLOCKHEIGHT: "Expiration blockheight",
      CLAIMED: "Claimed transaction",
      EXPIRATION: "Expiration",
      EXPIRED: "Expired lock",
      OPEN: "Open lock",
      REFUNDED: "Refunded transaction",
      SECRET_HASH: "Secret Hash",
      STATUS: "Timelock status",
      UNKNOWN: "Unknown",
      UNLOCK_SECRET_HEX: "Unlock Secret (hex)",
    },
    TYPE: "Transaction type",
    TYPES: {
      ALL: "All",
      TRANSFER: "UNS Transfer",
      TRANSFER_TO: "UNS Transfer to",
      SECOND_SIGNATURE: "2nd Signature Registration",
      DELEGATE_REGISTRATION: "**Network player Registration**",
      VOTE: "Vote for",
      UNVOTE: "Unvote for",
      MULTI_SIGNATURE: "Multisignature Registration",
      IPFS: "IPFS",
      LOCKS: "Locks",
      TIMELOCK: "Timelock",
      TIMELOCK_CLAIM: "Timelock Claim",
      TIMELOCK_REFUND: "Timelock Refund",
      MULTI_PAYMENT: "Multipayment",
      DELEGATE_RESIGNATION: "**Network player Resignation**",
      BUSINESS_REGISTRATION: "Business Registration",
      BUSINESS_RESIGNATION: "Business Resignation",
      BUSINESS_UPDATE: "Business Update",
      BRIDGECHAIN_REGISTRATION: "Bridgechain Registration",
      BRIDGECHAIN_RESIGNATION: "Bridgechain Resignation",
      BRIDGECHAIN_UPDATE: "Bridgechain Update",
      SENT: "Sent",
      RECEIVED: "Received",
      UNIK_CREATION: "**UNIK creation**",
      UNIK_UPDATE: "**UNIK Update**",
      UNIK_TRANSFER: "UNIK Transfer",
      UNS_DISCLOSE: "Unikname Disclose",
      UNS_DELEGATE_REGISTRATION: "Network player Registration",
      UNS_DELEGATE_RESIGNATION: "Network player Resignation",
      UNS_CERTIFIED_NFT_MINT: "UNIK Creation",
      UNS_CERTIFIED_NFT_MINT_INDIV: "Individual UNIK Creation",
      UNS_CERTIFIED_NFT_MINT_ORG: "Organization UNIK Creation",
      UNS_CERTIFIED_NFT_MINT_NETWORK: "Network UNIK Creation",
      UNS_CERTIFIED_NFT_UPDATE: "UNIK Update",
      UNKNOWN: "Unknown",
      UNS_VERIFY_URL: "URL verify",
      UNS_ALIVE_DEMAND: "UNIK Activation",
      UNS_EVERLASTING: "Everlasting status demand",
      UNS_XPLEVEL_DEMAND: "XP Level update",
      UNS_PIONEER_CLAIM: "Pioneer badge claim",
      UNS_USER_PROPERTY: "User property update",
    },
    ASSET: {
      BRIDGECHAINASSETREPOSITORY: "Bridgechain Asset Repository",
      BRIDGECHAINID: "Bridgechain ID",
      BRIDGECHAINREPOSITORY: "Bridgechain repository",
      GENESISHASH: "Genesis hash",
      NAME: "Name",
      PORTS: "Ports",
      REPOSITORY: "Repository",
      SEEDNODES: "Seed nodes",
      VAT: "VAT",
      WEBSITE: "Website",
    },
    SENDER: "Sender",
    FROM: "From",
    RECIPIENT: "Recipient",
    RECIPIENT_OR_TYPE: "Operation",
    RECIPIENTS: "Recipients",
    SMARTBRIDGE: "Text",
    WELL_CONFIRMED: "Well confirmed",
    REWARDS: {
      SENDER: "UNIK owner rewards",
      FOUNDATION: "UNS organization rewards",
      FORGER: "Forger rewards",
    },
  },

  WALLET: {
    ADDRESS: "Address",
    PUBLIC_KEY: "Public key",
    VERIFIED: "This is a verified address",
    VOTING_FOR: "Voting for",
    BALANCE: "Balance ({token})",
    LOCKED_BALANCE: "Locked Balance",
    SECOND_PASSPHRASE_ENABLED: "Second signature enabled",
    MULTI_SIGNATURE_WALLET: "Multi signature wallet",
    SUMMARY: "Crypto Account summary",
    QR_CODE: "QR Code",
    SCAN_FOR_ADDRESS: "Scan for address",
    SCAN_FOR_URI: "Scan for URI",
    ADVANCED_QR: {
      EXPAND: "Show options",
      COLLAPSE: "Hide options",
    },
    DELEGATE: {
      FORGED_BLOCKS: "Forged blocks",
      TOTAL_FORGED: "Total forged",
      RANK: "Rank",
      RANK_NOT_AVAILABLE: "Not yet available",
      RANK_NOT_APPLICABLE: "Not applicable",
      STATUS: {
        TITLE: "Status",
        ACTIVE: "Active",
        STANDBY: "Standby",
        RESIGNED: "Resigned",
      },
      USERNAME: "Username",
      DELEGATE: "Delegate",
      VOTES: "Votes",
      VOTERS: "Voters for",
      VOTERS_CRYPTO_ACCOUNT: "Voters crypto account",
      VOTER_THRESHOLD: "Only voters with more than 0.1 {token}",
    },
    TIMELOCK_TRANSACTION: "Timelock transaction",
  },

  SEARCH: {
    PLACEHOLDER: {
      SHORT: "Search",
      LONG: "Find a block, transaction, address or network player or UNIK",
    },
    NO_RESULTS: "Nothing matched your search",
  },

  BUTTON_CLIPBOARD: {
    SUCCESS: "Copied!",
    ERROR: "Error!",
    COPY_TO_CLIPBOARD: "Copy to clipboard",
  },

  PAGES: {
    HOME: {
      TITLE: "Home",
      HEADER: "Latest transactions and blocks",
      LATEST_TRANSACTIONS: "Latest transactions",
      LATEST_BLOCKS: "Latest blocks",
    },
    BRIDGECHAINS: {
      TITLE: "Bridgechains",
      NAME: "Name",
      CREATOR: "Creator",
      SEED_SERVER: "Seed Server",
      REPOSITORY: "Repository",
      RESIGNED: "Resigned",
    },
    BUSINESSES: {
      TITLE: "Businesses",
      NAME: "Business Name",
      CREATOR: "Creator",
      WEBSITE: "Website",
      REPOSITORY: "Repository",
      RESIGNED: "Resigned",
    },
    DELEGATES: {
      TITLE: "Delegates",
    },
    DELEGATE_MONITOR: {
      TITLE: "Delegate Status",
      HEADER: {
        LAST_BLOCK: "Last block",
        FORGED: "Forged",
        TOTAL_FORGED: "Total forged ({token})",
        TX_COUNT: "from 0 transactions | from 1 transaction | from {count} transactions",
      },
      ACTIVE: "Active",
      STANDBY: "Standby",
      RESIGNED: "Resigned",
      NEVER: "Never",
      FORGED_BLOCKS: "Forged blocks",
      LAST_FORGED: "Last forged",
      STATS: {
        FORGED: "Forged block recently",
        IN_QUEUE: "In queue for forging",
        MISSED: "Missed round",
        NOT_FORGING: "Not forging",
      },
      STATUS: {
        TITLE: "Status",
        FORGING: "Forging",
        MISSING: "Missing",
        NOT_FORGING: "Not forging",
        NEVER_FORGED: "Never forged",
        BECAME_ACTIVE: "Became active",
      },
      VOTES: "Votes",
      TOOLTIP: "Last block @ {height} on",
    },
    NETWORK_MONITOR: {
      TITLE: "Network Monitor",
    },
    TOP_WALLETS: {
      TITLE: "Top Crypto Accounts",
    },
    ADVANCED_SEARCH: {
      TITLE: "Advanced Search",
      ADDITIONAL_PARAMETERS: "Additional Parameters",
      RESULTS: "Results",
      SEARCH_TYPE: "Search Type",
      GENERIC: {
        DATE_FROM: "Date from",
        DATE_TO: "Date to",
      },
      BLOCK: {
        TOTAL_AMOUNT_FROM: "Total amount from",
        TOTAL_AMOUNT_TO: "Total amount to",
        TOTAL_FEE_FROM: "Total fee from",
        TOTAL_FEE_TO: "Total fee to",
        REWARD_FROM: "Reward from",
        REWARD_TO: "Reward to",
      },
      TRANSACTION: {
        AMOUNT_FROM: "Amount from",
        AMOUNT_TO: "Amount to",
        FEE_FROM: "Fee from",
        FEE_TO: "Fee to",
      },
      WALLET: {
        BALANCE_FROM: "Balance from",
        BALANCE_TO: "Balance to",
      },
    },
    NOT_FOUND: {
      TITLE: "Ooops!",
      PAGE: "Sorry, page not found",
      DATA: "Sorry, {dataType} {dataId} could not be found on the blockchain",
    },
  },

  PAGINATION: {
    ALL: "All",
    NEXT: "Next",
    OF: "of",
    PAGE: "Page",
    PREVIOUS: "Previous",
    ROWS_PER_PAGE: "Rows per page",
    SHOW_MORE: "Show more",
    PLACEHOLDER: {
      SHORT: "Page #",
      LONG: "Enter a page number",
    },
    NO_RESULTS: "Invalid page number",
  },

  HEADER: {
    MENU: "Menu",
    NETWORK: "Network",
    MAIN: "Main",
    DEVELOPMENT: "Development",
    DALINET: "Dalinet",
    SANDBOX: "Sandbox",
    LIVENET: "Livenet",
    SUPPLY: "Supply",
    MARKET_CAP: "Market Cap",
    TESTNET: "Testnet",
    TESTNET_LOCAL: "Testnet Local",
  },

  FOOTER: {
    ALL_RIGHTS_RESERVED: "All rights reserved",
    VERSION: "Version",
    DATE: "Date",
    NETWORK: "uns.network",
    FORUM: "Forum",
    DOCS: "Docs",
  },

  UNIK: {
    SUMMARY: "UNIK summary",
    ID: "UNIK ID",
    CREATION: "**UNIK Creation**",
    CERTIFIED_CREATION: "UNIK Creation",
    UPDATE: "**UNIK Update**",
    CERTIFIED_UPDATE: "UNIK Update",
    TRANSFER: "UNIK Transfer",
    TRANSFER_TO: "UNIK Transfer to",
    DISCLOSE: "UNIK Disclose",
    OWNER: "Owner",
    CREATION_DATE: "Creation date",
    CATEGORY: "Category",
    USER_PROPERTIES: "User properties",
    SYSTEM_PROPERTIES: "System properties",
    TYPE: "Type",
    INDIVIDUAL: "Individual",
    ORGANIZATION: "Organization",
    NETWORK: "Network",
    KEY: "Key",
    VALUE: "Value",
    LIFECYCLE: {
      LABEL: "Life cycle status",
      ISSUED: "Issued",
      MINTED: "Minted",
      LIVE: "Live",
      ABORTED: "Aborted",
      EVERLASTING: "Everlasting",
    },
  },

  UNS: {
    DISCLOSE: "Disclose",
  },

  PROPERTIES: {
    BADGES: "Badges",
    [BADGE_SECOND_PASSPHRASE_KEY]: {
      key: "Second passphrase",
      true: "Enabled",
    },
    [BADGE_DELEGATE_KEY]: {
      key: "NetworkPlayer role",
      true: "Delegate",
    },
    [BADGE_PIONEER_KEY]: {
      key: "Pioneer",
      [PioneerBadgeGrades.INNOVATOR]: "Innovator",
      [PioneerBadgeGrades.EARLY_ADOPTER]: "Early adopter",
    },
    [BADGE_XP_LEVEL_KEY]: {
      key: "XP Level",
      [XPLevelBadgeGrades.NEWCOMER]: "Newcomer",
      [XPLevelBadgeGrades.BEGINNER]: "Beginner",
      [XPLevelBadgeGrades.ADVANCED]: "Advanced",
      [XPLevelBadgeGrades.LEADER]: "Leader",
      [XPLevelBadgeGrades.MAVEN]: "Maven",
    },
    "Authentications/CosmicNonce": {
      key: "Cosmic nonce",
    },
    [`${BADGES_PREFIX}Event/easteregg2021`]: {
      key: "Easter Egg 2021",
    },
    VERIFIED_URL: "Verified URL",
    VERIFIED_URL_PROOF: "Proof of verification",
  },
};
