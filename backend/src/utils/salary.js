export const PER_VISIT = 10000;
export const MONTHLY_CAP_VISITS = 3;

export const computeEarnings = (approvedVisits) => {
  const payableVisits = Math.min(approvedVisits, MONTHLY_CAP_VISITS);
  return payableVisits * PER_VISIT;
};
