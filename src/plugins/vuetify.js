import Vue from "vue";

import Vuetify, {
  VApp,
  VAppBar,
  VContainer,
  VImg,
  VMain,
  VScrollYReverseTransition,
  VFadeTransition,
  VRow,
  VCol,
  VBtn,
  VIcon,
  VAvatar,
  VDivider,
  VChip,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VList,
  VListItem,
  VListItemAvatar,
  VListItemContent,
  VListItemTitle,
  VListItemIcon,
  VListItemSubtitle,
  VTabs,
  VTab,
  VTabsItems,
  VTabItem,
  VAlert,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelHeader,
  VExpansionPanelContent,
  VRating,
  VSheet,
  VCarousel,
  VCarouselItem,
} from "vuetify/lib";

import { Ripple } from "vuetify/lib/directives";

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VContainer,
    VImg,
    VMain,
    VScrollYReverseTransition,
    VFadeTransition,
    VRow,
    VCol,
    VBtn,
    VIcon,
    VAvatar,
    VDivider,
    VChip,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VList,
    VListItem,
    VListItemAvatar,
    VListItemContent,
    VListItemTitle,
    VListItemIcon,
    VListItemSubtitle,
    VTabs,
    VTab,
    VTabsItems,
    VTabItem,
    VAlert,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelHeader,
    VExpansionPanelContent,
    VRating,
    VSheet,
    VCarousel,
    VCarouselItem,
  },
  directives: {
    Ripple,
  },
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#2176FF",
        secondary: "#FDCA40",
        accent: "#82B1FF",
        error: "#FF6C6C",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        black: "#333333",
      },
    },
  },
});
