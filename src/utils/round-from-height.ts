import store from "@/store";

// Logic copied from @arkecosystem/core-utils/round-calculator.ts
export const roundFromHeight = (height: number): number => {
  const { milestones } = store.getters["network/networkConfig"];

  let round = 0;
  let maxDelegates = 0;

  let milestoneHeight: number = height;
  let milestone;

  for (let i = 0, j = 0; i < milestones.length; i++) {
    if (!milestone || milestone.activeDelegates !== milestones[i].activeDelegates) {
      milestone = milestones[i];
    }

    maxDelegates = milestone.activeDelegates;

    let delegateCountChanged = false;
    let nextMilestoneHeight = milestone.height;

    for (j = i + 1; j < milestones.length; j++) {
      const nextMilestone = milestones[j];
      if (nextMilestone.height > height) {
        break;
      }

      if (nextMilestone.activeDelegates !== milestone.activeDelegates && nextMilestone.height > milestone.height) {
        delegateCountChanged = true;
        maxDelegates = nextMilestone.activeDelegates;
        milestoneHeight = nextMilestone.height - milestone.height;
        nextMilestoneHeight = nextMilestone.height;
        i = j - 1;
        break;
      }
    }

    if (delegateCountChanged) {
      round += milestoneHeight / milestone.activeDelegates;
    }

    if (i === milestones.length - 1 || milestones[i + 1].height > height) {
      const roundIncrease = Math.floor((height - nextMilestoneHeight) / maxDelegates) + (delegateCountChanged ? 0 : 1);
      round += roundIncrease;
      break;
    }

    delegateCountChanged = false;
  }

  return round;
};
