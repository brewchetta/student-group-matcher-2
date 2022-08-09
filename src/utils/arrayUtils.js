export const randomArrayItem = arr => arr[Math.floor(Math.random() * arr.length)]

export function buildGroupsFromArray( array, groupSize=2, prevGroup=[] ) {

  let ungrouped = [...array]

  const groups = []

  while (ungrouped.length > 0 && groupSize > 0) {

    const randomParticipant = randomArrayItem(ungrouped)

    ungrouped = ungrouped.filter(s => s !== randomParticipant)

    const lastGroupCreated = groups[groups.length - 1]

    if (groups.length && (ungrouped.length === 0 || groups[groups.length - 1].length < groupSize)) {
      lastGroupCreated.push(randomParticipant)
    } else {
      groups.push([randomParticipant])
    }

  } //end while

  return groups

}
