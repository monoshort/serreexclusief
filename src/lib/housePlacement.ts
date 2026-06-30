export const HOUSE_DEPTH = 3.2

/** Berekent waar de woninggevel staat t.o.v. het schuifpui-/serre-middelpunt */
export function getHousePlacement(conservatoryDepth: number) {
  const groupZ = -conservatoryDepth / 2 - HOUSE_DEPTH / 2
  const facadeCenterZ = groupZ + HOUSE_DEPTH / 2
  const facadeOuterZ = facadeCenterZ + 0.11
  const facadeInnerZ = facadeCenterZ - 0.11

  return { groupZ, facadeCenterZ, facadeOuterZ, facadeInnerZ, houseDepth: HOUSE_DEPTH }
}

/** Woonkamer direct achter de schuifpui (binnen de woning) */
export function getSchuifpuiRoomPlacement(conservatoryWidth: number, conservatoryHeight: number) {
  const { groupZ } = getHousePlacement(0)
  const openH = conservatoryHeight - 0.06
  return {
    groupZ,
    /** Centrum kamer net achter de binnengevel */
    roomCenterZ: groupZ + 0.05,
    roomWidth: conservatoryWidth + 0.4,
    roomDepth: 2.85,
    roomHeight: openH,
  }
}