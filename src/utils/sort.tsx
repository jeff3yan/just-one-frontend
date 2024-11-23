type WithRank = {
  rank: string;
};

export const sortByRank = (a: WithRank, b: WithRank) => {
  // Convert the rank strings to integers for proper numeric comparison
  return parseInt(a.rank, 10) - parseInt(b.rank, 10);
};
