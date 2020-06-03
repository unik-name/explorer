export function getMilestone(config, height?: number): { [key: string]: any } {
  if (!height) {
    height = 1;
  }
  let milestoneIdx = 0;
  while (milestoneIdx < config.milestones.length - 1 && height >= config.milestones[milestoneIdx + 1].height) {
    milestoneIdx++;
  }

  return config.milestones[milestoneIdx];
}
