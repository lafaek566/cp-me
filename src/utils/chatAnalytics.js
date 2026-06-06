// Chat Widget Analytics Tracker
const STORAGE_KEY = "chat_widget_analytics";

export const chatAnalytics = {
  // Initialize analytics
  init: () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          widgetOpens: 0,
          quickRepliesClicks: 0,
          customMessagesSent: 0,
          totalInteractions: 0,
          uniqueVisits: 0,
          conversionRate: 0,
          firstVisit: new Date().toISOString(),
          lastVisit: new Date().toISOString(),
          sessionId: Math.random().toString(36).substr(2, 9),
        })
      );
    }
  },

  // Track widget open
  trackOpen: () => {
    const data = chatAnalytics.getData();
    data.widgetOpens += 1;
    data.totalInteractions += 1;
    data.lastVisit = new Date().toISOString();
    chatAnalytics.saveData(data);
  },

  // Track quick reply click
  trackQuickReply: (label) => {
    const data = chatAnalytics.getData();
    data.quickRepliesClicks += 1;
    data.totalInteractions += 1;
    data.lastVisit = new Date().toISOString();
    chatAnalytics.saveData(data);
    console.log(`[Analytics] Quick Reply clicked: ${label}`);
  },

  // Track custom message sent
  trackCustomMessage: () => {
    const data = chatAnalytics.getData();
    data.customMessagesSent += 1;
    data.totalInteractions += 1;
    data.lastVisit = new Date().toISOString();
    chatAnalytics.updateConversionRate(data);
    chatAnalytics.saveData(data);
    console.log("[Analytics] Custom message sent");
  },

  // Update conversion rate
  updateConversionRate: (data) => {
    if (data.widgetOpens > 0) {
      const totalMessages =
        data.quickRepliesClicks + data.customMessagesSent;
      data.conversionRate = (
        (totalMessages / data.widgetOpens) *
        100
      ).toFixed(2);
    }
  },

  // Get analytics data
  getData: () => {
    chatAnalytics.init();
    const data = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(data);
  },

  // Save analytics data
  saveData: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Get formatted analytics for display
  getFormattedData: () => {
    const data = chatAnalytics.getData();
    return {
      opens: data.widgetOpens,
      quickReplies: data.quickRepliesClicks,
      messages: data.customMessagesSent,
      total: data.totalInteractions,
      conversion: data.conversionRate + "%",
      sessionId: data.sessionId,
    };
  },

  // Log all analytics to console
  logStats: () => {
    const stats = chatAnalytics.getFormattedData();
    console.log("📊 Chat Widget Analytics:", stats);
    return stats;
  },

  // Reset analytics (for testing)
  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
    chatAnalytics.init();
    console.log("✅ Analytics reset");
  },
};

export default chatAnalytics;
