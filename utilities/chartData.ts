export const getChartData = (openedJobs: any, talents: any, companies: any) => {
  // 1. Initialize empty counts for each month
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();

  const monthTemplate = months.map((name, index) => ({
    name,
    jobs: 0,
    talents: 0,
    companies: 0,
    index,
  }));

  // 2. Helper to count by month
  const countByMonth = (data: any[], key: "jobs" | "talents" | "companies") => {
    data.forEach((item) => {
      const date = new Date(item.createdAt);
      if (date.getFullYear() === currentYear) {
        const monthIdx = date.getMonth();
        monthTemplate[monthIdx][key]++;
      }
    });
  };
  console.log("monthTemplatePre:", monthTemplate);
  // 3. Apply to each dataset
  countByMonth(openedJobs, "jobs");
  countByMonth(talents, "talents");
  countByMonth(companies, "companies");
  console.log("monthTemplateBefore:", monthTemplate);
  // 4. (Optional) Limit to past 6 months
  const now = new Date();
  const pastSix = monthTemplate.slice(now.getMonth() - 5, now.getMonth() + 1);
  console.log("monthTemplateAfter:", monthTemplate);

  // 5. Result
  return pastSix;
};
